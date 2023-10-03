import {View, Text, StyleSheet, ColorValue, TouchableOpacity} from "react-native";
import {Event, eventType} from "../data/events";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {MainStackParamList} from "../navigation/MainStackNavigator";

export function getTimeFrame(start: Date, end: Date) {
  const timeDifference = end.getTime() - start.getTime();
  const durationHours = Math.floor(timeDifference / 3600000);
  const hoursLabel = durationHours > 0 ? `${durationHours}h` : "";
  const durationMinutes = (timeDifference % 3600000) / 60000;
  const minutesLabel = durationMinutes > 0 ? `${durationMinutes}min` : "";
  const spaceInDuration = durationHours > 0 && durationMinutes > 0 ? " " : "";

  const timeRange = `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
  const durationLabel = `(${hoursLabel}${spaceInDuration}${minutesLabel})`;

  return timeRange + " " + durationLabel;
}

export function EventListItem<T extends eventType>({event, disableHighlight = false}: {
  event: Event<T>
  disableHighlight?: boolean
}) {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const currentDate = new Date("2023-10-14T16:00:00.000Z");
  const doesTakePlaceNow: boolean = disableHighlight ? false : event.datetime_start < currentDate && currentDate < event.datetime_end
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
    const backgroundColor: { [key in keyof eventType]: ColorValue } = {
      "main event": "#F29F05",
      "lecture": "#A387D7",
      undefined: "#888",
    };

    return <View style={[styles.eventTypeIndicatorTemplate, {backgroundColor: backgroundColor[event.type]}]}/>
  }

  return <TouchableOpacity
    style={[styles.outerContainer, doesTakePlaceNow && {backgroundColor: "#AA0132"}]}
    activeOpacity={0.6}
    key={event.name}
    onPress={() => navigation.navigate('EventDetails', {eventId: event.name})}
  >
    {getEventTypeIndicator()}
    <View style={styles.innerContainer}>
      <View style={{flex: 1,}}>
        <Text style={textStyles.title} numberOfLines={3} ellipsizeMode='tail'>{event.name}</Text>
        <Text style={textStyles.label}>{getTimeFrame(event.datetime_start, event.datetime_end)}</Text>
        {lecturerLabel}
        <Text style={textStyles.label}>Sala: {event.room}</Text>
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
    borderRadius: 12,
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