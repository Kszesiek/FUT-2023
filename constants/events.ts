import {ColorValue} from "react-native";

export type eventType = "lecture" | "main event" | "attraction";
export const possibleEventTypes: eventType[] = ["main event", "lecture", "attraction"];

export interface Event<EventType extends eventType> {
  id: string,
  name: string,
  type?: EventType,
  lecturer?: EventType extends "lecture" ? string : never,
  datetime_start: Date,
  datetime_end: Date,
  place?: string,
  description?: string,
  basic_or_extended?: "basic" | "extended",
  dress_code?: string,
}

export const events: Array<Event<eventType>> = [
  // {
  //   name: "",
  //   type: "",
  //   lecturer: "",
  //   datetime_start: new Date("2023-10-12T16:00:00.000Z"),
  //   datetime_end: new Date("2023-10-12T16:00:00.000Z"),
  //   place: "",
  //   description: "",
  //   basic_or_extended: "basic" "extended",
  //   dress_code: "",
  // },
  // EXTENDED 12.10 CZWARTEK
  {
    id: "466baa75-8ef2-497b-a3b4-3c1a14aaff6c",
    name: "Rejestracja uczestników",
    datetime_start: new Date("2023-10-12T16:00:00.000Z"),
    datetime_end: new Date("2023-10-12T18:50:00.000Z"),
    place: "Hotel MDM",
    basic_or_extended: "extended",
  },
  {
    id: "2850188a-027c-43c2-9fb1-042b545b70de",
    name: "Wyjście grupami na sesję Puppy Jogi",
    type: "attraction",
    datetime_start: new Date("2023-10-12T16:45:00.000Z"),
    datetime_end: new Date("2023-10-12T19:45:00.000Z"),
    place: "Riviera SWFiS",
    description: "Specjalnie dla wersji rozszerzonej zaplanowaliśmy na czwartkowe popołudnie rozluźniającą sesję Puppy Jogi. Sesja trwa 60 minut – 45 min. to zajęcia z jogi, 15 min. to zabawa z psiakami.",
    basic_or_extended: "extended",
    dress_code: "strój sportowy",
  },
  {
    id: "e899922b-715d-46d3-86c3-57b0fe3bcdff",
    name: "Kolacja i integracja",
    type: "attraction",
    datetime_start: new Date("2023-10-12T21:30:00.000Z"),
    datetime_end: new Date("2023-10-13T00:00:00.000Z"),
    place: "Klub Stodoła",
    basic_or_extended: "extended",
  },
  // EXTENDED 13.10 PIĄTEK
  {
    id: "4f3cb1da-243c-4e6c-87c4-2466d22f8df4",
    name: "Śniadanie",
    datetime_start: new Date("2023-10-13T07:30:00.000Z"),
    datetime_end: new Date("2023-10-13T09:30:00.000Z"),
    place: "Hotel MDM",
    basic_or_extended: "extended",
  },
  {
    id: "26bbfb4b-09ef-453e-9c5a-15e9c951f081",
    name: "Wyjazd na WAT",
    type: "attraction",
    datetime_start: new Date("2023-10-13T09:30:00.000Z"),
    datetime_end: new Date("2023-10-13T09:30:00.000Z"),
    place: "Plac Politechniki 1",
    description: "Prosimy o punktualne przybycie.",
    basic_or_extended: "extended",
    dress_code: "casual",
  },
  {
    id: "1f609cf6-8dae-4ebc-bd0d-91ed8655c671",
    name: "Open Space",
    type: "attraction",
    datetime_start: new Date("2023-10-13T10:30:00.000Z"),
    datetime_end: new Date("2023-10-13T11:30:00.000Z"),
    place: "WAT Wydział Kacpra trzeba spytać o salę",                                          //TODO: DO DOPRECYZOWANIA
    basic_or_extended: "extended",
  },
  {
    id: "b3ec8da3-67eb-4f37-a61c-f42d499404b1",
    name: "Atrakcje WAT",
    type: "attraction",
    datetime_start: new Date("2023-10-13T11:30:00.000Z"),
    datetime_end: new Date("2023-10-13T14:00:00.000Z"),
    place: "Biblioteka główna WAT (gen. Sylwestra Kaliskiego 19)",
    description: "Uczestnicy wezmą udział w grze terenowej po kampusie Wojskowej Akademii Technicznej. Gra rozpocznie się pod Biblioteką Główną WAT, a następnie uczestnicy udadzą się na wojskowy obiad.",
    basic_or_extended: "extended",
  },
  {
    id: "47fd58d2-0d0d-4ebe-b72c-a3c851c5feb0",
    name: "Obiad",
    datetime_start: new Date("2023-10-13T14:00:00.000Z"),
    datetime_end: new Date("2023-10-13T15:00:00.000Z"),
    place: "Stołówka WATu",
    basic_or_extended: "extended",
  },
  {
    id: "876a0f54-f74a-4cfe-835e-59084641f8b0",
    name: "Powrót do hotelu",
    type: "attraction",
    datetime_start: new Date("2023-10-13T15:30:00.000Z"),
    datetime_end: new Date("2023-10-13T15:30:00.000Z"),
    basic_or_extended: "extended",
  },
  // BASIC 13.10 PIĄTEK
  {
    id: "0ed1a4f6-738f-41fb-8c36-d89a9c2483eb",
    name: "Rejestracja uczestników",
    datetime_start: new Date("2023-10-13T14:00:00.000Z"),
    datetime_end: new Date("2023-10-13T18:00:00.000Z"),
    place: "Hotel MDM",
    basic_or_extended: "basic",
  },
  {
    id: "f7756475-bd3c-4730-b0a7-35238297f06f",
    name: "Wyjazd na oficjalne otwarcie",
    type: "main event",
    datetime_start: new Date("2023-10-13T18:30:00.000Z"),
    datetime_end: new Date("2023-10-13T18:30:00.000Z"),
    place: "Plac Politechniki 1",
    description: "Prosimy o punktualne przybycie.",
    dress_code: "smart casual",
  },
  {
    id: "abdbfd93-1b85-4df4-8ad6-f4c9fded5c36",
    name: "Oficjalne Otwarcie Zjazdu FUT",
    type: "main event",
    datetime_start: new Date("2023-10-13T19:30:00.000Z"),
    datetime_end: new Date("2023-10-13T22:00:00.000Z"),
    place: "WAT Wydział Kacpra jakaś aula\nWydział Bezpieczeństwa, Logistyki i Zarządzania (gen. Sylwestra Kaliskiego 2B)",    //TODO: DO DOPRECYZOWANIA
    dress_code: "smart casual",
  },
  {
    id: "918cbd49-8d6e-4726-8e32-aabf088d6cb7",
    name: "Integracja",
    type: "attraction",
    datetime_start: new Date("2023-10-13T22:00:00.000Z"),
    datetime_end: new Date("2023-10-14T00:00:00.000Z"),
    place: "Spin City Kręgielnia",
    dress_code: "smart casual",
  },
  // 14.10 SOBOTA
  {
    id: "87398817-6484-4b4f-ab52-c45d19c78296",
    name: "Śniadanie",
    datetime_start: new Date("2023-10-14T07:30:00.000Z"),
    datetime_end: new Date("2023-10-14T09:30:00.000Z"),
    place: "Hotel MDM",
  },
  {
    id: "f03f6328-7f96-4327-aba8-84900c859d97",
    name: "Szkolnictwo wyższe w ujęciu międzynarodowym",
    type: "lecture",
    lecturer: "Julia Kostro",
    datetime_start: new Date("2023-10-14T10:00:00.000Z"),
    datetime_end: new Date("2023-10-14T15:00:00.000Z"),
    place: "Centrum Innowacji - Rektorska 4, sala 4.05",
    description: '„Erasmus to wszystko, co zagranica ma do zaoferowania.” Ale czy na pewno? Podczas szkolenia poznasz najważniejsze organizacje, procesy i trendy z areny międzynarodowej, które skupiają się wokół szkolnictwa wyższego. Otrzymasz niezbędne narzędzia i wiedzę, aby móc skutecznie zaangażować się w jego kształtowanie na poziomie europejskim. Podejmiemy dyskusje w zakresie kluczowych zagadnień dla środowisk studenckich, w tym m.in. o Uniwersytetach Europejskich, aby wiedzieć, jak zadbać o prostudencką i jak najlepszą przyszłość swoich uczelni.',
    dress_code: "casual",
  },
  {
    id: "6887e32b-3f7e-4eee-9164-d8149317936d",
    name: "Pomoc socjalna na uczelniach wyższych",
    type: "lecture",
    lecturer: "Wojciech Kiełbasiński",
    datetime_start: new Date("2023-10-14T10:00:00.000Z"),
    datetime_end: new Date("2023-10-14T15:00:00.000Z"),
    place: "Centrum Innowacji - Rektorska 4, sala 3.07",
    description: "Szkolenie zostanie przeprowadzone z wykorzystaniem nowoczesnych technik dydaktycznych. Uczestnicy rozwiązywać będą interaktywne quizy oraz case study. W pierwszej części szkolenia wśród poruszanych zagadnień znajdą się przepisy odnoszące się do postępowania administracyjnego, przepisów ustawy prawo o szkolnictwie wyższym i nauce, czy też ustawy o świadczeniach rodzinnych. Prowadzący omówi świadczenia istotne z punkty widzenia studentów tj. stypendium socjalne, stypendium rektora, stypendium dla osób niepełnosprawnych oraz zapomoga. Wskaże również na dobre praktyki w działalności komisji stypendialnych. Podczas drugiej części szkolenia poruszane zostaną tematy tworzenia prawa ze szczególnym uwzględnieniem regulaminu świadczeń dla studentów, zasad techniki prawodawczej, zasad wykładni prawa oraz hierarchii źródeł prawa.",
    dress_code: "casual",
  },
  {
    id: "b24e53cd-6c6c-47c9-a0b9-d3292dbce736",
    name: "Kształtowanie wizerunku organizacji wśród podmiotów zewnętrznych",
    type: "lecture",
    lecturer: "Marta Klasa, Daniel Jakubowski, Jakub Jeromin",
    datetime_start: new Date("2023-10-14T10:00:00.000Z"),
    datetime_end: new Date("2023-10-14T15:00:00.000Z"),
    place: "Centrum Innowacji - Rektorska 4, sala 4.04",
    description: "Podczas warsztatów uczestnicy dowiedzą się jak efektywnie kreować pozytywny i atrakcyjny dla podmiotów zewnętrznych, potencjalnych partnerów i odbiorców wizerunek organizacji studenckiej. Prelegenci przedstawią także w jaki sposób negocjować warunki współpracy tak, aby osiągać cele organizacji oraz jak równoważyć świadczenia obu stron. Ostatni fragment panelu poświęcony będzie warsztatom z praktycznego wykorzystywania umiejętności miękkich w rozmowach z partnerem. Panel warsztatowy poprowadzą: Wiceprzewodnicząca ds. Wizerunku i Promocji Zarządu Krajowego NZS – Martyna Klasa, Wiceprzewodniczący ds. Rozwoju Zarządu Krajowego NZS – Daniel Jakubowski oraz Wiceprzewodniczący ds. Partnerów Zarządu Krajowego NZS – Jakub Jeromin.",
    dress_code: "casual",
  },
  {
    id: "253b4b7d-41f4-4ac3-b3fa-0d2b26c56a11",
    name: "Szkolenie dla delegatów – Czy stres mnie zabija?",
    type: "lecture",
    lecturer: "Sławomir Prusakowski",
    datetime_start: new Date("2023-10-14T10:00:00.000Z"),
    datetime_end: new Date("2023-10-14T15:00:00.000Z"),
    place: "Warszawska Akademia Techniczna",
    description: "Czy stres mnie zabija? Czyli jak to jest z tym stresem i jak go okiełznać. W trakcie szkolenia uczestnicy zrozumieją, dlaczego stres jest obecny w naszym życiu i czy ma więcej wad czy zalet. Przyjrzymy się różnym metodom radzenia sobie ze stresem i przećwiczymy niektóre z nich. A na koniec stworzymy plan wdrażania planu, czyli zwiększymy szansę na efektywne zarządzanie stresem.",
    dress_code: "casual",
  },
  {
    id: "78908119-d121-4d23-92d9-e383c586c9f0",
    name: "Rada Starszych",
    type: "lecture",
    datetime_start: new Date("2023-10-14T10:00:00.000Z"),
    datetime_end: new Date("2023-10-14T15:00:00.000Z"),
    place: "Wydział Elektroniki i Technik Informacyjnych, Audytorium Centralne",
    dress_code: "smart casual",
  },
  {
    id: "823485ac-f149-4064-a01f-9f9b94734736",
    name: "Przerwa kawowa",
    datetime_start: new Date("2023-10-14T11:30:00.000Z"),
    datetime_end: new Date("2023-10-14T11:45:00.000Z"),
  },
  {
    id: "3ec89a27-aba0-40be-901c-a5a156f9df17",
    name: "Obiad",
    datetime_start: new Date("2023-10-14T15:00:00.000Z"),
    datetime_end: new Date("2023-10-14T16:00:00.000Z"),
  },
  {
    id: "598f27ad-cdc1-4c31-ba73-9dc2980e865e",
    name: "Sesja robocza",
    datetime_start: new Date("2023-10-14T16:00:00.000Z"),
    datetime_end: new Date("2023-10-14T18:00:00.000Z"),
    place: "Rektorska 4",
    dress_code: "smart casual",
  },
  {
    id: "9bc16b8b-54af-460a-b0e4-801783244102",
    name: "Czas wolny",
    datetime_start: new Date("2023-10-14T18:30:00.000Z"),
    datetime_end: new Date("2023-10-14T19:45:00.000Z"),
  },
  {
    id: "18ddbb31-23b5-4dc2-ba47-67000d60ed0f",
    name: "Gala Forum Uczelni Technicznych",
    type: "main event",
    datetime_start: new Date("2023-10-14T20:00:00.000Z"),
    datetime_end: new Date("2023-10-15T04:00:00.000Z"),
    place: "Duża Aula Gmachu Głównego Politechniki Warszawskiej",
    description: "Jak co roku podczas uroczystej Gali nagrodzone zostaną najlepsze inicjatywy samorządowe oraz projekty Kół Naukowych uczelni zrzeszonych w Forum Uczelni Technicznych. Po ogłoszeniu wyników i wręczeniu nagród odbędzie się bal wieńczący. Gmach Główny Politechniki Warszawskiej olśni wszystkich swym urokiem. Zachęcamy do założenia strojów wieczorowych.",
    dress_code: "formal",
  },
  // {
  //   id: "3b710085-a55b-4f7b-ba3c-d1cdc9af6bfb",
  //   name: "Bal po Gali",
  //   type: "main event",
  //   datetime_start: new Date("2023-10-15T00:00:00.000Z"),
  //   datetime_end: new Date("2023-10-15T04:00:00.000Z"),
  //   place: "Duża Aula Gmachu Głównego Politechniki Warszawskiej",
  //   dress_code: "formal",
  // },
];

const eventTypeColor: Map<eventType, ColorValue> = new Map([
  [ "main event", "#F29F05" ],
  [ "lecture", "#059BF2" ], // "#A387D7"
  [ "attraction", "#74B72E" ], // "#FF91A4"
]);

export function getEventTypeColor(eventType: eventType | undefined): ColorValue {
  if (eventType === undefined)
    return "#888888";
  const result = eventTypeColor.get(eventType);
  return !result ? "#888888" : result;
}


export const eventTypeName: Map<eventType, string> = new Map([
  [ "main event", "Główne wydarzenie" ],
  [ "lecture", "Szkolenie" ], // "#A387D7"
  [ "attraction", "Atrakcja" ], // "#FF91A4"
]);