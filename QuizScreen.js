import React, { useState } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
const API_URL ="https://brainbuddyai.onrender.com";
  
export default function QuizScreen() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  const generateQuiz = async () => {
  if (topic.trim() === "") return;

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
  setQuiz("Error: " + error.message);
}
  
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 Quiz Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Topic..."
        value={topic}
        onChangeText={setTopic}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={generateQuiz}
      >
        <Text style={styles.buttonText}>Generate Quiz</Text>
      </TouchableOpacity>

      {quiz !== "" && (
        <View style={styles.quizBox}>
          <Text>{quiz}</Text>
        </View>
      )}
    </ScrollView>
  );

}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F7FF",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4A4AFF",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  button: {
    backgroundColor: "#4A4AFF",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  quizBox: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
});