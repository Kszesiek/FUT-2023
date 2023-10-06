import {FlatList, View} from "react-native";
import * as React from "react";
import {EventListItem} from "../components/EventListItem";
import {useEffect, useRef} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../navigation/MainStackNavigator";
import {events} from "../constants/events";

export function ScheduleScreen({route, navigation}: NativeStackScreenProps<MainStackParamList, 'Schedule'>) {
  const flatListRef = useRef<FlatList>(null);
  const currentDate = new Date("2023-10-14T16:00:00.000Z");

  useEffect(() => {
    if (currentDate < events[0].datetime_start)
      return;
    if (flatListRef.current) {
      events.every((event, index) => {
        if (event.datetime_start > currentDate) {
          flatListRef.current?.scrollToIndex({animated: false, index: index});
          return;
        }
      });
      flatListRef.current?.scrollToIndex({animated: false, index: events.length - 1});
    }
  }, [flatListRef]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={events}
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