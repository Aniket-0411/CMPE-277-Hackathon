import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PersonaProvider } from '../context/PersonaContext';
import { CountryProvider } from '../context/CountryContext';
import { IndicatorProvider } from '../context/IndicatorContext';

// Import your components/screens
import PersonaSelection from "./../components/PersonaSelection";
import CountrySelector from "./../components/CountrySelector";
import MacroeconomicIndicators from "./../components/MacroeconomicIndicators";
import AgricultureIndicators from "./../components/AgricultureIndicators";
import TimeSeriesChart from "./../components/TimeSeriesChart";
import ChatPage from "./../components/ChatPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PersonaProvider>
      <CountryProvider>
        <IndicatorProvider>
          <Stack.Navigator initialRouteName="PersonaSelection">
            <Stack.Screen
              name="PersonaSelection"
              component={PersonaSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CountrySelector"
              component={CountrySelector}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MacroeconomicIndicators"
              component={MacroeconomicIndicators}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AgricultureIndicators"
              component={AgricultureIndicators}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TimeSeriesChart"
              component={TimeSeriesChart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </IndicatorProvider>
      </CountryProvider>
    </PersonaProvider>
  );
}
