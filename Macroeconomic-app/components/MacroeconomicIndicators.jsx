import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { usePersona } from '../context/PersonaContext';
import { useCountry } from '../context/CountryContext';
import { useIndicator } from '../context/IndicatorContext';
import { useNavigation } from '@react-navigation/native';

const MacroeconomicIndicators = () => {
  const { selectedPersona } = usePersona();
  const { selectedCountry } = useCountry();
  const { selectedIndicator, setSelectedIndicator } = useIndicator();
  const navigation = useNavigation();

  const indicators = ['GDP', 'GDP Growth', 'FDIInflows', 'FDIOutflows'];

  const toggleIndicator = (indicator) => {
    setSelectedIndicator(indicator);
    console.log("Selected indicator:", selectedIndicator);
  };

  const handleShowPress = () => {
    navigation.navigate('TimeSeriesChart', { indicator: selectedIndicator });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Macroeconomic Indicators</Text>
      <Text style={styles.subtitle}>Selected Persona: {selectedPersona}</Text>
      <Text style={styles.subtitle}>Selected Country: {selectedCountry}</Text>
      {indicators.map((indicator) => (
        <TouchableOpacity
          key={indicator}
          style={[
            styles.indicatorItem,
            selectedIndicator === indicator && styles.selectedIndicator,
          ]}
          onPress={() => toggleIndicator(indicator)}
        >
          <Text style={styles.indicatorText}>{indicator}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.showButton} onPress={handleShowPress}>
        <Text style={styles.showButtonText}>Show</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  indicatorItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedIndicator: {
    backgroundColor: '#e6f3ff',
    borderColor: '#007BFF',
  },
  indicatorText: {
    fontSize: 16,
    color: '#333',
  },
  showButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  showButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MacroeconomicIndicators;
