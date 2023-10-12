import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking,
  Button,
} from "react-native";
import * as React from "react";
import {AntDesign} from "@expo/vector-icons";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {EventListItem} from "../components/EventListItem";
import {events} from "../constants/events";
import {colors} from "../constants/colors";
import {currentDate} from "../constants/time";
import {useContext} from "react";
import {AppContext} from "../state/AppContext";
import {AppearingView} from "../components/AppearingView";

export function HomeScreen({route, navigation}: NativeStackScreenProps<MainStackParamList, 'Home'>) {
  const minutes_before = 2 * 60 * 60 * 1000;
  const eventsStartingSoon = events.filter((event) => event.datetime_start.getTime() - currentDate.getTime() < minutes_before && currentDate < event.datetime_start);
  const eventsTakingPlaceNow = events.filter((event) => event.datetime_start < currentDate && currentDate < event.datetime_end);
  //
  const appContext = useContext(AppContext);

  async function installAsPWA() {
    if (appContext.PWAEvent == undefined)
      return;

    appContext.PWAEvent.prompt();
    const {outcome} = await appContext.PWAEvent.userChoice;
    appContext.PWAEvent.setPWAEvent(undefined);
    appContext.setNotReadyToInstall();
  }


  return (<>
      <ScrollView contentContainerStyle={{padding: 12, flexGrow: 1,}}>
        {/*<Text style={{textAlign: "right"}}>Environment: {process.env.NODE_ENV}</Text>*/}
        {/*<Text style={{fontStyle: "italic"}}>Product is not indicative of the final version.</Text>*/}
        {/*<Text style={{fontStyle: "italic"}}>Czy coś tam.</Text>*/}
        <Text style={{fontStyle: "italic"}}>{new Date(Date.now()).toLocaleString()}</Text>
        <AppearingView>
          <View style={styles.outerCard}>
            <Text style={{...textStyles.title, marginTop: 0, marginBottom: 8,}}>Zainstaluj mnie!</Text>
            <Text style={{fontSize: 16, textAlign: "justify"}}>Czy wiesz, że możesz zainstalować tę stronę jako
              aplikację PWA na swoim
              telefonie? Użyj do tego
              przycisku znajdującego się poniżej.</Text>
            <TouchableOpacity style={styles.PWAButton} onPress={installAsPWA}>
              <Text style={textStyles.PWAButtonText}>Zainstaluj stronę jako aplikację PWA</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={appContext.setNotReadyToInstall}>
              <Text style={{
                color: 'gray',
                fontWeight: '600',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 12,
                marginBottom: 4,
              }}>Nie interesuje mnie to</Text>
            </TouchableOpacity>
          </View>
        </AppearingView>

        {/*<Button title={"Show / hide PWA button"} onPress={appContext.setReadyToInstall}/>*/}
        <Text style={textStyles.title}>Zaraz się zacznie</Text>
        {
          eventsStartingSoon.length > 0 ?
            eventsStartingSoon.map((event) =>
              <View key={event.id} style={{marginVertical: 8}}>
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
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://msapps.pl/')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 3.5}}
                     source={require('../assets/sponsors/msapps.png')}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.sponsorsRow}>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://ispot.pl/?gclid=Cj0KCQjwsp6pBhCfARIsAD3GZubaid3MbafCYgaUeH3aNKmqQutusALwB5JFNdH5q2-NcegOxsO14b4aAsLKEALw_wcB&gclsrc=aw.ds')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 6.5}}
                     source={require('../assets/sponsors/iSpot_AES_logo_wht.png')}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.sponsorsRow}>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://www.cortland.pl/edukacja/istudies/')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 1.1}}
                     source={require('../assets/sponsors/iStudies_logo_vert_black_bare.png')}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://www.nescafe.com/pl/')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 1,}}
                     source={require('../assets/sponsors/nescafe.png')}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.sponsorsRow}>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://www.nzspw.pl/')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 2}}
                     source={require('../assets/sponsors/NZS.png')}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://www.redbull.com/pl-pl/?rbcid=19716337114&utm_source=Adwords&utm_medium=g&utm_campaign=19716337114&utm_content=648869728010&gclid=CjwKCAjwyY6pBhA9EiwAMzmfwXLP6KmHIGzz_Bhsip6qXSTZhUOVviEDwCc_VXn3Okz6ddakjyrviBoC2CgQAvD_BwE')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 1.765,}}
                     source={require('../assets/sponsors/redbull.png')}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.sponsorsRow}>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://www.instagram.com/ksdistribution_official/#')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 3}}
                     source={require('../assets/sponsors/nicks.png')}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://mysubway.pl/')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 5}}
                     source={require('../assets/sponsors/Subway.png')}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.sponsorsRow}>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://www.reflect.pl/')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 2.2}}
                     source={require('../assets/sponsors/reflectgroup.png')}/>

            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
              Linking.openURL('https://www.instagram.com/ksdistribution_official/#')
            }}>
              <Image style={{...styles.sponsorLogo, aspectRatio: 4}}
                     source={require('../assets/sponsors/KS-Distribution.png')}/>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
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
    justifyContent: 'center',
    paddingVertical: 8,
  },
  sponsorLogo: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    marginHorizontal: 12,
    maxWidth: 300,
  },
  outerCard: {
    borderRadius: 12,
    elevation: 12,
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.accent_dark,
    height: 'auto',
  },
  PWAButton: {
    borderRadius: 100,
    backgroundColor: colors.accent_dark,
    alignSelf: "center",
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    elevation: 12,
  },
});

const textStyles = StyleSheet.create({
  scheduleButtonText: {
    color: 'white',
    fontSize: 16,
    paddingRight: 8,
  },
  PWAButtonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Ubuntu_400Regular',
    marginTop: 12,
  },
});