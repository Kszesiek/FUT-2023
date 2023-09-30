import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={() => ({
            // tabBarActiveTintColor: 'tomato',
            // tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Home"
            options={() => ({
              tabBarIcon: ({focused, color, size}) => {
                const iconName = focused ? "home" : "home-outline";

                return <Ionicons name={iconName} size={size} color={color}/>;
                // format-list-text
              }
            })}
            component={HomeScreen}
          />
          <Tab.Screen
            name="Wydarzenia"
            options={() => ({
              tabBarIcon: ({focused, color, size}) => {
                const iconName = focused ? "format-list-text" : "format-list-text";

                return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
              }
            })}
            component={CalendarScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
