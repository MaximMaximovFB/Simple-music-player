import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CustomIconButton = ({ iconName, iconSize, iconColor, handlePress, containerStyles, textStyles, isLoading, libName}) => {
  
  const IconComponent = libName === 'MaterialIcons' ? MaterialIcons : MaterialCommunityIcons;

  return (
    // border-secondary border-solid border-2 
    <View className = "min-h-[50px]">
      <TouchableOpacity  
        onPress = { handlePress}
        activeOpacity={0.7}
        className={` rounded-sm w-[full] h-[full] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled = {isLoading}
      >   
        <IconComponent name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
    </View>
  )
}

// export {CustomButton };
export default CustomIconButton;