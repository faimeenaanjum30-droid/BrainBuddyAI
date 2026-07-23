import React, { useState, useEffect } from "react";

const API_URL = "https://brainbuddyai.onrender.com";

export default function ChatScreenV2() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("brainbuddy_chats");

    if (saved) {
      setChat(JSON.parse(saved));
    }
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = message;

    const updatedChat = [
      ...chat,
      {
        type: "user",
        text: userMessage,
      },
    ];

    setChat(updatedChat);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
        }),
      });

      const data = await response.json();

      const finalChat = [
        ...updatedChat,
        {
          type: "ai",
          text: data.answer,
        },
      ];

      setChat(finalChat);
      localStorage.setItem(
        "brainbuddy_chats",
        JSON.stringify(finalChat)
      );

    } catch (error) {

      const finalChat = [
        ...updatedChat,
        {
          type: "ai",
          text: "❌ Unable to connect to BrainBuddyAI.",
        },
      ];

      setChat(finalChat);
      localStorage.setItem(
        "brainbuddy_chats",
        JSON.stringify(finalChat)
      );
    }

    setLoading(false);
  };


  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("✅ Copied!");
  };


  return (
    <div style={styles.container}>

      <h2 style={styles.header}>
        🤖 BrainBuddyAI
      </h2>


      <button
        style={styles.clearButton}
        onClick={() => {
          localStorage.removeItem("brainbuddy_chats");
          setChat([]);
        }}
      >
        🗑 Clear Chat
      </button>


      <div style={styles.chatContainer}>

        {chat.map((item, index) => (

          <div
            key={index}
            style={
              item.type === "user"
                ? styles.userBubble
                : styles.aiBubble
            }
          >

            <p>{item.text}</p>


            {item.type === "ai" && (
              <button
                style={styles.copyButton}
                onClick={() => copyText(item.text)}
              >
                📋 Copy
              </button>
            )}

          </div>

        ))}


        {loading && (
          <div style={styles.aiBubble}>
            🤖 BrainBuddyAI typing...
          </div>
        )}

      </div>


      <div style={styles.inputArea}>

        <input
          placeholder="Ask anything..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          style={styles.input}
        />


        <button
          style={styles.sendButton}
          onClick={sendMessage}
        >
          ➤
        </button>

      </div>

    </div>
  );
}


const styles = {

  container:{
    padding:"30px",
    background:"#F4F7FB",
    minHeight:"500px"
  },

  header:{
    textAlign:"center",
    color:"#2E7D32"
  },


  chatContainer:{
    minHeight:"300px",
    marginTop:"20px"
  },


  userBubble:{
    background:"#4CAF50",
    color:"white",
    padding:"12px",
    borderRadius:"15px",
    margin:"10px",
    marginLeft:"30%"
  },


  aiBubble:{
    background:"white",
    padding:"12px",
    borderRadius:"15px",
    margin:"10px",
    marginRight:"30%"
  },


  inputArea:{
    display:"flex",
    gap:"10px"
  },


  input:{
    flex:1,
    padding:"12px",
    borderRadius:"20px",
    border:"1px solid #ddd"
  },


  sendButton:{
    background:"#4CAF50",
    color:"white",
    border:"none",
    borderRadius:"50%",
    width:"50px",
    height:"50px"
  },


  clearButton:{
    background:"#E53935",
    color:"white",
    border:"none",
    padding:"10px",
    borderRadius:"10px"
  },


  copyButton:{
    marginTop:"10px"
  }

};