import React, { useState, useEffect, useMemo } from "react";
import { View, TextInput, Button, StyleSheet, Platform } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Header from "./Header";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const screenWidth = Dimensions.get("window").width;

const TimeSeriesChart = ({ route }) => {
  const { selectedRole } = route.params;

  const [currency, setCurrency] = useState("USD");
  const [startYear, setStartYear] = useState("2000");
  const [endYear, setEndYear] = useState("2019");
  const [annotationText, setAnnotationText] = useState("");

  const currencies = ["USD", "EUR", "JPY"];
  const years = Array.from({ length: 30 }, (_, i) => (1990 + i).toString());

  // Generate random values for datasets
  const generateRandomData = (numValues) => {
    return Array.from(
      { length: numValues },
      () => Math.floor(Math.random() * (150 - 50 + 1)) + 50
    );
  };

  // Filter data based on selected years
  const filterDataByYears = (data, startYear, endYear) => {
    const filteredLabels = data.labels.filter(
      (label) =>
        parseInt(label) >= parseInt(startYear) &&
        parseInt(label) <= parseInt(endYear)
    );
    const filteredData = data.datasets[0].data.slice(
      data.labels.indexOf(filteredLabels[0]),
      data.labels.indexOf(filteredLabels[filteredLabels.length - 1]) + 1
    );
    return { labels: filteredLabels, datasets: [{ data: filteredData }] };
  };

  // Initial dataset
  const initialData = {
    labels: ["2000", "2005", "2010", "2015", "2020"],
    datasets: [
      {
        data:
          selectedRole === "Macroeconomic"
            ? generateRandomData(5)
            : generateRandomData(5),
        color: (opacity = 1) => `rgba(134 ,65 ,244 ,${opacity})`,
      },
    ],
  };

  // Memoize filtered data to avoid unnecessary re-renders
  const filteredData = useMemo(
    () => filterDataByYears(initialData, startYear, endYear),
    [startYear, endYear]
  );

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0 ,0 ,255 ,${opacity})`,
    labelColor: (opacity = 1) => `rgba(0 ,0 ,0 ,${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  // Save annotation to AsyncStorage
  const saveAnnotation = async (annotation) => {
    try {
      await AsyncStorage.setItem("annotation", annotation);
      console.log("Annotation saved!");
    } catch (error) {
      console.error("Failed to save annotation:", error);
    }
  };

  // Load annotation from AsyncStorage when component mounts
  const loadAnnotation = async () => {
    try {
      const savedAnnotation = await AsyncStorage.getItem("annotation");
      if (savedAnnotation !== null) {
        setAnnotationText(savedAnnotation);
        console.log("Annotation loaded:", savedAnnotation);
      }
    } catch (error) {
      console.error("Failed to load annotation:", error);
    }
  };

  // Load annotation on component mount
  useEffect(() => {
    loadAnnotation();
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Header />

      {/* Currency Selector */}
      <SelectDropdown
        data={currencies}
        onSelect={(selectedItem) => setCurrency(selectedItem)}
        defaultButtonText="Select Currency"
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        dropdownStyle={{ zIndex: Platform.OS === "ios" ? 1000 : undefined }} // Ensure dropdown is above other elements
      />

      {/* Year Selection */}
      <View style={[styles.yearSelection]}>
        <View style={{ zIndex: Platform.OS === "ios" ? 1000 : undefined }}>
          <SelectDropdown
            data={years}
            onSelect={(selectedItem) => setStartYear(selectedItem)}
            defaultButtonText={`Start Year:${startYear}`}
            buttonStyle={styles.dropdownButtonDebug}
            buttonTextStyle={styles.dropdownButtonText}
            rowStyle={styles.dropdownRow}
            rowTextStyle={styles.dropdownRowText}
            dropdownStyle={{ zIndex: Platform.OS === "ios" ? 1000 : undefined }}
          />
        </View>
        <View style={{ zIndex: Platform.OS === "ios" ? 999 : undefined }}>
          <SelectDropdown
            data={years}
            onSelect={(selectedItem) => setEndYear(selectedItem)}
            defaultButtonText={`End Year:${endYear}`}
            buttonStyle={styles.dropdownButtonDebug}
            buttonTextStyle={styles.dropdownButtonText}
            rowStyle={styles.dropdownRow}
            rowTextStyle={styles.dropdownRowText}
            dropdownStyle={{ zIndex: Platform.OS === "ios" ? 999 : undefined }}
          />
        </View>
        <Button title="Apply" onPress={() => console.log("Apply pressed")} />
      </View>

      {/* Line Chart */}
      <LineChart
        data={filteredData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      {/* Annotation Button */}
      <Button
        title="Save Annotation"
        onPress={() => saveAnnotation(annotationText)} // Save annotation when button is pressed
      />

      {/* Annotation Text Input */}
      <TextInput
        placeholder="Add your annotation here"
        value={annotationText}
        onChangeText={(text) => setAnnotationText(text)}
        style={styles.annotationInput}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  yearSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%",
  },
  dropdownButtonDebug: {
    width: "45%",
    height: "auto",
    marginBottom: 10,
    backgroundColor: "#ffcccc",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownButton: {
    width: "45%",
    height: "auto",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownButtonText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  dropdownRow: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 10,
  },
  dropdownRowText: {
    fontSize: 14,
    textAlign: "left",
    color: "#333",
  },
  annotationInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
});

export default TimeSeriesChart;
