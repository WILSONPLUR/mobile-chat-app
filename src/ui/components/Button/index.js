import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'

export const Button = ({children, type, onPress}) => {
  const {goBack} = useNavigation();
  const handlePressing = () => {
    if(type === 'back') {
      goBack();
    }
    else if(onPress) {
      onPress();
    }
  }
  
  if(type === 'back') {
    return (
      <TouchableOpacity onPress={handlePressing} style={{padding: 8}}>
        <Image 
          source={require('../../../../assets/images/home/back-arrow.webp')} 
          style={{width: 20, height: 20, objectFit: 'contain'}}
        />
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity onPress={handlePressing}>
        <View>
            <Text>{children}</Text>
        </View>
    </TouchableOpacity>
  )
}
