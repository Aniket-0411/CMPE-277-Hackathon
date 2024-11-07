// AgricultureIndicators.jsx

import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import Header from "./Header";

const AgricultureIndicators = ({ navigation, route }) => {
  const { selectedRole } = route.params;

  const [selectedIndicators, setSelectedIndicators] = useState({
    ContributionToGDP: true,
    Credit: true,
    FertilizersUsed: false,
    FertilizerProductionVolume: false,
  });

  const toggleCheckbox = (indicator) => {
    setSelectedIndicators((prevState) => ({
      ...prevState,
      [indicator]: !prevState[indicator],
    }));
  };

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>Agriculture</Text>

      {Object.keys(selectedIndicators).map((indicator) => (
        <View key={indicator} style={styles.checkboxContainer}>
          <CheckBox
            value={selectedIndicators[indicator]}
            onValueChange={() => toggleCheckbox(indicator)}
          />
          <Text style={styles.checkboxLabel}>{indicator}</Text>
        </View>
      ))}

      <Button
        title="Show"
        onPress={() => navigation.navigate("TimeSeriesChart", { selectedRole })}
      />

      {/* Icons (Placeholder) */}
      <View style={styles.iconsContainer}>
        {/* Add icons here as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});

export default AgricultureIndicators;
