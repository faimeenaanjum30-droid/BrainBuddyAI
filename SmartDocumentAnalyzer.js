import { Platform } from "react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

export default function DocumentAnalyzerScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
    }
  };

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission is required to access photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📂 Smart Document Analyzer</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>🖼️ Choose Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 15 }]}
        onPress={pickPDF}
      >
        <Text style={styles.buttonText}>📄 Choose PDF</Text>
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.box}>
          <Text style={{ fontWeight: "bold" }}>Selected File</Text>

          <Text>
            {selectedFile.fileName ||
              selectedFile.name ||
              "Selected File"}
          </Text>

          <Text style={{ color: "gray", marginTop: 8 }}>
            Ready for AI Analysis
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button,{ marginTop:20}]}
        onPress={async () => {
  if (!selectedFile) {
    alert("Please select an image first.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("image", {
      uri:
        Platform.OS === "android"
          ? selectedFile.uri
          : selectedFile.uri.replace("file://", ""),
      name:
        selectedFile.fileName ||
        selectedFile.name ||
        "image.jpg",
      type:
        selectedFile.mimeType ||
        "image/jpeg",
    });

    const response = await fetch(
      "http://192.168.29.213:5000/analyze-image",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setSummary(data.result);

  } catch (error) {
    console.log(error);
    setSummary("❌ Unable to analyze image.");
  }

  setLoading(false);
}}


      >
        <Text style={styles.buttonText}>🤖 Analyze File</Text>
      </TouchableOpacity>

     {loading && (
  <Text
    style={{
      textAlign: "center",
      marginTop: 20,
      fontWeight: "bold",
      color: "#4A4AFF",
    }}
  >
    🤖 AI is analyzing your image...
  </Text>
)}

{summary !== "" && (
  <View style={styles.box}>
    <Text style={{ fontSize: 16 }}>
      {summary}
    </Text>
  </View>
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F7FF",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A4AFF",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#4A4AFF",
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
    borderRadius: 10,
  },
});