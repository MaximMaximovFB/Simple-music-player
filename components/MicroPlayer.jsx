import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import CustomIconButton from './CustomIconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


// const convertTime = minutes => {
//   return minutes;
// }PlayPause


const renderPlayPauseIcon = (isPlaying, pauseBtn) => {
  if (isPlaying) {
    return (
    //   <MaterialCommunityIcons name="pause" size={27} color="white" />
        <CustomIconButton
            handlePress= {pauseBtn}
            iconName={"pause"}
            iconSize={27}
            iconColor={"white"}
            libName = {"MaterialCommunityIcons"}
        />
    )
  } else {
    return (
    //   <MaterialCommunityIcons name="play" size={27} color="white" />
      <CustomIconButton
            handlePress= {pauseBtn}
            iconName={"play"}
            iconSize={27}
            iconColor={"white"}
            libName = {"MaterialCommunityIcons"}
        />
    )
  }
} 

// const getMusicThumb = () => {
//   return <MaterialCommunityIcons name="music" size={24} color="white" />
// }


const MicroPlayer = ({ title, duration, menuPress, menuIsVisible, onAudioPress, isPlaying, pauseBtn, nextBtn, prevBtn }) => {
  return (
    <>
      <View className = "flex-row my-2 justify-between h-[6vh]">
        <View className = "w-[60vw]">
            <TouchableWithoutFeedback className="flex-1 " onPress={onAudioPress}>
            <View className = "flex-row flex-1 ">
                <View className= "self-center p-2 mx-1 rounded-md border-secondary border-solid border-2">
                    <View >
                        <MaterialCommunityIcons name="music" size={24} color="white" />
                    </View>
                </View>
                <View className = "flex-1 flex-coL">
                    <Text numberOfLines={1} className = "text-secondary font-scBold">{title}</Text>
                    <Text className = "text-quaternary font-scRegular">{duration}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </View>
        <View className = "flex-row justify-between items-center mx-3 w-[30vw]">
            <CustomIconButton
                handlePress= {prevBtn}
                iconName={"skip-previous"}
                iconSize={27}
                iconColor={"white"}
                libName = {"MaterialCommunityIcons"}
            />
            {renderPlayPauseIcon(isPlaying, pauseBtn)}
            <CustomIconButton
                handlePress= {nextBtn}
                iconName={"skip-next"}
                iconSize={27}
                iconColor={"white"}
                libName = {"MaterialCommunityIcons"}
            />
        </View>
      </View>
    </>
  )
}

export default MicroPlayer