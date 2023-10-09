import {Text, View, ScrollView, StyleSheet} from "react-native";
import * as React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {events, eventType, Event, getEventTypeColor, eventTypeName} from "../constants/events";
import {fonts} from "../constants/fonts";
import {getTimeFrame} from "../constants/time";
import MapDisplay from "../components/MapDisplay";
import {locations, Location} from "../constants/locations";

export function EventDetailsScreen({route, navigation}: NativeStackScreenProps<MainStackParamList, 'EventDetails'>) {
  const event: Event<eventType> | undefined = events.find((event) => event.id === route.params.eventId);
  const location: Location | undefined = locations.find((location) => location.id === event?.locationId);

  if (!event || event === undefined) {
    navigation.goBack();
    return <View>
      <Text>Oops! Something went wrong :c</Text>
      <Text>Redirecting...</Text>
    </View>
  }

  return (
      <ScrollView contentContainerStyle={{padding: 16}}>
        <View style={styles.container}>
          <Text style={textStyles.title}>{event.name}</Text>
          <View style={styles.eventTypeSeparatorContainer}>
            <View style={{...styles.eventTypeSeparator, backgroundColor: getEventTypeColor(event.type)}}/>
          </View>
          <Text style={textStyles.label}>Czas trwania: {getTimeFrame(event.datetime_start, event.datetime_end)}</Text>
          {!!event.lecturer && <Text style={textStyles.label}>Prowadzący: {event.lecturer}</Text>}
          {!!location && <Text style={textStyles.label}>Miejsce: {location.name}{!!event.room && `, ${event.room}`}</Text>}
          {!!event.type && <View style={{flexDirection: 'row'}}>
              <Text style={textStyles.label}>Typ wydarzenia: {eventTypeName.get(event.type)}</Text>
              <View style={[styles.eventTypeIndicator, {backgroundColor: getEventTypeColor(event.type)}]}/>
          </View>}
          {!!event.basic_or_extended && <Text style={textStyles.label}>Wersja
              harmonogramu: {event.basic_or_extended === "basic" ? "podstawowa" : "rozszerzona"}</Text>}
          {!!event.description &&
              <Text style={[textStyles.description, {marginTop: 12, textAlign: "justify"}]}>{event.description}</Text>}
        </View>
        {!!location && <View style={styles.mapContainer}>
          <MapDisplay location={location}/>
        </View>}
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
    paddingVertical: 16,
  },
  eventTypeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginLeft: 4,
  },
  mapContainer: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 12,
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
  description: {
    fontSize: 14,
  },
})