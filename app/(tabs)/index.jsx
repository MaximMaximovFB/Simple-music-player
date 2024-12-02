import { View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { Audio } from 'expo-av';

import CustomIconButton from '../../components/CustomIconButton'
import SearchInput from '../../components/SearchInput'
import MusicCard from '../../components/MusicCard'
import MicroPlayer from '../../components/MicroPlayer';

import {AudioContext} from '../../context/AudioProvider';
import {playFunc, pauseFunc, resumeFunc, playNextFunc} from '../player-logic/audioController'
import {storeAudioForNextOpening} from '../user-config/helper';

export class Music extends Component {

  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      firstLaunch: true,  // Флаг для определения первого запуска
    }
  }


  // Размер каждого элемента списка RecyclerListView
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

  // Обновление состояния воспроизведения аудио
  onPlaybackStatusUpdate = async playbackStatus => {

    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      this.context.updateState(this.context, {
        playbackPosition: playbackStatus.positionMillis,
        playbackDuration: playbackStatus.durationMillis,                                  
      });
    }

     // если текущий завершён, переход к следующему треку, 
    if (playbackStatus.didJustFinish) {
      
      console.log("Audio file did just finish"); 
      
      const nextAudioIndex = this.context.currentAudioIndex + 1;

      console.log(`nextAudioIndex: ${nextAudioIndex}`);

      // Если очередь воспроизведения закончилась, вернуться к первому треку
      if ( nextAudioIndex >= this.context.totalAudioCount) {r

        console.log("Reached the end of the audio file queue");

        this.context.playbackObject.unloadAsync();
        this.context.updateState(this.context, {
          currentAudio: this.context.audioFiles[0], 
          soundObject: null, 
          isPlaying: false,
          currentAudioIndex: 0,
          playbackPosition: null,
          playbackDuration: null
        });  
        return await storeAudioForNextOpening(this.context.audioFiles[0], 0);
      }

      const audio = this.context.audioFiles[nextAudioIndex];
      const status = await playNextFunc(this.context.playbackObject, audio.uri);
      
      this.context.updateState(this.context, { 
        currentAudio: audio, 
        soundObject: status, 
        isPlaying: true,
        currentAudioIndex: nextAudioIndex,
      });

      await storeAudioForNextOpening(audio, nextAudioIndex);

    }
  }

  // Управление воспроизведением: воспроизведение, пауза, продолжение, переключение
  handleAudioPress = async (audio) => {
    const {playbackObject, soundObject, currentAudio, updateState, audioFiles} = this.context;

    // Если трек воспроизводится впервые
    if (soundObject === null) {
      
      const playbackObject = new Audio.Sound();
      const status = await playFunc(playbackObject, audio.uri);
      const index = audioFiles.indexOf(audio);
      updateState(this.context, {
        currentAudio: audio, 
        playbackObject: playbackObject, 
        soundObject: status,
        isPlaying: true,
        currentAudioIndex: index,
        firstLaunch: false
      });
      playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      return storeAudioForNextOpening(audio, index);
    }

    // Пауза
    if (soundObject.isLoaded && soundObject.isPlaying && currentAudio.id === audio.id){
      const status = await pauseFunc(playbackObject);
      return updateState(this.context, {
        soundObject: status, 
        isPlaying: false,
      });
    }

    // Продолжение воспроизведения
    if (soundObject.isLoaded && !soundObject.isPlaying && currentAudio.id === audio.id) {
      const status = await resumeFunc(playbackObject);
      return updateState(this.context, {soundObject: status, isPlaying: true,});
    } 

    // Воспроизведение нового трека
    if (soundObject.isLoaded && currentAudio.id !== audio.id) {
      const index = audioFiles.indexOf(audio);
      const status = await playNextFunc(playbackObject, audio.uri);
      updateState(this.context, {
        currentAudio: audio, 
        soundObject: status, 
        isPlaying: true,
        currentAudioIndex: index,
      });
      return storeAudioForNextOpening(audio, index);
    }
  };

  // Переход к следующему треку в очереди
  handleNext = async () => {
    const { playbackObject, currentAudioIndex, audioFiles, updateState, totalAudioCount } = this.context;

    try {

        let playback = playbackObject;
        if (!playback) {
            playback = new Audio.Sound();
            updateState(this.context, { playbackObject: playback });
        }

        const isLastAudio = currentAudioIndex + 1 === totalAudioCount;
        const nextAudioIndex = isLastAudio ? 0 : currentAudioIndex + 1;
        const nextAudio = audioFiles[nextAudioIndex];

        const { isLoaded } = await playback.getStatusAsync();

        const status = isLoaded ? await playNextFunc(playback, nextAudio.uri) : await playFunc(playback, nextAudio.uri);

        updateState(this.context, {
            currentAudio: nextAudio,
            soundObject: status,
            isPlaying: true,
            currentAudioIndex: nextAudioIndex,
        });

        await storeAudioForNextOpening(nextAudio, nextAudioIndex);
    } catch (error) {
        console.error("Error in handleNext:", error);
    }
  };

  // Переход к предыдущему треку в очереди
  handlePrevious = async () => {
    const { playbackObject, currentAudioIndex, audioFiles, updateState, totalAudioCount } = this.context;

    try {

        let playback = playbackObject;
        if (!playback) {
            playback = new Audio.Sound();
            updateState(this.context, { playbackObject: playback });
        }

        const isFirstAudio = currentAudioIndex <= 0;
        const nextAudioIndex = isFirstAudio ? totalAudioCount-1 : currentAudioIndex - 1;
        const nextAudio = audioFiles[nextAudioIndex];

        const { isLoaded } = await playback.getStatusAsync();

        const status = isLoaded ? await playNextFunc(playback, nextAudio.uri) : await playFunc(playback, nextAudio.uri);

        updateState(this.context, {
            currentAudio: nextAudio,
            soundObject: status,
            isPlaying: true,
            currentAudioIndex: nextAudioIndex,
        });

        await storeAudioForNextOpening(nextAudio, nextAudioIndex);
    } catch (error) {
        console.error("Error in handleNext:", error);
    }
  };

  // Загрузка последнего воспроизведённого трека
  componentDidMount() {
    this.context.loadPreviousAudio();
  }

  // Отображение элементов RecyclerListView 
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
              if (!dataProvider._data.length) return null;
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
                          {/* <CustomIconButton
                            handlePress = {() => {}}
                            containerStyles = "my-3 px-3"
                            iconName = "add-box"
                            iconSize = {24}
                            iconColor = "white"
                            libName = {"MaterialIcons"}
                          /> */}
                          <CustomIconButton
                            handlePress = {() => {
                              const { updateState, refreshAudioFiles } = this.context;
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
                        />
                        
                      </View>
                    </View>
                    <View className="self-center w-full border-t-2 border-solid border-secondary">
                      <View className = "w-[96%] self-center">
                        <MicroPlayer
                          isFirstLaunch = {() => {this.context.firstLaunch}}
                          title={this.context.currentAudio.filename || "Hey, wanna listen "} 
                          duration = {this.context.currentAudio.duration || "to some tunes?_"}
                          onAudioPress={() => router.push('../(seps)/player')}
                          menuPress = {() => {}}
                          isPlaying={this.context.isPlaying}
                          activeMusicCard={() => {}}
                          prevBtn={this.handlePrevious}
                          nextBtn={this.handleNext}
                          pauseBtn={() => this.handleAudioPress(this.context.currentAudio)}
                        />
                      </View>
                    </View>
                </SafeAreaView>
                )
            }}

          </AudioContext.Consumer>
    );
  }
}

export default Music
