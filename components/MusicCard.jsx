import { View, Text } from 'react-native'
import React from 'react'

const MusicCard = ({ music : { title, thumbnail, soundtrack, creator} }) => {
  return (
    <View>
      <Text className="text-white">{title}</Text>
    </View>
  )
}

export default MusicCard