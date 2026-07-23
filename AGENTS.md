# Expo HAS CHANGED
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function StudyPlannerScreen() {
  const [subject, setSubject] = useState("");
  const [plan, setPlan] = useState("");

  const createPlan = () => {
    if (subject.trim() === "") return;

    setPlan(
      `📅 Study Plan for ${subject}

✅ Revise concepts
✅ Practice questions
✅ Solve previous papers
✅ Take a mock test
✅ Revise weak topics`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📅 Study Planner</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Subject..."
        value={subject}
        onChangeText={setSubject}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={createPlan}
      >
        <Text style={styles.buttonText}>Create Plan</Text>
      </TouchableOpacity>

      {plan !== "" && (
        <View style={styles.box}>
          <Text>{plan}</Text>
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
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  box: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
});
