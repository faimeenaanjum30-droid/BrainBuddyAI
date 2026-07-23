import React, { useState } from "react";

const API_URL = "https://brainbuddyai.onrender.com";

export default function StudyPlannerScreen() {
  const [subjects, setSubjects] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (subjects.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `Create a study planner for these subjects: ${subjects}. 
          Available study hours per day: ${hours}.
          Give a simple daily schedule.`,
        }),
      });

      const data = await response.json();

      setPlan(data.answer);

    } catch (error) {
      setPlan("❌ Unable to connect to BrainBuddyAI.");
    }

    setLoading(false);
  };


  return (
    <div style={styles.container}>

      <h2 style={styles.title}>
        📅 Study Planner
      </h2>


      <input
        style={styles.input}
        placeholder="Enter subjects (Math, AI, DBMS...)"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
      />


      <br />


      <input
        style={styles.input}
        placeholder="Hours available per day"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />


      <br />


      <button
        style={styles.button}
        onClick={generatePlan}
      >
        {loading ? "Creating Plan..." : "Generate Study Plan"}
      </button>


      {plan && (
        <div style={styles.result}>
          <h3>Your Study Plan:</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {plan}
          </p>
        </div>
      )}

    </div>
  );
}


const styles = {

  container:{
    padding:"30px",
    background:"#F5F7FF",
    minHeight:"400px"
  },


  title:{
    textAlign:"center",
    color:"#4A4AFF"
  },


  input:{
    width:"300px",
    padding:"12px",
    marginBottom:"15px",
    borderRadius:"10px",
    border:"1px solid #ddd"
  },


  button:{
    background:"#4A4AFF",
    color:"white",
    padding:"12px 20px",
    border:"none",
    borderRadius:"10px",
    cursor:"pointer"
  },


  result:{
    marginTop:"25px",
    background:"white",
    padding:"20px",
    borderRadius:"12px"
  }

};