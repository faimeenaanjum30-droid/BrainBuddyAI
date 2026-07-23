import React, { useState } from "react";

const API_URL = "https://brainbuddyai.onrender.com";

export default function SmartDocumentAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setSummary("");
    }
  };

  const analyzeFile = async () => {
    if (!selectedFile) {
      alert("Please choose a file first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Your backend currently expects "image"
      formData.append("image", selectedFile);

      const response = await fetch(`${API_URL}/analyze-image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setSummary(
        data.result || data.summary || "No response received."
      );
    } catch (error) {
      console.error(error);
      setSummary("❌ Unable to analyze the file.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📄 Smart Document Analyzer</h2>

      <input
        type="file"
        accept=".pdf,image/*"
        onChange={handleFileChange}
        style={styles.input}
      />

      {selectedFile && (
        <div style={styles.box}>
          <h3>Selected File</h3>
          <p>{selectedFile.name}</p>
        </div>
      )}

      <button
        style={styles.button}
        onClick={analyzeFile}
      >
        {loading ? "Analyzing..." : "🤖 Analyze File"}
      </button>

      {summary && (
        <div style={styles.result}>
          <h3>Analysis</h3>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#F5F7FF",
    minHeight: "500px",
  },

  title: {
    textAlign: "center",
    color: "#4A4AFF",
    marginBottom: "30px",
  },

  input: {
    marginBottom: "20px",
    fontSize: "16px",
  },

  button: {
    background: "#4A4AFF",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },

  box: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  result: {
    marginTop: "25px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};