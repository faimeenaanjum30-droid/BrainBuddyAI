import React from "react";

export default function HomeScreen({ setPage }) {
  return (
    <div style={styles.container}>

      <div style={styles.logo}>
        🧠
      </div>

      <h1 style={styles.title}>
        BrainBuddyAI
      </h1>

      <p style={styles.subtitle}>
        Your Personal AI Learning Assistant
      </p>


      <div
        style={styles.card}
        onClick={() => setPage("chat")}
      >
        <h2>💬 AI Chat</h2>
        <p>Ask questions and learn with AI.</p>
      </div>


      <div
        style={styles.card}
        onClick={() => setPage("quiz")}
      >
        <h2>📚 Quiz Generator</h2>
        <p>Generate quizzes instantly.</p>
      </div>


      <div
        style={styles.card}
        onClick={() => setPage("notes")}
      >
        <h2>📝 Notes Summary</h2>
        <p>Summarize long notes in seconds.</p>
      </div>


      <div
        style={styles.card}
        onClick={() => setPage("study")}
      >
        <h2>📅 Study Planner</h2>
        <p>Create a smart study schedule.</p>
      </div>


      <div
        style={styles.card}
        onClick={() => setPage("document")}
      >
        <h2>📄 Document Analyzer</h2>
        <p>Upload a document and get an AI summary.</p>
      </div>


    </div>
  );
}


const styles = {

  container:{
    padding:"30px",
    background:"#F5F7FF",
    minHeight:"500px"
  },


  logo:{
    fontSize:"60px",
    textAlign:"center"
  },


  title:{
    textAlign:"center",
    color:"#4A4AFF"
  },


  subtitle:{
    textAlign:"center",
    color:"#666",
    marginBottom:"30px"
  },


  card:{
    background:"white",
    padding:"20px",
    borderRadius:"15px",
    marginBottom:"20px",
    cursor:"pointer",
    boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
  }

};