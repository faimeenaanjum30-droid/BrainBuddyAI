import { useState } from "react";

function App() {
  const [page, setPage] = useState("chat");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const API_URL = "https://brainbuddyai.onrender.com";

  const askAI = async () => {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("❌ Unable to connect to BrainBuddyAI.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🧠 BrainBuddyAI</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("chat")}>
          🤖 AI Chat
        </button>

        <button onClick={() => setPage("quiz")}>
          📝 Quiz Generator
        </button>

        <button onClick={() => setPage("notes")}>
          📚 Notes Summary
        </button>

        <button onClick={() => setPage("study")}>
          📅 Study Planner
        </button>

        <button onClick={() => setPage("document")}>
          📄 Document Analyzer
        </button>
      </div>

      <hr />

      {page === "chat" && (
        <div>
          <h2>🤖 Ask AI</h2>

          <input
            type="text"
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: "300px",
              padding: "10px",
            }}
          />

          <br />
          <br />

          <button onClick={askAI}>
            Ask AI
          </button>

          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}

      {page === "quiz" && (
        <div>
          <h2>📝 Quiz Generator</h2>
          <p>Generate quizzes using BrainBuddyAI.</p>
        </div>
      )}

      {page === "notes" && (
        <div>
          <h2>📚 Notes Summary</h2>
          <p>Summarize your notes with AI.</p>
        </div>
      )}

      {page === "study" && (
        <div>
          <h2>📅 Study Planner</h2>
          <p>Create your AI study plan.</p>
        </div>
      )}

      {page === "document" && (
        <div>
          <h2>📄 Document Analyzer</h2>
          <p>Analyze your documents using AI.</p>
        </div>
      )}
    </div>
  );
}

export default App;