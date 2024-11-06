// screens/CountrySelector.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';

const CountrySelector = () => {
    const [selectedCountry, setSelectedCountry] = useState("USA");

    const proceedWithSelection = () => {
        // You can navigate or handle the country selection here.
        alert(`Selected Country: ${selectedCountry}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Country</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCountry}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                >
                    <Picker.Item label="USA" value="USA" />
                    <Picker.Item label="China" value="China" />
                    <Picker.Item label="India" value="India" />
                </Picker>
            </View>
            <TouchableOpacity style={styles.proceedButton} onPress={proceedWithSelection}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    pickerContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    picker: {
        width: '100%',
        height: 50,
    },
    proceedButton: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default CountrySelector;
