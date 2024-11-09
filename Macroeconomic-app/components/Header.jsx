// components/Header.jsx

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "logo-url" }} style={styles.logo} />
      <Text style={styles.title}>
        Macroeconomic Researcher Food Security Time Series Dashboard
      </Text>
      <Image source={{ uri: "country-flag-url" }} style={styles.flag} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
  flag: {
    width: 40,
    height: 30,
    resizeMode: "contain",
  },
});

export default Header;
