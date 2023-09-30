import {FlatList, View} from "react-native";
import * as React from "react";
import {EventListItem} from "../components/EventListItem";

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
    name: "Wykład o krążeniu materii",
    type: "lecture",
    lecturer: "Olek Grotowski, Małgorzata Zwierzchowska",
    datetime_start: new Date("2023-10-14T12:15:00.000Z"),
    datetime_end: new Date("2023-10-14T13:45:00.000Z"),
    room: "Mała Aula (sala 237, II piętro)",
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
]

export function CalendarScreen() {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={events}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 8,}}
        renderItem={({item}) => {
            return EventListItem(item);
      }}
      />
    </View>
  );
}