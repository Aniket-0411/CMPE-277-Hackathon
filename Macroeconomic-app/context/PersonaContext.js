import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonaContext = createContext();

export const PersonaProvider = ({ children }) => {
    const [selectedPersona, setSelectedPersona] = useState(null);

    useEffect(() => {
        retrievePersona();
    }, []);

    const retrievePersona = async () => {
        try {
            const storedPersona = await AsyncStorage.getItem('selectedPersona');
            if (storedPersona !== null) {
                setSelectedPersona(storedPersona);
            }
        } catch (error) {
            console.error('Error retrieving persona:', error);
        }
    };

    const updatePersona = async (persona) => {
        try {
            await AsyncStorage.setItem('selectedPersona', persona);
            setSelectedPersona(persona);
        } catch (error) {
            console.error('Error saving persona:', error);
        }
    };

    return (
        <PersonaContext.Provider value={{ selectedPersona, updatePersona }}>
            {children}
        </PersonaContext.Provider>
    );
};

export const usePersona = () => useContext(PersonaContext);