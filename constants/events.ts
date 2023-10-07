import {ColorValue} from "react-native";

export type eventType = "lecture" | "main event" | undefined;

export interface Event<EventType extends eventType> {
  name: string,
  type: EventType,
  lecturer?: EventType extends "lecture" ? string : never,
  datetime_start: Date,
  datetime_end: Date,
  place: string,
  description?: string,
  basic_or_extended?: "basic" | "extended",
  dress_code?: string,
}

export const events: Array<Event<eventType>> = [
  {
    name: "Jak to jest być w Kolegium, dobrze?",
    type: "lecture",
    lecturer: "Bartosz Gembalczyk",
    datetime_start: new Date("2023-10-14T10:15:00.000Z"),
    datetime_end: new Date("2023-10-14T11:45:00.000Z"),
    place: "165",
    basic_or_extended: 'basic',
  },
  {
    name: "Bingowanie to moja pasja. Jak w dwa księżyce napisać aplikację na FUT?",
    type: "lecture",
    lecturer: "inż. Grzegorz Rusinek",
    datetime_start: new Date("2023-10-14T10:45:00.000Z"),
    datetime_end: new Date("2023-10-14T12:15:00.000Z"),
    place: "165",
    basic_or_extended: 'extended',
  },
  {
    name: "Wykład o krążeniu materii",
    type: "lecture",
    lecturer: "Olek Grotowski, Małgorzata Zwierzchowska",
    datetime_start: new Date("2023-10-14T11:15:00.000Z"),
    datetime_end: new Date("2023-10-14T12:45:00.000Z"),
    place: "Mała Aula (sala 237, II piętro)",
    basic_or_extended: 'basic',
  },
  {
    name: "Energetyka jądrowa dla opornych",
    type: "lecture",
    lecturer: "mgr inż. Łukasz Trybulski",
    datetime_start: new Date("2023-10-14T11:45:00.000Z"),
    datetime_end: new Date("2023-10-14T13:15:00.000Z"),
    place: "231",
    basic_or_extended: 'extended',
  },
  {
    name: "Dogłębna analiza obsługi projektorów i rzutników w salach wykładowych",
    type: "lecture",
    lecturer: "prof. dr hab. inż. Robert Zalewski",
    datetime_start: new Date("2023-10-14T12:15:00.000Z"),
    datetime_end: new Date("2023-10-14T13:45:00.000Z"),
    place: "123",
    basic_or_extended: 'basic',
  },
  {
    name: "Wszystko, wszędzie, na raz. Jak ogarniać w bycie przewodniczącym Samorządu Studentów, czyli życie na krawędzi załamania psychicznego, ale przynajmniej historie są ciekawe!",
    type: "lecture",
    lecturer: "inż. Rafał Pyżalski",
    datetime_start: new Date("2023-10-14T12:45:00.000Z"),
    datetime_end: new Date("2023-10-14T14:15:00.000Z"),
    place: "165",
    basic_or_extended: 'extended',
  },
  {
    name: "Proszę państwa: drzewa. Co wynieśliśmy z edukacji zdalnej podczas pandemii?",
    type: "lecture",
    lecturer: "dr hab. inż. Andrzej Zalewski",
    datetime_start: new Date("2023-10-14T13:15:00.000Z"),
    datetime_end: new Date("2023-10-14T14:45:00.000Z"),
    place: "234",
    basic_or_extended: 'basic',
  },
  {
    name: "Gala Forum Uczelni Technicznych - część 1",
    type: "main event",
    datetime_start: new Date("2023-10-14T15:00:00.000Z"),
    datetime_end: new Date("2023-10-14T17:00:00.000Z"),
    place: "Duża Aula",
  },
  {
    name: "Przerwa w głównej uroczystości - poczęstunek",
    type: undefined,
    datetime_start: new Date("2023-10-14T17:00:00.000Z"),
    datetime_end: new Date("2023-10-14T18:00:00.000Z"),
    place: "Mała Aula (237, II piętro)",
  },
  {
    name: "Gala Forum Uczelni Technicznych - część 2",
    type: "main event",
    datetime_start: new Date("2023-10-14T18:00:00.000Z"),
    datetime_end: new Date("2023-10-14T20:00:00.000Z"),
    place: "Duża Aula",
  },
  {
    name: "After w Małej Auli!",
    type: undefined,
    datetime_start: new Date("2023-10-14T20:00:00.000Z"),
    datetime_end: new Date("2023-10-14T23:00:00.000Z"),
    place: "Mała Aula (237, II piętro)",
  },
];

// const eventTypeColor: { [key in keyof eventType]: ColorValue } = {
// // const eventTypeColor: Record<eventType, ColorValue> = {
//   "main event": "#F29F05",
//   "lecture": "#A387D7",
//   "undefined": "#888888",
// };

const eventTypeColor: Map<eventType, ColorValue> = new Map([
  [ "main event", "#F29F05" ],
  [ "lecture", "#A387D7" ],
  [ undefined, "#888888" ],
]);

export function getEventTypeColor(eventType: eventType): ColorValue {
  const result =  eventTypeColor.get(eventType);
  return !result ? "#888888" : result;
}