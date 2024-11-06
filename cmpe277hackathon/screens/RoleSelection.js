// screens/RoleSelection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoleSelection = ({ navigation }) => {
    const selectRole = async (role) => {
        await AsyncStorage.setItem('userRole', role);
        navigation.navigate('CountrySelector');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Role</Text>
            <TouchableOpacity style={styles.button} onPress={() => selectRole('ECON Researcher')}>
                <Text style={styles.buttonText}>ECON Researcher</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectRole('Government Official')}>
                <Text style={styles.buttonText}>Government Official</Text>
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
    button: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default RoleSelection;
