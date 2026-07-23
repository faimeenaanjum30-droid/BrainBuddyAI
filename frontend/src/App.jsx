import { useState } from "react";

import HomeScreen from "./HomeScreen.jsx";
import ChatScreenV2 from "./ChatScreenV2.jsx";
import QuizScreen from "./QuizScreen.jsx";
import NotesScreen from "./NotesScreen.jsx";
import StudyPlannerScreen from "./StudyPlannerScreen.jsx";
import SmartDocumentAnalyzer from "./SmartDocumentAnalyzer.jsx";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && <HomeScreen setPage={setPage} />}
      {page === "chat" && <ChatScreenV2 setPage={setPage} />}
      {page === "quiz" && <QuizScreen setPage={setPage} />}
      {page === "notes" && <NotesScreen setPage={setPage} />}
      {page === "study" && <StudyPlannerScreen setPage={setPage} />}
      {page === "document" && <SmartDocumentAnalyzer setPage={setPage} />}
    </>
  );
}

export default App;