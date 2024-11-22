import { View, Text } from 'react-native'
import React from 'react'
import CustomIconButton from './CustomIconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// const convertTime = minutes => {
//   return minutes;
// }

const MusicCard = ({ title, thumbnail, soundtrack, creator, key, duration, menuPress }) => {
  return (
    <>
      <View className = "flex-row self-center items-center border-tertiary border-solid border-b-2 py-1">
        <View className = "flex-row w-[85%]">
          <View className= "self-center p-2 mr-1 rounded-md border-secondary border-solid border-2">
            <View >
              <MaterialCommunityIcons name="music" size={24} color="white" />
            </View>
          </View>
          <View className = "flex-col flex-1">
            <Text numberOfLines={1} className = "text-secondary font-scBold">{title}</Text>
            <Text className = "text-quaternary font-scRegular">{duration}</Text>
          </View>
        </View>
        <View className = "flex-1">
          <CustomIconButton
            handlePress= {menuPress}
            iconName={"dots-vertical"}
            iconSize={24}
            iconColor={"white"}
            libName = {"MaterialCommunityIcons"}
          />
        </View>
      </View>
    </>
  )
}

export default MusicCard