
// IndicatorContext.js
import React, { createContext, useState, useContext } from 'react';

const IndicatorContext = createContext();

export const IndicatorProvider = ({ children }) => {
    const [selectedIndicator, setSelectedIndicator] = useState('GDP');

    return (
        <IndicatorContext.Provider value={{ selectedIndicator, setSelectedIndicator }}>
            {children}
        </IndicatorContext.Provider>
    );
};

export const useIndicator = () => useContext(IndicatorContext);