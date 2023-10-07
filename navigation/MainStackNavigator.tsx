import {HomeScreen} from "../screens/Home";
import {Image, View} from "react-native";
import {ScheduleScreen} from "../screens/Schedule";
import {EventDetailsScreen} from "../screens/EventDetails";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {colors} from "../constants/colors";

export type MainStackParamList = {
  Home: undefined
  Schedule: undefined
  EventDetails: { eventName: string }
};

export function MainStackNavigator() {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  const insets = useSafeAreaInsets();

  return <Stack.Navigator
  screenOptions={{
    statusBarColor: colors.accent_dark as string,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: colors.accent_dark as string,
    }
  }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        header: () =>
          <View style={{paddingTop: insets.top, elevation: 12, backgroundColor: colors.accent_dark as string,}}>
            <Image
              source={require("../assets/fut_logo_wide.png")}
              resizeMode={"contain"}
              style={{
                width: 245,
                height: 80,
              }}
            />
          </View>,
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        title: "Wydarzenia"
        headerShadowVisible: false,
      }}
    />
    <Stack.Screen
      name="EventDetails"
      component={EventDetailsScreen}
      options={{
        title: "Szczegóły wydarzenia"
      }}
    />
  </Stack.Navigator>
}