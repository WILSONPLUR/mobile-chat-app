import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native'
import * as ImagePickerExpo from 'expo-image-picker'
import { COLORS } from '../../../constants/colors'

export const ImagePicker = ({ 
  onImageSelected, 
  children, 
  style,
  imageStyle,
  showSelectedImage = true,
  allowsEditing = true,
  aspect = [1, 1],
  quality = 0.8
}) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const requestPermission = async () => {
    const { status } = await ImagePickerExpo.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to select images.',
        [{ text: 'OK' }]
      )
      return false
    }
    return true
  }

  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Photo Library', onPress: openImageLibrary },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) return

    const result = await ImagePickerExpo.launchCameraAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
      allowsEditing,
      aspect,
      quality,
    })

    handleImageResult(result)
  }

  const requestCameraPermission = async () => {
    const { status } = await ImagePickerExpo.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera permissions to take photos.',
        [{ text: 'OK' }]
      )
      return false
    }
    return true
  }

  const openImageLibrary = async () => {
    const hasPermission = await requestPermission()
    if (!hasPermission) return

    const result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
      allowsEditing,
      aspect,
      quality,
    })

    handleImageResult(result)
  }

  const handleImageResult = (result) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri
      setSelectedImage(imageUri)
      if (onImageSelected) {
        onImageSelected(imageUri, result.assets[0])
      }
    }
  }

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={showImagePicker}
      activeOpacity={0.7}
    >
      {showSelectedImage && selectedImage ? (
        <Image 
          source={{ uri: selectedImage }} 
          style={[styles.selectedImage, imageStyle]} 
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})
