import { Alert, Text, View } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
 

export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((firstRule,secondRule) => firstRule !== secondRule),
            playbackObject: null,
            soundObject: null,
            currentAudio: {},
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
            this.getAudioFiles();
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
                this.getAudioFiles();
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
        const {audioFiles, dataProvider, permissionError, playbackObject, soundObject, currentAudio} = this.state;
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
        <AudioContext.Provider value={{ audioFiles, dataProvider, playbackObject, soundObject, currentAudio, updateState: this.updateState}}>
            {this.props.children}
        </AudioContext.Provider>
        );
    }
}

export default AudioProvider