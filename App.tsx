import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {CalendarScreen} from "./screens/Calendar";
import {HomeScreen} from "./screens/Home";
import {SponsorsScreen} from "./screens/Sponsors";
import {Image} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={() => ({
            headerStyle: (() => {
              const insets = useSafeAreaInsets();
              return {
                height: 80 + insets.top,
                elevation: 12
              }
            })(),
            headerTitle: () => {
              return <Image
                source={require("./assets/fut_logo_wide.png")}
                resizeMode={"contain"}
                style={{
                  width: 245,
                  height: 80,
                }}
              />
            },
            tabBarActiveTintColor: '#AA0132',
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
            name="Harmonogram"
            options={() => ({
              tabBarIcon: ({focused, color, size}) => {
                const iconName = focused ? "format-list-text" : "format-list-text";

                return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
              }
            })}
            component={CalendarScreen}
          />
          <Tab.Screen
            name="Sponsorzy"
            options={() => ({
              tabBarIcon: ({focused, color, size}) => {
                const iconName = focused ? "people-circle" : "people-circle-outline";

                return <Ionicons name={iconName} size={size} color={color}/>;
              }
            })}
            component={SponsorsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}