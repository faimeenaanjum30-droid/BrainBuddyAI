import React, { useState } from "react";

const API_URL = "https://brainbuddyai.onrender.com";

export default function NotesScreen() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarizeNotes = async () => {
    if (notes.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes,
        }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setSummary("❌ Unable to connect to BrainBuddyAI.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Notes Summary</h2>

      <textarea
        style={styles.input}
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br />

      <button style={styles.button} onClick={summarizeNotes}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div style={styles.box}>
          <h3>Summary</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>
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
  },

  input: {
    width: "100%",
    height: "220px",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    resize: "vertical",
    fontSize: "16px",
  },

  button: {
    marginTop: "20px",
    background: "#4A4AFF",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  box: {
    marginTop: "25px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
  },
};