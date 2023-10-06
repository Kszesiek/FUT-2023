import {Text, View, ScrollView, StyleSheet, ColorValue} from "react-native";
import * as React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {events, eventType, Event, getEventTypeColor} from "../constants/events";
import {fonts} from "../constants/fonts";
import {getTimeFrame} from "../constants/time";

export function EventDetailsScreen({route, navigation}: NativeStackScreenProps<MainStackParamList, 'EventDetails'>) {
  const event: Event<eventType> | undefined = events.find((event) => event.name === route.params.eventName);

  if (!event || event === undefined) {
    navigation.goBack();
    return <View>
      <Text>Oops! Something went wrong :c</Text>
      <Text>Redirecting...</Text>
    </View>
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <View style={styles.container}>
        <Text style={textStyles.title}>{event.name}</Text>
        <View style={styles.eventTypeSeparatorContainer}>
          <View style={{...styles.eventTypeSeparator, backgroundColor: getEventTypeColor(event.type)}}/>
        </View>
        <Text style={textStyles.label}>Czas trwania: {getTimeFrame(event.datetime_start, event.datetime_end)}</Text>
        {!!event.lecturer && <Text style={textStyles.label}>Prowadzący: {event.lecturer}</Text>}
        <Text style={textStyles.label}>Miejsce: {event.place}</Text>
        <View style={{height: 12}}/>
        <Text style={textStyles.label}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    elevation: 8,
    backgroundColor: 'white',
  },
  eventTypeSeparator: {
    height: 6,
    borderRadius: 100,
  },
  eventTypeSeparatorContainer: {
    // paddingHorizontal: 20,
    paddingVertical: 16,
  },
})

const textStyles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: fonts.Ubuntu["500"].regular,
    textAlign: "center",
    paddingVertical: 4,

  },
  label: {
    fontSize: 16,
    paddingVertical: 4,
  },
})