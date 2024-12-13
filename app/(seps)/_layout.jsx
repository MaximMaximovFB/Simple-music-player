import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SepsLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
          name="player"
          options={{ headerShown: false}}
        />      
    </Stack>
  )
}

export default SepsLayout