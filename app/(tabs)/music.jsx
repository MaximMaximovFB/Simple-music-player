import { Alert, FlatList, Text, View, PermissionsAndroid, ScrollView, Dimensions } from 'react-native'
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

import {AudioContext} from '../../context/AudioProvider';
import {playFunc, pauseFunc, resumeFunc} from '../player-logic/audioController'

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
    const {playbackObject, soundObject, currentAudio, updateState} = this.context;
    // {"androidImplementation": "SimpleExoPlayer", 
    //   "audioPan": 0, "didJustFinish": false, 
    //   "durationMillis": 213028, "isBuffering": true, 
    //   "isLoaded": true, "isLooping": false, "isMuted": false, 
    //   "isPlaying": true, "playableDurationMillis": 26122, 
    //   "positionMillis": 0, "progressUpdateIntervalMillis": 500, 
    //   "rate": 1, "shouldCorrectPitch": false, "shouldPlay": true, 
    //   "uri": "/storage/emulated/0/Download/Poor_Mans_Poison_-_Hells_Comin_with_Me_(musmore.com).mp3", 
    //   "volume": 1} 

    if (soundObject === null) {
      
      // console.log("Audio pressed");
      // console.log(audio);
      const playbackObject = new Audio.Sound();
      const status = await playFunc(playbackObject, audio.uri);
      // console.log(status);
      return updateState(this.context, {currentAudio: audio, playbackObject: playbackObject, soundObject: status});
      // return this.setState({...this.state, currentAudio: audio, playbackObject: playbackObject, soundObject: status}) 
    }

    if (soundObject.isLoaded && soundObject.isPlaying){
      // console.log("Audio is playing");
      const status = await pauseFunc(playbackObject);
      return updateState(this.context, {soundObject: status});
      // return this.setState({...this.state, soundObject: status});
    }
    // this.state.soundObject.didJustFinish this.state.currentAudio.id === audio.id
    if (soundObject.isLoaded && !soundObject.isPlaying && currentAudio.id === audio.id) {
      const status = await resumeFunc(playbackObject);
      return updateState(this.context, {soundObject: status});
      // return this.setState({...this.state, soundObject: status});
    } 
  }

  rowRenderer = (type, item) => {
    return (
      <MusicCard 
        title={item.filename} 
        duration = {item.duration} 
        onAudioPress={() => {this.handleAudioPress(item)}}
        menuPress = {() => {console.log("Option is opening")}}

      />
    )
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