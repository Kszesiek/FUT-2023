import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {MainStackNavigator} from "./navigation/MainStackNavigator";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}