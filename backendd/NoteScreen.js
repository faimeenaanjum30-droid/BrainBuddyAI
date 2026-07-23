import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5000"
    : "http://192.168.29.213:5000";

export default function NotesScreen() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  const summarizeNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
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
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={summarizeNotes}>
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
    marginBottom: 20,
    color: "#4A4AFF",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    minHeight: 180,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4A4AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  box: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
});