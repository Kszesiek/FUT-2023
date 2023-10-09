import {View, Text, StyleSheet, ColorValue, TouchableOpacity} from "react-native";
import {Event, eventType, getEventTypeColor} from "../constants/events";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {colors} from "../constants/colors";
import {currentDate, getTimeFrame} from "../constants/time";
import {Location, locations} from "../constants/locations";

export function EventListItem<T extends eventType>({event, disableHighlight = false}: {
  event: Event<T>
  disableHighlight?: boolean
}) {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const doesTakePlaceNow: boolean = disableHighlight ? false : event.datetime_start < currentDate && currentDate < event.datetime_end;
  const location: Location | undefined = locations.find((location) => location.id === event?.locationId);

  const textStyles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: doesTakePlaceNow ? "white" : "black",
    },
    label: {
      fontSize: 12,
      color: doesTakePlaceNow ? "white" : "black",
    }
  })

  const lecturerLabel = typeof event.lecturer === "string" ?
    <Text style={textStyles.label}>Prowadzący: {event.lecturer}</Text> : <></>;

  function getEventTypeIndicator() {
    const backgroundColor: ColorValue = getEventTypeColor(event.type);
    return <View style={[styles.eventTypeIndicatorTemplate, {backgroundColor: backgroundColor}]}/>
  }

  return <TouchableOpacity
    style={[styles.outerContainer, doesTakePlaceNow && {backgroundColor: colors.accent_dark}]}
    activeOpacity={0.6}
    key={event.name}
    onPress={() => navigation.navigate('EventDetails', {eventId: event.id})}
  >
    {getEventTypeIndicator()}
    <View style={styles.innerContainer}>
      <View style={{flex: 1,}}>
        <Text style={textStyles.title} numberOfLines={3} ellipsizeMode='tail'>{event.name}</Text>
        <Text style={textStyles.label}>{getTimeFrame(event.datetime_start, event.datetime_end)}</Text>
        {lecturerLabel}
        {!!location && <Text style={textStyles.label}>Miejsce: {location.name}{!!event.room && `, ${event.room}`}</Text>}
      </View>
      <View style={{justifyContent: "center"}}>
        <MaterialCommunityIcons name="chevron-right" size={32} color={doesTakePlaceNow ? "white" : "black"}/>
      </View>
    </View>
    {currentDate > event.datetime_end && !disableHighlight && <View style={styles.inactiveEventOverlay}/>}
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 12,
    elevation: 8,
    backgroundColor: "white",
    overflow: "hidden",
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 4,
    paddingLeft: 12,
    flexDirection: 'row',
  },
  inactiveEventOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
    backgroundColor: "#ccc",
  },
  eventTypeIndicatorTemplate: {
    width: 12,
  },
})