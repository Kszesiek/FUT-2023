import {View, Text, StyleSheet, ColorValue} from "react-native";
import {Event, eventType} from "../screens/Calendar";

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
  const lecturerLabel = typeof event.lecturer === "string" ? <Text style={textStyles.label}>Prowadzący: {event.lecturer}</Text> : <></>;
  const currentDate = new Date("2023-10-14T16:00:00.000Z");

  function getEventTypeIndicator() {
    const [backgroundColor, width] = ((): [ColorValue, number] => {
      switch (event.type) {
        case "main event":
          return ["#F29F05", 24];
        case "lecture":
          return ["#A387D7", 12];
        default:
          return ["#888", 12];
      }
    })();

    return <View style={styles.eventTypeIndicatorContainer}>
      <View style={[styles.eventTypeIndicatorTemplate, {backgroundColor, width}]}/>
    </View>
  }

  return <View style={styles.outerContainer}>
    <View style={styles.innerContainer}>
      {getEventTypeIndicator()}
      <View style={{flex: 1,}}>
        <Text style={textStyles.title}>{event.name}</Text>
        <Text style={textStyles.label}>{getTimeFrame(event.datetime_start, event.datetime_end)}</Text>
        {lecturerLabel}
        <Text style={textStyles.label}>Sala: {event.room}</Text>
      </View>
    </View>
    {currentDate > event.datetime_start && <View style={styles.inactiveEventOverlay}/>}
  </View>;
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 8,
    backgroundColor: "white",
    overflow: "hidden",
  },
  innerContainer: {
    padding: 16,
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
    borderRadius: 8,
    flex: 1,
  },
  eventTypeIndicatorContainer: {
    width: 24,
    marginRight: 8,
    alignItems: "flex-end",
  }
})

const textStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
  }
})