import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import {useFonts} from "expo-font";

import AudioProvider from '../context/AudioProvider'   

import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "SourceCodePro-Black": require("../assets/fonts/SourceCodePro-Black.ttf"),
    "SourceCodePro-Bold": require("../assets/fonts/SourceCodePro-Bold.ttf"),
    "SourceCodePro-ExtraBold": require("../assets/fonts/SourceCodePro-ExtraBold.ttf"),
    "SourceCodePro-ExtraLight": require("../assets/fonts/SourceCodePro-ExtraLight.ttf"),
    "SourceCodePro-Light": require("../assets/fonts/SourceCodePro-Light.ttf"),
    "SourceCodePro-Medium": require("../assets/fonts/SourceCodePro-Medium.ttf"),
    "SourceCodePro-Regular": require("../assets/fonts/SourceCodePro-Regular.ttf"),
    "SourceCodePro-SemiBold": require("../assets/fonts/SourceCodePro-SemiBold.ttf"),
  });


  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;


  return (
    <AudioProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="(tabs)"
          options={{ headerShown: false}}
        />
      </Stack>
    </AudioProvider>
    
  )
}

export default RootLayout
