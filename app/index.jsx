import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const Welcome = () => {

  return (
    <View className = "flex-1 justify-center items-center bg-white">
      <Text className = "text-3xl font-scExtraBold">Main screen title!!!</Text>
      <Link href="/profile" className="color-red-800"> Go to Profile</Link>
    </View>
  )
}

export default Welcome
