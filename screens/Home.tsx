import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking
} from "react-native";
import * as React from "react";
import {AntDesign} from "@expo/vector-icons";
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
      {/*<Text style={{textAlign: "right"}}>Environment: {process.env.NODE_ENV}</Text>*/}
      {/*<Text style={{fontStyle: "italic"}}>Product is not indicative of the final version.</Text>*/}
      {/*<Text style={{fontStyle: "italic"}}>Czy coś tam.</Text>*/}
      <Text style={textStyles.title}>Zaraz się zacznie</Text>
      {
        eventsStartingSoon.length > 0 ?
          eventsStartingSoon.map((event) =>
            <View key={event.name} style={{marginVertical: 8}}>
              <EventListItem event={event} disableHighlight={true}/>
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
              <EventListItem event={event} disableHighlight={true}/>
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
      <Text style={textStyles.title}>Partnerzy wydarzenia</Text>
      <View>
        <View style={styles.sponsorsRow}>
          <Image style={{...styles.sponsorLogo, aspectRatio: 1.765}}
                 source={require('../assets/sponsors/redbull.png')}/>
          <Image style={{...styles.sponsorLogo, aspectRatio: 1}}
                 source={require('../assets/sponsors/nescafe.png')}/>
        </View>
        <View style={styles.sponsorsRow}>
          <Image style={{...styles.sponsorLogo, aspectRatio: 3}}
                 source={require('../assets/sponsors/nicks.png')}/>
          <Image style={{...styles.sponsorLogo, aspectRatio: 5}}
                 source={require('../assets/sponsors/Subway.png')}/>
        </View>
        <View style={styles.sponsorsRow}>
          <Image style={{...styles.sponsorLogo, aspectRatio: 2.2}}
                 source={require('../assets/sponsors/reflectgroup.png')}/>
          <TouchableWithoutFeedback onPress={() => {
            Linking.openURL('https://www.instagram.com/ksdistribution_official/#')
          }}>
            <Image style={{...styles.sponsorLogo, aspectRatio: 4}}
                   source={require('../assets/sponsors/KS-Distribution.png')}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
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
  sponsorsRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  sponsorLogo: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    marginHorizontal: 12,
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