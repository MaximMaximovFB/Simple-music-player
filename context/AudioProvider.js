import { Alert, Text, View } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import * as FileSystem from 'expo-file-system';
 

export const AudioContext = createContext();


const AUDIO_FILE = `${FileSystem.documentDirectory}audioFiles.json`;





export class AudioProvider extends Component {

    loadFromJSON = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(AUDIO_FILE);
            if (fileExists.exists) {
                const json = await FileSystem.readAsStringAsync(AUDIO_FILE);
                const audioFiles = JSON.parse(json);
                console.log("Loaded audio files from JSON");
                this.setState({
                    audioFiles,
                    dataProvider: this.state.dataProvider.cloneWithRows(audioFiles),
                });
            } else {
                console.log("JSON file not found, scanning memory...");
                await this.getAudioFiles();
            }
        } catch (error) {
            console.error("Error loading audio files:", error);
        }
    };

    saveToJSON = async (audioFiles) => {
        try {
            await FileSystem.writeAsStringAsync(AUDIO_FILE, JSON.stringify(audioFiles));
            console.log("Saved audio files to JSON");
        } catch (error) {
            console.error("Error saving audio files:", error);
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((firstRule,secondRule) => firstRule !== secondRule),
            playbackObject: null,
            soundObject: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
        };
    }

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

    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio', 
            first: media.totalCount,
        });
        // console.log(media.assets.length);
        //  console.log(media);
        console.log("Memory has been scanned");
        this.saveToJSON(media.assets);
        this.setState({
            ...this.state, 
                dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), 
                audioFiles:[...audioFiles, ...media.assets]
            })
    }

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
            // this.getAudioFiles();
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
                // this.getAudioFiles();
                await this.loadFromJSON();
            }

            if (status==='denied' && !canAskAgain) {
                //error
                this.setState({...this.state, permissionError: true})
            }
        }
    };

    componentDidMount(){
        this.getPermission();
    }
    
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
        } = this.state;
        if (permissionError) {
            return (
                <View className="flex-1 justify-center items-center">
                    <Text className = "text-white font-scBold">
                        Apparently you have not given permission to read audio files. You can always change this in your device settings.
                    </Text>
                </View>
            );
        } 
        return (
        <AudioContext.Provider value={{ 
            audioFiles, 
            dataProvider, 
            playbackObject, 
            soundObject, 
            currentAudio, 
            isPlaying, 
            currentAudioIndex, 
            updateState: this.updateState, 
            refreshAudioFiles: this.getAudioFiles, // Expose refresh method
            }}>
            {this.props.children}
        </AudioContext.Provider>
        );
    }
}

export default AudioProvider