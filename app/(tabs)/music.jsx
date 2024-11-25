import { Alert, FlatList, Text, View, PermissionsAndroid, ScrollView, Dimensions, RefreshControl } from 'react-native'
import React, { useCallback, useState, Component } from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { Audio } from 'expo-av';

import CustomButton from '../../components/CustomButton'
import CustomIconButton from '../../components/CustomIconButton'
import SearchInput from '../../components/SearchInput'
import MusicCard from '../../components/MusicCard'
import Menu from '../../components/Menu';
import MicroPlayer from '../../components/MicroPlayer';

import {AudioContext} from '../../context/AudioProvider';
import {playFunc, pauseFunc, resumeFunc, playNextFunc} from '../player-logic/audioController'

export class Music extends Component {

  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      // optionModalVisible: false,
    }
  }

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

  handleAudioPress = async (audio) => {
    const {playbackObject, soundObject, currentAudio, updateState, audioFiles} = this.context;

    //first time play
    if (soundObject === null) {
      
      const playbackObject = new Audio.Sound();
      const status = await playFunc(playbackObject, audio.uri);
      const index = audioFiles.indexOf(audio);
      return updateState(this.context, {
        currentAudio: audio, 
        playbackObject: playbackObject, 
        soundObject: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }

    //pause
    if (soundObject.isLoaded && soundObject.isPlaying && currentAudio.id === audio.id){
      const status = await pauseFunc(playbackObject);
      return updateState(this.context, {
        soundObject: status, 
        isPlaying: false,
      });
    }

    //resume
    if (soundObject.isLoaded && !soundObject.isPlaying && currentAudio.id === audio.id) {
      const status = await resumeFunc(playbackObject);
      return updateState(this.context, {soundObject: status, isPlaying: true,});
    } 

    //play next one
    if (soundObject.isLoaded && currentAudio.id !== audio.id) {
      const index = audioFiles.indexOf(audio);
      const status = await playNextFunc(playbackObject, audio.uri);
      return updateState(this.context, {
        currentAudio: audio, 
        soundObject: status, 
        isPlaying: true,
        currentAudioIndex: index,
      });
    }
  }

  rowRenderer = (type, item, index, extendedState) => {
    // console.log(extendedState);
    return (
      <MusicCard 
        title={item.filename} 
        duration = {item.duration} 
        onAudioPress={() => {this.handleAudioPress(item)}}
        menuPress = {() => {console.log("Option is opening")}}
        isPlaying={extendedState.isPlaying}
        activeMusicCard={this.context.currentAudioIndex === index}
      />
    )
  };



  render() {
    return (
          <AudioContext.Consumer>
            {({dataProvider, isPlaying}) => {
              return (
                <SafeAreaView className = "flex-1 bg-primary">
                    <View className = "w-[96%] self-center flex-1 flex-col justify-normal">
                      <View className="flex-col ">
                        <View className="mt-2">
                          <SearchInput/>
                        </View>
                        <View className="flex-row justify-around h-[6vh]">
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
                            handlePress = {() => {
                              const { updateState, refreshAudioFiles } = this.context;
                              // updateState(this.context, { audioFiles: [], dataProvider: new DataProvider((f, s) => f !== s) });
                              
                              refreshAudioFiles();
                              updateState();
                            }}
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
                          extendedState={{isPlaying}}
                          // renderFooter = {() => {
                          //   return (
                          //     //"Loading"-elemnt
                          //   );
                          // }
                          // }
                        />
                        
                      </View>
                    </View>
                    <View className="self-center w-[98%] border-t-2 border-solid border-secondary">
                      <MicroPlayer
                        title={this.context.currentAudio.filename || "Find your track"} 
                        duration = {this.context.currentAudio.duration || "00"}
                        onAudioPress={() => router.push('../(seps)/player')}
                        menuPress = {() => {}}
                        isPlaying={this.context.isPlaying}
                        activeMusicCard={() => {}}
                        prevBtn={() => {}}
                        nextBtn={() => {}}
                        pauseBtn={() => this.handleAudioPress(this.context.currentAudio)}
                        // this.handleAudioPress(item)
                      />
         
                    </View>
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