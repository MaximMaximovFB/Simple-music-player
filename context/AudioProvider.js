import { Alert, Text, View } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
 

export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false
            
        }
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
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio', 
            first: media.totalCount,
        });
        // console.log(media.assets.length);
         console.log(media);
        this.setState({...this.state,audioFiles:media.assets})
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

        if (!permission.canAskAgain && permission.granted) {

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
    


    render() {
        if (this.state.permissionError) {
            return (
                <View className="flex-1 justify-center items-center">
                    <Text className = "text-white font-scBold">
                        Apparently you have not given permission to read audio files. You can always change this in your device settings.
                    </Text>
                </View>
            )
        } 
        return <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider