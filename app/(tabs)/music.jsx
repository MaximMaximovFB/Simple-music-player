import { Alert, FlatList, Text, View, PermissionsAndroid } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import CustomButton from '../../components/CustomButton'
import CustomIconButton from '../../components/CustomIconButton'
import SearchInput from '../../components/SearchInput'
import MusicCard from '../../components/MusicCard'

const Music = () => {
  return (
    <SafeAreaView className=" h-full bg-primary">
      <View className="w-[90%] self-center">
      <FlatList
        data= {[{ id: 1},{ id: 2},{ id: 3}, ]}
        keyExtractor={(item) => item.$id}
        renderItem={( { item }) => (
          // <MusicCard 
          //   music = {item}

          // />
          <Text className="text-white">SAMPLE TEXT</Text>
        )}
        ListHeaderComponent={( ) => (
            // border-red-600 border-solid border-2
          <View className="flex-1 flex-col w-full justify-center items-stretch">
                <View className="items-center  self-center mt-2">
                    <SearchInput
 
                    />
                </View>
                <View className="flex-1 flex-row justify-between mb-2">
                    <CustomIconButton
                    handlePress = {() => {}}
                    containerStyles = "my-3 px-3"
                    iconName = "play-circle-fill"
                    iconSize = {24}
                    iconColor = "white"
                    />
                    <CustomIconButton
                    handlePress = {() => openPicker('audio')}
                    containerStyles = "my-3 px-3"
                    iconName = "add-box"
                    iconSize = {24}
                    iconColor = "white"
                    />
                    <CustomIconButton
                    handlePress = {() => {}}
                    containerStyles = "my-3 px-3"
                    iconName = "refresh"
                    iconSize = {24}
                    iconColor = "white"
                    />
                </View>
          </View>
        )}
      />
      </View>
      {/* <StatusBar
        backgroundColor='#000000'
        style='dark'
      /> */}
    </SafeAreaView>
  )
}

export default Music