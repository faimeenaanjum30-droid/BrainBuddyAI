import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>🧠</Text>

      <Text style={styles.title}>BrainBuddyAI</Text>

      <Text style={styles.subtitle}>
        Your Personal AI Learning Assistant
      </Text>

      {/* AI Chat */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Chat")}
      >
        <Text style={styles.cardTitle}>💬 AI Chat</Text>
        <Text style={styles.cardText}>
          Ask questions and learn with AI.
        </Text>
      </TouchableOpacity>

      {/* Quiz Generator */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.cardTitle}>📚 Quiz Generator</Text>
        <Text style={styles.cardText}>
          Generate quizzes instantly.
        </Text>
      </TouchableOpacity>

      {/* Notes Summary */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Notes")}
      >
        <Text style={styles.cardTitle}>📝 Notes Summary</Text>
        <Text style={styles.cardText}>
          Summarize long notes in seconds.
        </Text>
      </TouchableOpacity>

      {/* Study Planner */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Planner")}
      >
        <Text style={styles.cardTitle}>📅 Study Planner</Text>
        <Text style={styles.cardText}>
          Create a smart study schedule.
        </Text>
      </TouchableOpacity>

      {/* PDF Summary */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Document Analyzer")}
      >
        <Text style={styles.cardTitle}>📄 Document Analyzer</Text>
        <Text style={styles.cardText}>
          Upload a PDF and get an AI summary.
        </Text>
      </TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    padding: 20,
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginTop: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A4AFF",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  cardText: {
    marginTop: 8,
    fontSize: 15,
    color: "#555",
  },
});