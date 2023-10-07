import {FlatList, View} from "react-native";
import * as React from "react";
import {EventListItem} from "../components/EventListItem";
import {useEffect, useRef, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {events, Event} from "../constants/events";
import HighlightChooser from "../components/HighlightChooser";
import {colors} from "../constants/colors";

export function ScheduleScreen({route, navigation}: NativeStackScreenProps<MainStackParamList, 'Schedule'>) {
  const flatListRef = useRef<FlatList>(null);
  const currentDate = new Date("2023-10-14T16:00:00.000Z");
  const [basicOrExtended, setBasicOrExtended] = useState<"basic" | "extended">("basic");

  const [displayEvents, setDisplayEvents] = useState<Array<Event<any>>>(events.filter((event) => event.basic_or_extended === undefined || event.basic_or_extended === basicOrExtended));

  useEffect(() => {
    if (currentDate < events[0].datetime_start)
      return;
    if (flatListRef.current) {
      displayEvents.every((event, index) => {
        if (event.datetime_start > currentDate) {
          flatListRef.current?.scrollToIndex({animated: false, index: index});
          return;
        }
      });
      flatListRef.current?.scrollToIndex({animated: false, index: displayEvents.length - 1});
    }
  }, [flatListRef]);

  useEffect(() => {
    setDisplayEvents((events.filter((event) => event.basic_or_extended === undefined || event.basic_or_extended === basicOrExtended)));
  }, [basicOrExtended]);

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: colors.accent_dark}}>
        <View style={{paddingHorizontal: 16, paddingBottom: 12, paddingTop: 6, borderRadius: 100, backgroundColor: "#ffffff00"}}>
          <HighlightChooser
            data={new Array<{label: string, key: "basic" | "extended"}>({label: "Wersja podstawowa", key: "basic"}, {label: "Wersja rozszerzona", key: "extended"})}
            onPress={(chosenKey) => {setBasicOrExtended(chosenKey)}}
            style={{backgroundColor: colors.accent_between}}
          />
        </View>
      </View>
      <FlatList
        data={displayEvents}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        ref={flatListRef}
        getItemLayout={(data, index) => {
          return {length: 128, offset: 128 * index, index};
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        renderItem={({item}) => {
          return <View style={{marginVertical: 8}}>
            <EventListItem event={item} />
          </View>
            ;
        }}
      />
    </View>
  );
}