import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import {

  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
const API_URL = "https://brainbuddyai.onrender.com";
export default function ChatScreenV2() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const savedChats = await AsyncStorage.getItem("brainbuddy_chats");

      if (savedChats) {
        setChat(JSON.parse(savedChats));
      }
    } catch (error) {
      console.log("Error loading chats:", error);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chat]);

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

      await AsyncStorage.setItem(
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

      await AsyncStorage.setItem(
        "brainbuddy_chats",
        JSON.stringify(finalChat)
      );
    }

    setLoading(false);
  };

  const copyText = async (text) => {
    await Clipboard.setStringAsync(text);
    alert("✅ Copied!");
  };
  return (
  <View style={styles.container}>
    <Text style={styles.header}>🤖 BrainBuddyAI</Text>

    <TouchableOpacity
      style={styles.clearButton}
      onPress={async () => {
        await AsyncStorage.removeItem("brainbuddy_chats");
        setChat([]);
      }}
    >
      <Text style={styles.clearText}>🗑 Clear Chat</Text>
    </TouchableOpacity>

    <ScrollView
      ref={scrollViewRef}
      style={styles.chatContainer}
    >
      {chat.map((item, index) => (
        <View
          key={index}
          style={
            item.type === "user"
              ? styles.userBubble
              : styles.aiBubble
          }
        >
          <Text style={styles.messageText}>
            {item.text}
          </Text>

          {item.type === "ai" && (
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyText(item.text)}
            >
              <Text style={styles.copyText}>📋 Copy</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {loading && (
        <View style={styles.aiBubble}>
          <Text style={styles.aiName}>
            🤖 BrainBuddyAI
          </Text>

          <Text style={styles.typingDots}>
            ● ● ●
          </Text>
        </View>
      )}
    </ScrollView>

    <View style={styles.inputArea}>
      <TextInput
        placeholder="Ask anything..."
        placeholderTextColor="#888"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.sendButton}
        onPress={sendMessage}
      >
        <Text style={styles.sendText}>➤</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    paddingTop: 50,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E7D32",
    marginBottom: 15,
  },

  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 18,
    borderBottomRightRadius: 5,
    marginVertical: 8,
    maxWidth: "80%",
  },

  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    marginVertical: 8,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#222",
  },

  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
  },

  input: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
  },

  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },

  sendText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  clearButton: {
    alignSelf: "center",
    backgroundColor: "#E53935",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },

  clearText: {
    color: "white",
    fontWeight: "bold",
  },

  aiName: {
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 6,
  },

  typingDots: {
    fontSize: 26,
    color: "#4CAF50",
    letterSpacing: 4,
  },

  copyButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#4A4AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  copyText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },
});