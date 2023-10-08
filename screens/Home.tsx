import {Text, View, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import * as React from "react";
import {FontAwesome, AntDesign} from "@expo/vector-icons";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {EventListItem} from "../components/EventListItem";
import {events} from "../constants/events";
import {colors} from "../constants/colors";

export function HomeScreen({route, navigation}: NativeStackScreenProps<MainStackParamList, 'Home'>) {
  const currentDate = new Date("2023-10-14T12:10:00.000Z");
  const minutes_before = 1800000;
  const eventsStartingSoon = events.filter((event) => event.datetime_start.getTime() - currentDate.getTime() < minutes_before && currentDate < event.datetime_start);
  const eventsTakingPlaceNow = events.filter((event) => event.datetime_start < currentDate && currentDate < event.datetime_end);

  return (
    <ScrollView contentContainerStyle={{padding: 12, flexGrow: 1}}>
      <Text style={textStyles.title}>Zaraz się zacznie</Text>
      {
        eventsStartingSoon.length > 0 ?
          eventsStartingSoon.map((event) =>
            <View key={event.name} style={{marginVertical: 8}}>
              <EventListItem event={event} disableHighlight={true} />
            </View>
          ) :
          <View style={{paddingVertical: 16, alignItems: 'center'}}>
            <Text style={{fontStyle: 'italic'}}>Nie zbliżają się żadne z wydarzenia</Text>
          </View>
      }

      <Text style={textStyles.title}>Dzieje się teraz</Text>
      {
        eventsTakingPlaceNow.length > 0 ?
          eventsTakingPlaceNow.map((event) =>
            <View key={event.name} style={{marginVertical: 8}}>
              <EventListItem event={event} disableHighlight={true} />
            </View>)
          :
          <View style={{paddingVertical: 16, alignItems: 'center'}}>
            <Text style={{fontStyle: 'italic'}}>W tym momencie nie odbywają się żadne z wydarzenia</Text>
          </View>
      }
      <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('Schedule')}>
        <Text style={textStyles.scheduleButtonText}>Zobacz pełny harmonogram</Text>
        {/*<FontAwesome name="chevron-right" size={14} color="white"/>*/}
        <AntDesign name="arrowright" size={18} color="white"/>
      </TouchableOpacity>
      <View style={{height: 40}}/>
      <View style={{flex: 1}}/>
      <Text style={textStyles.title}>Sponsorzy</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scheduleButton: {
    borderRadius: 100,
    backgroundColor: colors.accent_dark,
    alignSelf: "flex-end",
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 24,
    paddingRight: 20,
    marginTop: 12,
    flexDirection: "row",
    elevation: 12,
  },
});

const textStyles = StyleSheet.create({
  scheduleButtonText: {
    color: 'white',
    fontSize: 16,
    paddingRight: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Ubuntu_400Regular',
  },
});