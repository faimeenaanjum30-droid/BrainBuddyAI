import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🧠 BrainBuddyAI</h1>

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

      <button onClick={askAI}>Ask AI</button>

      <h3>Answer:</h3>
      <p>{answer}</p>
    </div>
  );
}

export default App;