import { View, Text } from 'react-native'
import React from 'react'

const MusicCard = ({ music : { title, thumbnail, soundtrack, creator, key} }) => {
  return (
    <View>
      <Text key={item.id} className="text-white">{title}</Text>
    </View>
  )
}

export default MusicCard