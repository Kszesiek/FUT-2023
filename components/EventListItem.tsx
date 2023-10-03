import {View, Text, StyleSheet, ColorValue} from "react-native";
import {Event, eventType} from "../screens/Calendar";
import {MaterialCommunityIcons} from '@expo/vector-icons';

function getTimeFrame(start: Date, end: Date) {
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

export function EventListItem<T extends eventType>(event: Event<T>) {
  const currentDate = new Date("2023-10-14T16:00:00.000Z");
  const doesTakePlaceNow: boolean = event.datetime_start < currentDate && currentDate < event.datetime_end
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

  return <View style={[styles.outerContainer, doesTakePlaceNow && {backgroundColor: "#AA0132"}]}>
    {getEventTypeIndicator()}
    <View style={[styles.innerContainer, doesTakePlaceNow && {backgroundColor: "#AA0132"}]}>
      <View style={{flex: 1,}}>
        <Text style={textStyles.title}>{event.name}</Text>
        <Text style={textStyles.label}>{getTimeFrame(event.datetime_start, event.datetime_end)}</Text>
        {lecturerLabel}
        <Text style={textStyles.label}>Sala: {event.room}</Text>
      </View>
      <View style={{justifyContent: "center"}}>
        <MaterialCommunityIcons name="chevron-right" size={32} color={doesTakePlaceNow ? "white" : "black"}/>
      </View>
    </View>
    {currentDate > event.datetime_end && <View style={styles.inactiveEventOverlay}/>}
  </View>;
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
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