import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress = { handlePress}
        activeOpacity={0.7}
        className={` rounded-sm border-secondary border-solid border-2 min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled = {isLoading}
    >   
        <Text className={`text-secondary font-scBold ${textStyles} `}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

// export {CustomButton };
export default CustomButton;