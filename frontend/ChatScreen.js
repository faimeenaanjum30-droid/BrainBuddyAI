import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      Alert.alert("Message Required", "Please enter a question.");
      return;
    }

    const userMessage = message;
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
      // For Expo Go on your phone use:
      // const response = await fetch("http://192.168.29.213:5000/chat", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
        }),
      });

      const data = await response.json();

      setChat((prevChat) => [
        ...prevChat,
        {
          user: userMessage,
          ai: data.answer,
        },
      ]);
    } catch (error) {
      console.log(error);

      setChat((prevChat) => [
        ...prevChat,
        {
          user: userMessage,
          ai: "❌ Unable to connect to BrainBuddyAI server.",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrainBuddyAI 🤖</Text>

      <ScrollView style={styles.chatBox}>
        {chat.map((item, index) => (
          <View key={index}>
            <Text style={styles.user}>👤 You: {item.user}</Text>

            <Text style={styles.ai}>🤖 BrainBuddyAI: {item.ai}</Text>
          </View>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E7D32",
    marginBottom: 20,
  },

  chatBox: {
    flex: 1,
    marginBottom: 10,
  },

  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 12,
    borderRadius: 12,
    marginVertical: 5,
    maxWidth: "80%",
    fontSize: 16,
  },

  ai: {
    alignSelf: "flex-start",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 12,
    marginVertical: 5,
    maxWidth: "80%",
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});