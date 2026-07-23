
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5000"
    : "http://192.168.29.213:5000";

export default function NotesScreen() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  const summarizeNotes = async () => {
    if (notes.trim() === "") return;

    try {
      const response = await fetch(`${API_URL}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: notes,
        }),
      });

      const data = await response.json();
      setSummary(data.summary);

    } catch (error) {
      setSummary("Error: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Notes Summary</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste your notes here..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={summarizeNotes}
      >
        <Text style={styles.buttonText}>Summarize</Text>
      </TouchableOpacity>

      {summary !== "" && (
        <View style={styles.box}>
          <Text>{summary}</Text>
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
    color: "#4A4AFF",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    minHeight: 180,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlignVertical: "top",
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

  box: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});