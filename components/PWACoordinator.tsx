import React, {useContext} from "react";
import {AppContext} from "../state/AppContext";

export default function PWACoordinator({children} : {children: React.JSX.Element | React.JSX.Element[]}) {
  const appContext = useContext(AppContext);

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    // e.preventDefault();
    // Stash the event so it can be triggered later.
    appContext.setPWAEvent(e);
    // Update UI notify the user they can install the PWA
    appContext.setReadyToInstall();
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  });

  return children;
}