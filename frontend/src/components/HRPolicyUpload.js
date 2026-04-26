import React, { useState } from "react";
import { uploadPolicy } from "../context/api"; // your API service

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" accept=".pdf" multiple required />
        <button type="submit">Upload Policies</button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        {Object.entries(statuses).map(([fileName, status]) => (
          <p key={fileName}>
            <strong>{fileName}</strong> — {status}
          </p>
        ))}
      </div>
    </div>
  );
}

export default HRPolicyUpload;
