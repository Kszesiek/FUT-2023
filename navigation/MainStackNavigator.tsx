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
  EventDetails: { eventId: string }
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
            <View style={{flexDirection: 'row', height: 80, alignItems: 'center'}}>
              <Image
                source={require("../assets/fut_logo_wide.png")}
                resizeMode={"contain"}
                style={{
                  width: 229,
                  height: 80,
                }}
              />
              <View style={{flex: 1}}/>
              <Image
                source={require("../assets/logo_pw.png")}
                resizeMode={"contain"}
                style={{
                  width: 60,
                  height: 60,
                  flex: 1,
                }}
              />
              <Image
                source={require("../assets/godlo_wat.png")}
                resizeMode={"contain"}
                style={{
                  width: 70,
                  height: 70,
                  flex: 1,
                }}
              />
            </View>
          </View>,
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        title: "Harmonogram",
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