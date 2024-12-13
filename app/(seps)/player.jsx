import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomIconButton from '../../components/CustomIconButton';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';

// const renderPlayPauseIcon = (isPlaying, pauseBtn) => {
//   if (isPlaying) {
//     return (
//     //   <MaterialCommunityIcons name="pause" size={27} color="white" />
//         <CustomIconButton
//             handlePress= {pauseBtn}
//             iconName={"pause"}
//             iconSize={27}
//             iconColor={"white"}
//             libName = {"MaterialCommunityIcons"}
//         />
//     )
//   } else {
//     return (
//     //   <MaterialCommunityIcons name="play" size={27} color="white" />
//       <CustomIconButton
//             handlePress= {pauseBtn}
//             iconName={"play"}
//             iconSize={27}
//             iconColor={"white"}
//             libName = {"MaterialCommunityIcons"}
//         />
//     )
//   }
// } loop

const Player = () => {
  return (
    <SafeAreaView className = "bg-primary flex-1 items-center">
      <View className = " w-[98%] h-[98%] flex-1">
        <View className = "h-[7%] border-secondary border-solid border-b-2">
          <TouchableHighlight className = "h-full w-full items-center justify-center" onPress={() => router.back()}>
            <MaterialIcons name="keyboard-arrow-down" size={40} color="white" />
          </TouchableHighlight>
        </View>
        <View className = "h-[50%] justify-center ">
          <View className = "self-center p-2 mr-1 rounded-md border-secondary border-solid border-2">
            <MaterialCommunityIcons name="music" size={100} color="white" />
          </View>
        </View>
        <View className = "h-[33%] items-center">
          <View className = "self-start ml-5 pb-10">
            <Text className = "text-secondary font-scSB text-2xl">
              AudioTitle
            </Text>
          </View>
          <View className = "flex-row">
            <View>
              <View className = "flex-1 items-center justify-center">
                <CustomIconButton
                  handlePress= {() => {}}
                  iconName={"repeat"}
                  iconSize={30}
                  iconColor={"white"}
                  libName = {"MaterialIcons"}
                />
              </View>
            </View>
            <View className = "flex-row justify-between mx-3">
                <CustomIconButton
                    handlePress= {() => {}}
                    iconName={"skip-previous"}
                    iconSize={70}
                    iconColor={"white"}
                    libName = {"MaterialCommunityIcons"}
                />
                {/* {renderPlayPauseIcon(isPlaying, pauseBtn)} */}
                <CustomIconButton
                    handlePress= {() => {}}
                    iconName={"pause"}
                    iconSize={70}
                    iconColor={"white"}
                    libName = {"MaterialCommunityIcons"}
                />
                <CustomIconButton
                    handlePress= {() => {}}
                    iconName={"skip-next"}
                    iconSize={70}
                    iconColor={"white"}
                    libName = {"MaterialCommunityIcons"}
                />
            </View>
            <View>
              <View className = "flex-1 items-center justify-center">
                <CustomIconButton
                  handlePress= {() => {}}
                  iconName={"dots-vertical"}
                  iconSize={30}
                  iconColor={"white"}
                  libName = {"MaterialCommunityIcons"}
                />
              </View>
            </View>
          </View>
          <View className = "w-[94%]">
            <View className = "flex-row justify-between">
              <Text className = "text-secondary font-scSB">
                00:00
              </Text>
              <Text className = "text-secondary font-scSB">
                00:00
              </Text>
            </View>
            <Slider
                style={{width:320, height: 40}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor = "#FFFFFF"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Player