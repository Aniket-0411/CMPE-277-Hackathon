import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePersona } from '../context/PersonaContext';
import { useCountry } from '../context/CountryContext';
import { useIndicator } from '../context/IndicatorContext';

const useAutoSizeTextArea = (value) => {
  const [height, setHeight] = useState(40);

  useEffect(() => {
    const numberOfLineBreaks = (value.match(/\n/g) || []).length;
    const newHeight = 20 + numberOfLineBreaks * 20 + 20;
    setHeight(newHeight);
  }, [value]);

  return height;
};

const TimeSeriesChart = () => {
  const { selectedPersona } = usePersona();
  const { selectedCountry } = useCountry();
  const { selectedIndicator } = useIndicator();

  const [annotation, setAnnotation] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const textAreaHeight = useAutoSizeTextArea(annotation);

  const storageKey = `@annotation_${selectedPersona}_${selectedCountry}_${selectedIndicator}`;

  useEffect(() => {
    loadAnnotation();
    setSaveMessage(''); // Clear the save message when component mounts or key changes
  }, [selectedPersona, selectedCountry, selectedIndicator]);

  const loadAnnotation = async () => {
    try {
      const savedAnnotation = await AsyncStorage.getItem(storageKey);
      if (savedAnnotation !== null) {
        setAnnotation(savedAnnotation);
      } else {
        setAnnotation('');
      }
    } catch (error) {
      console.error('Error loading annotation:', error);
    }
  };

  const saveAnnotation = async () => {
    try {
      await AsyncStorage.setItem(storageKey, annotation);
      setSaveMessage('Annotation saved successfully');
    } catch (error) {
      console.error('Error saving annotation:', error);
      setSaveMessage('Failed to save annotation');
    }
  };

  // Placeholder data - replace this with actual data fetched based on the selected country and indicator
  const years = [2018, 2019, 2020, 2021, 2022];
  const values = [2.7, 2.3, -3.4, 5.7, 2.1]; // Example values

  const data = {
    labels: years.map(year => year.toString()),
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: [`${selectedIndicator} for ${selectedCountry}`]
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726'
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{`${selectedIndicator} for ${selectedCountry}`}</Text>
      <Text style={styles.subtitle}>{`Selected by ${selectedPersona}`}</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
      <View style={styles.annotationContainer}>
        <Text style={styles.annotationCaption}>Annotation:</Text>
        <TextInput
          style={[styles.input, { height: Math.max(40, textAreaHeight) }]}
          value={annotation}
          onChangeText={setAnnotation}
          placeholder="Type your annotation here..."
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={saveAnnotation}>
          <Text style={styles.addButtonText}>Save Annotation</Text>
        </TouchableOpacity>
        {saveMessage ? <Text style={styles.saveMessage}>{saveMessage}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  annotationContainer: {
    marginTop: 16,
    width: '100%',
  },
  annotationCaption: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveMessage: {
    color: '#4CAF50', // Sweet green color
    marginTop: 8,
    fontSize: 14,
  },
});

export default TimeSeriesChart;