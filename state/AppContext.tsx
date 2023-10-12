import React, {createContext, useState} from "react";

type stateType = {
  isReadyToInstall: boolean,
  setReadyToInstall: () => void,
  setNotReadyToInstall: () => void,
  PWAEvent: any | undefined,
  setPWAEvent: (e: any) => void,
}

export const AppContext = createContext<stateType>({
  isReadyToInstall: false,
  setReadyToInstall: () => {},
  setNotReadyToInstall: () => {},

  PWAEvent: undefined,
  setPWAEvent: (e: any) => {},
})

export function AppContextProvider({ children }: {children: React.JSX.Element | React.JSX.Element[]}) {
  const [isReadyToInstall, setIsReadyToInstall] = useState<boolean>(false);
  const [PWAEvent, setPWAEvent] = useState<any | undefined>(undefined);

  function setReadyToInstall() {
    setIsReadyToInstall(true);
  }

  function setNotReadyToInstall() {
    setIsReadyToInstall(false);
  }

  const value = {
    isReadyToInstall: isReadyToInstall,
    setReadyToInstall: setReadyToInstall,
    setNotReadyToInstall: setNotReadyToInstall,
    PWAEvent: PWAEvent,
    setPWAEvent: setPWAEvent,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}