import React, { useState } from "react";
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

const ChatPage = ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText("");
      // Mock bot response
      setMessages((msgs) => [
        ...msgs,
        { text: "Response from LLM", sender: "bot" },
      ]);
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
    marginBottom:50,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  sendButtonContainer: {
    justifyContent: "center", // Center the button vertically
    height: 40,
    marginBottom:40 // Ensure it's the same height as the input field
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
