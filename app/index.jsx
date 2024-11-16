import { FlatList, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
// import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {

  return (
    <SafeAreaView>
      <FlatList
        data= {[{ id: 1},{ id: 2},{ id: 3}, ]}
        keyExtractor={(item) => item.$id}
        renderItem={( { item }) => (
          <Text className="text-3xl font-scExtraBold"> {item.id}</Text>
        )}
        ListHeaderComponent={( ) => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between  items-start flex-row mb-6">
              <View>
                <Text className=''>
                  Здесь будут кнопки!
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Welcome
