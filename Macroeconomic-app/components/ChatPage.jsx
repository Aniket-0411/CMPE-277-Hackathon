import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatPage = ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [genAI, setGenAI] = useState(null);

  useEffect(() => {
    // Initialize the Gemini API
    const API_KEY = process.env.GEMINI_API_KEY; 
    const genAI = new GoogleGenerativeAI(API_KEY);
    setGenAI(genAI);
  }, []);

  const handleSend = async () => {
    if (inputText.trim() && genAI) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText + "  ", sender: "user" },
      ]);
      setTimeout(() => setInputText(""),100);

      try {
        const prompt = `You are a helpful assistant specializing in information from the SOFI 2024 report. The link to document is https://data.unicef.org/wp-content/uploads/2023/07/SOFI-2024.pdf . Your primary focus is on topics related to food security, nutrition, and related global issues as outlined in this report. If asked about topics outside this scope, kindly steer the conversation back to relevant aspects of food security and nutrition without explicitly mentioning any limitations. Always aim to provide informative and constructive yet straightforward responses based on the report's content. 

User query: ${ inputText }

Assistant response:`;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt + inputText);
        const response = await result.response;
        const responseText = response.text();

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: responseText, sender: "bot" },
        ]);
        console.log(messages);
      } catch (error) {
        console.error("Error generating response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, I couldn't generate a response.", sender: "bot" },
        ]);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text
            style={item.sender === "user" ? styles.userText : styles.botText}
          >
            {item.text}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <View style={styles.sendButtonContainer}>
          <Button title="Send" onPress={handleSend} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 50,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  sendButtonContainer: {
    justifyContent: "center", // Center the button vertically
    height: 40,
    marginBottom: 40 // Ensure it's the same height as the input field
  },
  userText: {
    alignSelf: "flex-end",
    backgroundColor: "#d1f7c4",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: "80%",
  },
  botText: {
    alignSelf: "flex-start",
    backgroundColor: "#f7d1d1",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: "80%",
  },
});

export default ChatPage;