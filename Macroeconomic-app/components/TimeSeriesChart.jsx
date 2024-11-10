import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePersona } from '../context/PersonaContext';
import { useCountry } from '../context/CountryContext';
import { useIndicator } from '../context/IndicatorContext';
import { createIconSetFromFontello } from '@expo/vector-icons';

const TimeSeriesChart = () => {
  const { selectedPersona } = usePersona();
  const { selectedCountry } = useCountry();
  const { selectedIndicator } = useIndicator();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1959 }, (_, i) => 1960 + i);

  const [annotation, setAnnotation] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [startYear, setStartYear] = useState(1960);
  const [endYear, setEndYear] = useState(currentYear);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `@annotation_${selectedPersona}_${selectedCountry}_${selectedIndicator}`;

  useEffect(() => {
    loadAnnotation();
    setSaveMessage('');
    setIsLoading(true);
    fetchData().then(() => setIsLoading(false));
  }, [selectedPersona, selectedCountry, selectedIndicator, startYear, endYear]);

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

  const fetchData = async () => {
    const countryCode = getCountryCode(selectedCountry);
    const indicatorCode = getIndicatorCode(selectedIndicator);
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/${indicatorCode}?date=${startYear}:${endYear}&format=json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the World Bank API');
      }
      const data = await response.json();

      const processedData = processApiData(data[1]);
      setChartData(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processApiData = (apiData) => {
    const years = [];
    const values = [];

    apiData.forEach(entry => {
      years.push(entry.date);
      values.push(entry.value !== null ? parseFloat(entry.value) : null);
    });

    return {
      labels: years.reverse(),
      datasets: [{ data: values.reverse() }]
    };
  };

  const getCountryCode = (country) => {
    const countryCodes = { "USA": "US", "India": "IN", "China": "CN" };
    return countryCodes[country] || '';
  };

  const getIndicatorCode = (indicator) => {
    const indicatorCodes = {
      'GDP': 'NY.GDP.MKTP.CD',
      'GDP Growth': 'NY.GDP.MKTP.KD.ZG',
      'FDIInflows': 'BX.KLT.DINV.WD.GD.ZS',
      'FDIOutflows': 'BM.KLT.DINV.WD.GD.ZS'
    };
    return indicatorCodes[indicator] || '';
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
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

      <View style={styles.yearSelector}>
        <View style={styles.pickerContainer}>
          <Text>Start Year:</Text>
          <Picker
            selectedValue={startYear}
            style={styles.picker}
            onValueChange={(itemValue) => setStartYear(itemValue)}
          >
            {years.map(year => (
              <Picker.Item key={`start-${year}`} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text>End Year:</Text>
          <Picker
            selectedValue={endYear}
            style={styles.picker}
            onValueChange={(itemValue) => setEndYear(itemValue)}
          >
            {years.map(year => (
              <Picker.Item key={`end-${year}`} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      {!isLoading && chartData.labels && chartData.datasets && (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      )}

      <View style={styles.annotationContainer}>
        <Text style={styles.annotationCaption}>Annotation:</Text>
        <TextInput
          style={styles.input}
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
    color: '#4CAF50',
    marginTop: 8,
    fontSize: 14,
  },
  yearSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default TimeSeriesChart;