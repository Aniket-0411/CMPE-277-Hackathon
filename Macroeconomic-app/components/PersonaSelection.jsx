import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "./Header";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Using Expo icons for ChatGPT icon

const PersonaSelection = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    navigation.navigate("CountrySelector", { selectedRole: role });
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.welcomeText}>
        Welcome to Macroeconomic Food Security App
      </Text>
      <View style={styles.personaContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRoleSelection("Macroeconomic")}
        >
          <Text style={styles.buttonText}>Macroeconomic Researcher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRoleSelection("Agriculture")}
        >
          <Text style={styles.buttonText}>Government Official</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("ChatPage")}
      >
        <MaterialCommunityIcons name="chat" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f0f4f7",
  },
  welcomeText: {
    fontSize: 22,
    marginBottom: 40,
    marginTop:40,
    textAlign: "center",
    paddingHorizontal: 20,
    backgroundColor: "#4A90E2",
    color: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  personaContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical:10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 50,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});

export default PersonaSelection;
