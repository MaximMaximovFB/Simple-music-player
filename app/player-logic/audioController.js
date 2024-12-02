// {"androidImplementation": "SimpleExoPlayer", 
    //   "audioPan": 0, "didJustFinish": false, 
    //   "durationMillis": 213028, "isBuffering": true, 
    //   "isLoaded": true, "isLooping": false, "isMuted": false, 
    //   "isPlaying": true, "playableDurationMillis": 26122, 
    //   "positionMillis": 0, "progressUpdateIntervalMillis": 500, 
    //   "rate": 1, "shouldCorrectPitch": false, "shouldPlay": true, 
    //   "uri": "/storage/emulated/0/Download/Poor_Mans_Poison_-_Hells_Comin_with_Me_(musmore.com).mp3", 
    //   "volume": 1} 

//play
export const playFunc = async (playbackObject, uri) => {
    try {
        return await playbackObject.loadAsync({ uri }, {shouldPlay: true});
    } catch (error) {
        console.log("Error in play-func of the audioController", error.message);
    }
}

//pause
export const pauseFunc = async (playbackObject) => {
    try {
        return await playbackObject.setStatusAsync({shouldPlay: false});
    } catch (error) {
        console.log("Error in pause-func of the audioController", error.message);
    }
}
//resume
export const resumeFunc = async (playbackObject) => {
    try {
        return await playbackObject.playAsync();
    } catch (error) {
        console.log("Error in resume-func of the audioController", error.message);
    }
}

//select another

export const playNextFunc = async (playbackObject, uri) => {
    try {
        await playbackObject.stopAsync();
        await playbackObject.unloadAsync();
        return await playFunc(playbackObject, uri)
    } catch (error) {
        console.log("Error in playNext-func of the audioController", error.message);
    }
};



