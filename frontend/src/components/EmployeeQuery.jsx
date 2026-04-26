import React, { useState, useRef, useEffect } from "react";
import { askQuery } from "../context/api";
import { motion, AnimatePresence } from "framer-motion";
import BGchat from "../assets/BGchat.jpg";

function EmployeeQuery() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await askQuery(question);
      setChat((prev) => [...prev, { question, answer: data.answer }]);
      setQuestion("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-[1100px] w-full mx-auto my-10 p-8 rounded-3xl shadow-2xl border border-gray-800 text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BGchat})` }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide flex flex-wrap justify-center items-center gap-2 font-sans">
        <span>Ask your HR queries to</span>
        <span
          style={{
            fontFamily: '"Hammersmith One", sans-serif',
            letterSpacing: '3px',
          }}
          className="inline-flex gap-1 text-3xl font-bold"
        >
          <span className="text-white">Crew</span>
          <span className="text-[#38bdf8]">bit</span>
        </span>
        <span className="ml-1">AI</span>
      </h2>

      {/* Chat Window */}
      <div
        className="h-[480px] overflow-y-auto p-6 rounded-2xl border border-gray-700 flex flex-col gap-4 mb-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BGchat})` }}
      >
        <AnimatePresence initial={false}>
          {chat.map((entry, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, type: "spring" }}
            >
              <motion.div
                className="self-end bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-2xl max-w-[70%] ml-auto shadow-md"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {entry.question}
              </motion.div>
              <motion.div
                className="bg-[#232e3e] px-5 py-2 rounded-2xl max-w-[70%] border border-gray-600 shadow self-start"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                {entry.answer}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <textarea
          placeholder="Ask your HR question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          className="flex-1 p-3 rounded-xl bg-[#1e2733] border border-gray-600 focus:border-blue-500 focus:outline-none resize-none text-white shadow"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 mb-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 font-semibold text-white shadow transition-all duration-200 disabled:opacity-60 text-sm"
        >
          {loading ? "..." : <span className="font-bold tracking-wide">Send</span>}
        </button>
      </form>

      {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
    </div>
  );
}

export default EmployeeQuery;

