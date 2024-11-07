import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CountrySelector = ({ navigation, route }) => {
  const { selectedRole } = route.params;

  const countries = [
    { name: "India", code: "IN" },
    { name: "USA", code: "US" },
    { name: "China", code: "CN" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Country</Text>
      <View style={styles.countryList}>
        {countries.map((country) => (
          <TouchableOpacity
            key={country.name}
            style={styles.countryContainer}
            onPress={() =>
              navigation.navigate(
                selectedRole === "Macroeconomic"
                  ? "MacroeconomicIndicators"
                  : "AgricultureIndicators",
                { selectedRole }
              )
            }
          >
            <Image
              source={{
                uri: `https://flagcdn.com/64x48/${country.code.toLowerCase()}.png`,
              }}
              style={styles.flag}
            />
            <Text style={styles.countryName}>{country.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  countryList: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  countryContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  flag: {
    width: 64,
    height: 48,
    marginBottom: 10,
  },
  countryName: {
    fontSize: 16,
  },
});

export default CountrySelector;
