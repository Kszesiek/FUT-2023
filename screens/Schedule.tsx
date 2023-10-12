import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import * as React from "react";
import {EventListItem} from "../components/EventListItem";
import {useContext, useEffect, useRef, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {events, possibleEventTypes, getEventTypeColor, eventTypeName} from "../constants/events";
import HighlightChooser from "../components/HighlightChooser";
import {colors} from "../constants/colors";
import {weekday} from "../constants/time";
import {SimpleLineIcons} from "@expo/vector-icons";
import {AppContext} from "../state/AppContext";

export function ScheduleScreen({route, navigation}: NativeStackScreenProps<MainStackParamList, 'Schedule'>) {
  const appContext = useContext(AppContext);
  const currentDate = appContext.currentTime;

  const flatListRef = useRef<FlatList>(null);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [basicOrExtended, setBasicOrExtended] = useState<"basic" | "extended">("basic");
  const basicEvents = events.filter((event) => event.basic_or_extended === undefined || event.basic_or_extended === 'basic');
  const extendedEvents = events.filter((event) => event.basic_or_extended === undefined || event.basic_or_extended === 'extended');

  let lastWeekday = {
    getDay() {
      return -1;
    },
  };

  useEffect(() => {
    const displayEvents = basicOrExtended === "basic" ? basicEvents : extendedEvents;
    if (currentDate < displayEvents[0].datetime_start)
      return;
    if (flatListRef.current) {
      let nearestEventIndex: number | undefined = undefined;
      let lastDate: Date = new Date(2023, 1, 1);
      displayEvents.forEach((event, index) => {
        if (event.datetime_start < currentDate && event.datetime_start.getTime() !== lastDate.getTime()) {
          nearestEventIndex = index;
          lastDate = event.datetime_start;
        }
      });
      const index = nearestEventIndex !== undefined ? nearestEventIndex : displayEvents.length - 1;
      flatListRef.current?.scrollToIndex({animated: false, index: index});
    }
  }, [basicOrExtended]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={Platform.OS === "web" && {marginRight: 16}} onPress={() => setIsHelpModalVisible(!isHelpModalVisible)}>
          <SimpleLineIcons name='question' size={24} color='white'/>
        </TouchableOpacity>
      ),
    })
  }, [])

  function getWeekdayHeader(date: Date) {
    return <Text
      style={textStyles.weekdayTitle}>{weekday[date.getDay()]}, {date.getDate()} października</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <View style={{
        backgroundColor: colors.accent_dark,
        elevation: 12,
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingTop: 6
      }}>
        <HighlightChooser
          data={new Array<{ label: string, key: "basic" | "extended" }>({
            label: "Wersja podstawowa",
            key: "basic"
          }, {label: "Wersja rozszerzona", key: "extended"})}
          onPress={(chosenKey) => {
            setBasicOrExtended(chosenKey)
          }}
          style={{backgroundColor: colors.accent_between}}
        />
      </View>
      <FlatList
        data={basicOrExtended === 'basic' ? basicEvents : extendedEvents} // basicOrExtended === 'basic' ? basicEvents : extendedEvents} // displayEvents
        keyExtractor={(item) => item.id}
        ref={flatListRef}
        getItemLayout={(data, index) => {
          return {length: 110, offset: 110 * index, index};
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        renderItem={({item}) => {
          const weekdayHeaderComponent = item.datetime_start.getDay() !== lastWeekday.getDay() ? getWeekdayHeader(item.datetime_start) : undefined;
          lastWeekday = item.datetime_start;

          return <>
            {weekdayHeaderComponent}
            <View style={{marginVertical: 8}}>
              <EventListItem event={item}/>
            </View>
          </>;
        }}
      />

      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isHelpModalVisible}
        onRequestClose={() => {
          setIsHelpModalVisible(!isHelpModalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setIsHelpModalVisible(!isHelpModalVisible)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalOuterContainer}>
                <View style={{
                  flexDirection: 'row',
                  padding: 16,
                  paddingBottom: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={textStyles.modalTitle}>Oznaczenia</Text>
                  <TouchableOpacity onPress={() => setIsHelpModalVisible(!isHelpModalVisible)}>
                    <SimpleLineIcons name="close" size={24} color='black'/>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalInnerContainer}>
                  {possibleEventTypes.map((type) => {
                    return <View key={type} style={{flexDirection: 'row', paddingVertical: 4,}}>
                      <View style={[styles.eventTypeIndicator, {backgroundColor: getEventTypeColor(type)}]}/>
                      <Text style={textStyles.modalLabel}> - {eventTypeName.get(type)}</Text>
                    </View>
                  })}
                  <View key={""} style={{flexDirection: 'row', paddingVertical: 4,}}>
                    <View style={[styles.eventTypeIndicator, {backgroundColor: getEventTypeColor(undefined)}]}/>
                    <Text style={textStyles.modalLabel}> - Pozostałe</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: '#00000070',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalOuterContainer: {
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    elevation: 12,
  },
  modalInnerContainer: {
    paddingTop: 0,
    padding: 32,
  },
  eventTypeIndicator: {
    width: 20,
    height: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
});

const textStyles = StyleSheet.create({
  weekdayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'black',
  },
  modalLabel: {
    fontSize: 16,
    color: 'black',
  },
  modalTitle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    flex: 1,
  },
});