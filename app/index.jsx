import { FlatList, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as MediaLibrary from 'expo-media-library';


const Welcome = () => {



  return (

        <SafeAreaView className=" h-full bg-primary items-center justify-center">
        {/* <Link href="/music" className="text-white items-center justify-center text-3xl font-scExtraBold">simple music player</Link>s */}
        <CustomButton
          title = "simple music player"
          handlePress={() => router.push('/music')}
          containerStyles="border-0"
        />
        </SafeAreaView>

    
  )
}

export default Welcome

