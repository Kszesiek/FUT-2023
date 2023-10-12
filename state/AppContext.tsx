import React, {createContext, useEffect, useState} from "react";

type stateType = {
  isReadyToInstall: boolean,
  setReadyToInstall: () => void,
  setNotReadyToInstall: () => void,
  PWAEvent: any | undefined,
  setPWAEvent: (e: any) => void,
  currentTime: Date,
}

export const AppContext = createContext<stateType>({
  isReadyToInstall: false,
  setReadyToInstall: () => {},
  setNotReadyToInstall: () => {},

  PWAEvent: undefined,
  setPWAEvent: (e: any) => {},
  currentTime: new Date(Date.now()),
})

export function AppContextProvider({ children }: {children: React.JSX.Element | React.JSX.Element[]}) {
  const [isReadyToInstall, setIsReadyToInstall] = useState<boolean>(false);
  const [PWAEvent, setPWAEvent] = useState<any | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<Date>(new Date(Date.now()));

  function setReadyToInstall() {
    setIsReadyToInstall(true);
  }

  function setNotReadyToInstall() {
    setIsReadyToInstall(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date(Date.now()));
    }, 60 * 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const value = {
    isReadyToInstall: isReadyToInstall,
    setReadyToInstall: setReadyToInstall,
    setNotReadyToInstall: setNotReadyToInstall,
    PWAEvent: PWAEvent,
    setPWAEvent: setPWAEvent,
    currentTime: currentTime,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}