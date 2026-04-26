const API_BASE = "http://localhost:9001"; // Change if needed

// Upload policy PDF
export async function uploadPolicy(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload-policy`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.statusText}`);
  }
  return res.json();
}

// Ask a query
export async function askQuery(question) {
  const res = await fetch(`${API_BASE}/ask-query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Query failed: ${res.statusText}`);
  }
  return res.json();
}
