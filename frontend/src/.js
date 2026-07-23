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

const API_URL =  "https://brainbuddyai.onrender.com";
 

export default function StudyPlannerScreen() {
  const [subject, setSubject] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState("");

  const generatePlan = async () => {
    if (!subject || !days || !hours) {
      setPlan("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/planner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          days,
          hours,
        }),
      });

      const data = await response.json();
      setPlan(data.plan);

    } catch (error) {
      setPlan("Error: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📅 AI Study Planner</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject (e.g. DBMS)"
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Days"
        keyboardType="numeric"
        value={days}
        onChangeText={setDays}
      />

      <TextInput
        style={styles.input}
        placeholder="Hours Per Day"
        keyboardType="numeric"
        value={hours}
        onChangeText={setHours}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={generatePlan}
      >
        <Text style={styles.buttonText}>Generate Plan</Text>
      </TouchableOpacity>

      {plan !== "" && (
        <View style={styles.planBox}>
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
    marginBottom: 20,
    color: "#4A4AFF",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#4A4AFF",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  planBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});