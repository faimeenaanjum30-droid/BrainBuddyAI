import React, { useState } from "react";

const API_URL = "https://brainbuddyai.onrender.com";

export default function QuizScreen() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (topic.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });

      const data = await response.json();

      setQuiz(data.quiz);

    } catch (error) {
      console.log("ERROR:", error.message);
      setQuiz("❌ Error connecting to BrainBuddyAI.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#F5F7FF",
        minHeight: "400px",
      }}
    >
      <h2
        style={{
          color: "#4A4AFF",
          textAlign: "center",
        }}
      >
        📚 Quiz Generator
      </h2>

      <input
        type="text"
        placeholder="Enter Topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      />

      <br />
      <br />

      <button
        onClick={generateQuiz}
        style={{
          backgroundColor: "#4A4AFF",
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {quiz && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>Generated Quiz:</h3>
          <p>{quiz}</p>
        </div>
      )}
    </div>
  );
}