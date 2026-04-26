import React, { useState } from "react";
import { uploadPolicy } from "../context/api";

function HRPolicyUpload() {
  const [statuses, setStatuses] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = e.target.elements.file.files;
    if (!files.length) return;

    for (const file of files) {
      // Show uploading message
      setStatuses((prev) => ({
        ...prev,
        [file.name]: "Uploading..."
      }));

      try {
        const result = await uploadPolicy(file);

        // Show success message
        setStatuses((prev) => ({
          ...prev,
          [file.name]: `Uploaded successfully ${
            result.chunks_added ? `(${result.chunks_added} chunks)` : ""
          }`
        }));

        // Remove this message after 5 seconds
        setTimeout(() => {
          setStatuses((prev) => {
            const updated = { ...prev };
            delete updated[file.name];
            return updated;
          });
        }, 5000);

      } catch (err) {
        // Show error
        setStatuses((prev) => ({
          ...prev,
          [file.name]: `Failed: ${err.message}`
        }));

        // Remove this message after 5 seconds
        setTimeout(() => {
          setStatuses((prev) => {
            const updated = { ...prev };
            delete updated[file.name];
            return updated;
          });
        }, 5000);
      }
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-16 p-8 rounded-3xl shadow-2xl border border-blue-900 bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative text-white">
      {/* Crewbit Logo */}
      <h1
        className="absolute -top-12 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl flex gap-1 items-center"
        style={{
          fontFamily: '"Hammersmith One", sans-serif',
          letterSpacing: '3px',
        }}
      >
        <span className="text-white">Crew</span>
        <span className="text-[#38bdf8]">bit</span>
      </h1>

      {/* Tagline */}
      <div className="mb-8 mt-2 text-center">
        <div className="text-xl font-semibold mb-1">Upload company policy and project details etc by <span className="text-[#38bdf8] font-bold">HR</span></div>
        <div className="text-sm text-blue-200">Accepted file type: PDF</div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <input
          type="file"
          name="file"
          accept=".pdf"
          multiple
          required
          className="block w-full text-sm text-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800 transition"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 font-semibold text-white shadow transition-all duration-200 disabled:opacity-60 text-base mt-2"
        >
          Upload 
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {Object.entries(statuses).map(([fileName, status]) => (
          <p key={fileName} className="text-blue-200 text-sm">
            <strong className="text-white">{fileName}</strong> — {status}
          </p>
        ))}
      </div>
    </div>
  );
}

export default HRPolicyUpload;
