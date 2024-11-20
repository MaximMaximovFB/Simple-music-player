import { Alert, Text, View } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
 

const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props) {
        super(props)
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

        if (!permission.granted && permission.canAskAgain) {
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if (status==='denied' && canAskAgain) {
                // Alert.
                this.permissionAlert();
            }
            if (status==='granted') {
                this.getAudioFiles();
            }

            if (status==='denied' && !canAskAgain) {
                // Error
            }
        }
    };

    componentDidMount(){
            this.getPermission();
    }
    
    getAudioFiles = async () => {
        MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })
        console.log(media);
    }

    render() {
        return <AudioContext.Provider value={{}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider