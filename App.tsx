import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {MainStackNavigator} from "./navigation/MainStackNavigator";
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
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

serviceWorkerRegistration.register();