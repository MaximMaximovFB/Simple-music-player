import { Alert, FlatList, Text, View, PermissionsAndroid, ScrollView, Dimensions } from 'react-native'
import React, { useCallback, useState, Component } from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LayoutProvider, RecyclerListView } from 'recyclerlistview';

import CustomButton from '../../components/CustomButton'
import CustomIconButton from '../../components/CustomIconButton'
import SearchInput from '../../components/SearchInput'
import MusicCard from '../../components/MusicCard'
import Menu from '../../components/Menu';

import {AudioContext} from '../../context/AudioProvider';

export class Music extends Component {

  static contextType = AudioContext;

  layoutProvider = new LayoutProvider((i) => 'audio', (type, dimension) => {
    switch (type){
      case 'audio':
        dimension.width = Dimensions.get('window').width;
        dimension.height = 70;
        break;
      default:
        dimension.width = 0;
        dimension.height = 0;
    }
  });

  rowRenderer = (type, item) => {
    return <MusicCard title={item.filename} duration = {item.duration} menuPress = {() => {console.log("Option is opening")}}/>
  };

  render() {
    return (
          <AudioContext.Consumer>
            {({dataProvider}) => {
              return (
                <SafeAreaView className = "flex-1 bg-primary">
                    <View className = "w-[96%] self-center flex-1 flex-col justify-normal">
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
                            libName = {"MaterialIcons"}
                          />
                          <CustomIconButton
                            handlePress = {() => {}}
                            containerStyles = "my-3 px-3"
                            iconName = "add-box"
                            iconSize = {24}
                            iconColor = "white"
                            libName = {"MaterialIcons"}
                          />
                          <CustomIconButton
                            handlePress = {() => {}}
                            containerStyles = "my-3 px-3"
                            iconName = "refresh"
                            iconSize = {24}
                            iconColor = "white"
                            libName = {"MaterialIcons"}
                          />                       
                        </View>
                      </View>
                      <View className= "flex-1 mt-2 border-t-2 border-solid border-secondary">
                        <RecyclerListView
                          dataProvider={dataProvider} 
                          layoutProvider={this.layoutProvider} 
                          rowRenderer={this.rowRenderer}
                        />
                        
                      </View>
                    </View>
                    <Menu
                          visible={true}
                    />
                </SafeAreaView>
                )
            }}
          </AudioContext.Consumer>
    );
  }
}

export default Music

{/* <SafeAreaView className="h-full bg-primary">
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
          <AudioContext.Consumer>
            {(dataProvider) => {
              return <RecyclerListView className="flex-1" dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer}/>
            }}
          </AudioContext.Consumer>
        </View>
      </View>
    </SafeAreaView> */}

//           <ScrollView className="border-t-2 border-white focus:border-secondary"> 
//           {this.context.audioFiles?.length > 0 ? (
//           this.context.audioFiles.map(item => (
//             <Text key={item.id} className="text-white font-scLight">{item.filename}</Text>
//           ))
//           ) : (
//             <Text className="text-white font-scLight">No audio files found</Text>
//           )}
// </ScrollView>