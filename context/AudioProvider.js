import { Alert, Text, View } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export const AudioContext = createContext();

const AUDIO_FILE = `${FileSystem.documentDirectory}audioFiles.json`;

export class AudioProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [], // Массив аудиофайлов
            permissionError: false, // Флаг для ошибки разрешений
            dataProvider: new DataProvider((firstRule, secondRule) => firstRule !== secondRule), // Провайдер данных для RecyclerListView
            playbackObject: null, // Объект воспроизведения
            soundObject: null, // Текущий аудиофайл
            currentAudio: {}, // Данные текущего воспроизводимого трека
            isPlaying: false, // Флаг воспроизведения
            currentAudioIndex: null, // Индекс текущего трека
            playbackPosition: null, // Текущая позиция воспроизведения
            playbackDuration: null, // Длительность трека
        };
        this.totalAudioCount = 0; // Количество всех загруженых треков
    }

    // Загрузка аудиофайлов из JSON-файла
    loadFromJSON = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(AUDIO_FILE);
            if (fileExists.exists) {
                const json = await FileSystem.readAsStringAsync(AUDIO_FILE);
                const audioFiles = JSON.parse(json);
                console.log("Loaded audio files from JSON");
                this.totalAudioCount = audioFiles.length;
                this.setState({
                    audioFiles,
                    totalAudioCount: audioFiles.length,
                    dataProvider: this.state.dataProvider.cloneWithRows(audioFiles),
                });
                console.log(`${this.totalAudioCount} audio files has been loaded from JSON file.`);
            } else {
                console.log("JSON file not found, scanning memory...");
                await this.getAudioFiles();
            }
        } catch (error) {
            console.error("Error loading audio files:", error);
        }
    };

    
    // Сохранение аудиофайлов в JSON-файл
    saveToJSON = async (audioFiles) => {
        try {
            await FileSystem.writeAsStringAsync(AUDIO_FILE, JSON.stringify(audioFiles));
            console.log("Saved audio files to JSON");
        } catch (error) {
            console.error("Error saving audio files:", error);
        }
    };

    // Уведомление о необходимости разрешений
    permissionAlert = () => {
        Alert.alert(
            "Permission required", 
            "This app needs to read audio files!", 
            [
                {text: 'I am ready', onPress: () => this.getPermission()},
                {text: 'cancel', onPress: () => this.permissionAlert()}
            ]
        )
    }

    // Сканирование памяти устройства для поиска аудиофайлов
    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio', 
            first: media.totalCount,
        });

        this.totalAudioCount = media.totalCount
        // console.log(media.assets.length);
        //  console.log(media);
       
        console.log("Memory has been scanned");
        console.log(`${media.totalCount} audio files were found.`);
        this.saveToJSON(media.assets);
        this.setState({
            ...this.state, 
                dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), 
                audioFiles:[...audioFiles, ...media.assets]
            })
    }

    // Получение разрешений на чтение от пользователя
    getPermission = async () => {
        // {
        //     "accessPrivileges": "none", 
        //     "canAskAgain": true, "expires": 
        //     "never", "granted": false, 
        //     "status": "undetermined"
        // }
        const permission = await MediaLibrary.getPermissionsAsync();
        // console.log(permission);
        if (permission.granted) {
            await this.loadFromJSON(); // Load data from JSON or scan memory
        }

        if (!permission.canAskAgain && !permission.granted) {
            this.setState({...this.state, permissionError: true});
        }

        if (!permission.granted && permission.canAskAgain) {
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if (status==='denied' && canAskAgain) {
                this.permissionAlert();
            }
            if (status==='granted') {
                await this.loadFromJSON();
            }

            if (status==='denied' && !canAskAgain) {
                this.setState({...this.state, permissionError: true})
            }
        }
    };

    // Загрузка трека, который проигрывался перед последним завершение рбаоты приложения.
    loadPreviousAudio = async () => {
        let previousAudio = await AsyncStorage.getItem('previousAudio');
        let currentAudio;
        let currentAudioIndex;

        if (previousAudio === null) {
            currentAudio = this.state.audioFiles[0];
            currentAudioIndex = 0;
        } else {
            previousAudio = JSON.parse(previousAudio);
            currentAudio = previousAudio.audio;
            currentAudioIndex = previousAudio.index;
        }

        this.setState({...this.state, currentAudio, currentAudioIndex});
    }


    componentDidMount(){
        this.getPermission();
    }
    
    // Обновление состояния аудиоплеера
    updateState = (previousState, newState = {}) => {
        this.setState({...previousState, ...newState});
    }

    render() {
        const {
            audioFiles, 
            dataProvider, 
            permissionError, 
            playbackObject, 
            soundObject, 
            currentAudio, 
            isPlaying,
            currentAudioIndex,
            playbackPosition,
            playbackDuration,
        } = this.state;

        // Если разрешения на чтение не предоставлены
        if (permissionError) {
            return (
                <View className="flex-1 justify-center items-center">
                    <Text className = "text-white font-scBold">
                        Apparently you have not given permission to read audio files. You can always change this in your device settings.
                    </Text>
                </View>
            );
        } 

        // контекст для других компонентов
        return (
        <AudioContext.Provider value={{ 
            audioFiles, 
            dataProvider, 
            playbackObject, 
            soundObject, 
            currentAudio, 
            isPlaying, 
            currentAudioIndex, 
            playbackPosition,
            playbackDuration,
            totalAudioCount: this.totalAudioCount,
            updateState: this.updateState, 
            refreshAudioFiles: this.getAudioFiles, // Expose refresh method
            loadPreviousAudio: this.loadPreviousAudio,
            }}>
            {this.props.children}
        </AudioContext.Provider>
        );
    }
}

export default AudioProvider