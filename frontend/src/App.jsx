
import { useState } from "react";

import ChatScreenV2 from "./ChatScreenV2";
import QuizScreen from "./QuizScreen";
import NotesScreen from "./NotesScreen";
import StudyPlannerScreen from "./StudyPlannerScreen";
import SmartDocumentAnalyzer from "./SmartDocumentAnalyzer";
import HomeScreen from "./HomeScreen";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🧠 BrainBuddyAI</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("home")}>
          🏠 Home
        </button>

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

      {page === "home" && <HomeScreen />}

      {page === "chat" && <ChatScreenV2 />}

      {page === "quiz" && <QuizScreen />}

      {page === "notes" && <NotesScreen />}

      {page === "study" && <StudyPlannerScreen />}

      {page === "document" && <SmartDocumentAnalyzer />}
    </div>
  );
}

export default App;