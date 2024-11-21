import { Alert, FlatList, Text, View, PermissionsAndroid, ScrollView } from 'react-native'
import React, { useCallback, useState, Component } from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import CustomButton from '../../components/CustomButton'
import CustomIconButton from '../../components/CustomIconButton'
import SearchInput from '../../components/SearchInput'
import MusicCard from '../../components/MusicCard'

import {AudioContext} from '../../context/AudioProvider';

export class Music extends Component {

  static contextType = AudioContext;

  render() {
    return (
      // border-red-600 border-solid border-2
      <SafeAreaView className="h-full bg-primary">
        <View className="w-[96%] self-center flex-1 flex-col justify-normal ">
          <View className="flex-col ">
            <View className="mt-2">
              <SearchInput/>
            </View>
            <View className="flex-1 flex-row justify-around mb-12">
              <CustomIconButton
                handlePress = {() => {}}
                containerStyles = "my-3 px-3"
                iconName = "play-circle-fill"
                iconSize = {24}
                iconColor = "white"
              />
              <CustomIconButton
                handlePress = {() => {}}
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
        <View>
          <ScrollView className="border-t-2 border-white focus:border-secondary"> 
                        {this.context.audioFiles?.length > 0 ? (
                        this.context.audioFiles.map(item => (
                          <Text key={item.id} className="text-white font-scLight">{item.filename}</Text>
                        ))
                        ) : (
                          <Text className="text-white font-scLight">No audio files found</Text>
                        )}
          </ScrollView>
        </View>
      </View>
      {/* <StatusBar
        backgroundColor='#000000'
        style='dark'
      /> */}
    </SafeAreaView>
    )
  }
}

export default Music


          {/* <FlatList
            // data = {this.context.audioFiles.map(
            //   item => 
            //     <Text key={item.id} className="text-white">
            //       {item.filename}
            //     </Text>
            //   )
            // }
            data= {[{ id: 1},{ id: 2},{ id: 3}, ]}
            keyExtractor={(item) => item.$id}
            renderItem={( { item }) => (
              // <MusicCard 
              //   music = {item}

              // />
              <Text className="text-white">{item}</Text>
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
                        handlePress = {() => {}}
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
          /> */}