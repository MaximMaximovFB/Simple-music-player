import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CustomButton = ({ iconName, iconSize, iconColor, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    // border-secondary border-solid border-2 
    <TouchableOpacity 
        onPress = { handlePress}
        activeOpacity={0.7}
        className={` rounded-sm min-h-[25px] w-[full] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled = {isLoading}
    >   
        <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  )
}

// export {CustomButton };
export default CustomButton;