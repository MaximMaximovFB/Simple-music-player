import { Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack, Tabs, Redirect} from 'expo-router'
import {useFonts} from "expo-font";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AudioProvider from '../../context/AudioProvider'  

const TabIcon = ({ icon, color, name, focused, size }) => {
    return (
      <View className= "items-center justify-center">
        <MaterialIcons
          className = "justify-center" 
          name={icon} 
          size = {size} 
          color="white" />
        <Text className = {`text-white ${focused ? 'font-scExtraBold' : 'font-scRegular'}`}>
          {name}
        </Text>
      </View>
    )
  }

const TabsLayout = () => {
  return (
    <AudioProvider>
      <>
        <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
                backgroundColor: 'black',
                borderTopWidth: 2,
                borderTopColor: 'white',
                height: 60,
            },

        }}
        >
        <Tabs.Screen
            name = "music"
            options={{
            title: "Music",
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
                <TabIcon
                icon = {"library-music"}
                color = {color}
                name = "Music"
                focused={focused}
                size={24}
                />
            )
            }}
        />
        <Tabs.Screen
            name = "all_playlists"
            options={{
            title: "AllPlaylists",
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
                <TabIcon
                icon = {"playlist-add-check-circle"}
                color = {color}
                name = "playlists"
                focused={focused}
                size={26}
                />
            )
            }}
        />
        <Tabs.Screen
            name = "settings"
            options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
                <TabIcon
                icon = {"settings-applications"}
                color = {color}
                name = "settings"
                focused={focused}
                size={26}
                />
            )
            }}
        />
        </Tabs>
      </>
    </AudioProvider>
    
  )
}

export default TabsLayout