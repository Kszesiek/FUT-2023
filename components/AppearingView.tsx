import React, {useContext, useEffect} from 'react';
import {Animated, Easing, View, StyleSheet} from 'react-native';
import {AppContext} from "../state/AppContext";

export function AppearingView({children,}: { children: React.JSX.Element | React.JSX.Element[] }) {
  const opacity = new Animated.Value(0);
  const height = new Animated.Value(0);

  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isReadyToInstall) {
      showContent();
    } else {
      hideContent();
    }
  }, [appContext.isReadyToInstall]);

  const showContent = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false  // <-- necessary
      }),
      Animated.timing(opacity, {
        delay: 100,
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false  // <-- necessary
      }),
    ]).start();
  }

  const hideContent = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false  // <-- necessary
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false  // <-- necessary
      }),
    ]).start();
  }

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500]  // <-- value that larger than your content's height
  });

  return (
    <Animated.View style={{opacity: opacity, maxHeight: maxHeight}}>
      {children}
    </Animated.View>
  );
}