import {FlatList, View} from "react-native";
import * as React from "react";
import {EventListItem} from "../components/EventListItem";
import {useEffect, useRef} from "react";

export type eventType = "lecture" | "main event" | undefined;

export interface Event<EventType extends eventType> {
  name: string,
  type: EventType,
  lecturer?: EventType extends "lecture" ? string : never,
  datetime_start: Date,
  datetime_end: Date,
  room: string,
}

const events: Array<Event<eventType>> = [
  {
    name: "Jak to jest być w Kolegium, dobrze?",
    type: "lecture",
    lecturer: "Bartosz Gembalczyk",
    datetime_start: new Date("2023-10-14T10:15:00.000Z"),
    datetime_end: new Date("2023-10-14T11:45:00.000Z"),
    room: "165",
  },
  {
    name: "Bingowanie to moja pasja. Jak w dwa księżyce napisać aplikację na FUT?",
    type: "lecture",
    lecturer: "inż. Grzegorz Rusinek",
    datetime_start: new Date("2023-10-14T10:45:00.000Z"),
    datetime_end: new Date("2023-10-14T12:15:00.000Z"),
    room: "165",
  },
  {
    name: "Wykład o krążeniu materii",
    type: "lecture",
    lecturer: "Olek Grotowski, Małgorzata Zwierzchowska",
    datetime_start: new Date("2023-10-14T11:15:00.000Z"),
    datetime_end: new Date("2023-10-14T12:45:00.000Z"),
    room: "Mała Aula (sala 237, II piętro)",
  },
  {
    name: "Energetyka jądrowa dla opornych",
    type: "lecture",
    lecturer: "mgr inż. Łukasz Trybulski",
    datetime_start: new Date("2023-10-14T11:45:00.000Z"),
    datetime_end: new Date("2023-10-14T13:15:00.000Z"),
    room: "231",
  },
  {
    name: "Dogłębna analiza obsługi projektorów i rzutników w salach wykładowych",
    type: "lecture",
    lecturer: "prof. dr hab. inż. Robert Zalewski",
    datetime_start: new Date("2023-10-14T12:15:00.000Z"),
    datetime_end: new Date("2023-10-14T13:45:00.000Z"),
    room: "123",
  },
  {
    name: "Wszystko, wszędzie, na raz. Jak ogarniać w bycie przewodniczącym Samorządu Studentów, czyli życie na krawędzi załamania psychicznego, ale przynajmniej historie są ciekawe!",
    type: "lecture",
    lecturer: "inż. Rafał Pyżalski",
    datetime_start: new Date("2023-10-14T12:45:00.000Z"),
    datetime_end: new Date("2023-10-14T14:15:00.000Z"),
    room: "165",
  },
  {
    name: "Proszę państwa: drzewa. Co wynieśliśmy z edukacji zdalnej podczas pandemii?",
    type: "lecture",
    lecturer: "dr hab. inż. Andrzej Zalewski",
    datetime_start: new Date("2023-10-14T13:15:00.000Z"),
    datetime_end: new Date("2023-10-14T14:45:00.000Z"),
    room: "234",
  },
  {
    name: "Gala Forum Uczelni Technicznych - część 1",
    type: "main event",
    datetime_start: new Date("2023-10-14T15:00:00.000Z"),
    datetime_end: new Date("2023-10-14T17:00:00.000Z"),
    room: "Duża Aula",
  },
  {
    name: "Przerwa w głównej uroczystości - poczęstunek",
    type: undefined,
    datetime_start: new Date("2023-10-14T17:00:00.000Z"),
    datetime_end: new Date("2023-10-14T18:00:00.000Z"),
    room: "Mała Aula (237, II piętro)",
  },
  {
    name: "Gala Forum Uczelni Technicznych - część 2",
    type: "main event",
    datetime_start: new Date("2023-10-14T18:00:00.000Z"),
    datetime_end: new Date("2023-10-14T20:00:00.000Z"),
    room: "Duża Aula",
  },
  {
    name: "After w Małej Auli!",
    type: undefined,
    datetime_start: new Date("2023-10-14T20:00:00.000Z"),
    datetime_end: new Date("2023-10-14T23:00:00.000Z"),
    room: "Mała Aula (237, II piętro)",
  },
]

export function CalendarScreen() {
  const flatListRef = useRef<FlatList>(null);
  const currentDate = new Date("2023-10-14T16:00:00.000Z");

  useEffect(() => {
    if (currentDate < events[0].datetime_start)
      return;
    if (flatListRef.current) {
      events.every((event, index) => {
        if (event.datetime_start > currentDate) {
          flatListRef.current?.scrollToIndex({animated: true, index: index});
          return;
        }
      });
      flatListRef.current?.scrollToIndex({animated: true, index: events.length - 1});
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
        contentContainerStyle={{flexGrow: 1, paddingVertical: 8,}}
        renderItem={({item}) => {
          return EventListItem(item);
        }}
      />
    </View>
  );
}