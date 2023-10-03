import {HomeScreen} from "../screens/Home";
import {Image, SafeAreaView, View} from "react-native";
import {ScheduleScreen} from "../screens/Schedule";
import {EventDetailsScreen} from "../screens/EventDetails";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export type MainStackParamList = {
  Home: undefined
  Schedule: undefined
  EventDetails: { eventId: string }
};

export function MainStackNavigator() {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  const insets = useSafeAreaInsets();

  return <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        header: () => <>
          <View style={{paddingTop: insets.top}}>
            <Image
              source={require("../assets/fut_logo_wide.png")}
              resizeMode={"contain"}
              style={{
                width: 245,
                height: 80,
              }}
            />
          </View>
        </>
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        title: "Wydarzenia"
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