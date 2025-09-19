import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { TextField } from '../../../ui/components/TextField'
import { ImagePicker } from '../../../ui/components/ImagePicker'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../context/auth'

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const { navigate } = useNavigation()
  const {setAuthenticated} = useAuth()
  
  const handleImageSelected = (imageUri, imageInfo) => {
    setProfileImage(imageUri)
    console.log('Image selected:', imageUri)
  }

  const handleSave = () => {
    // Handle save logic here
    console.log('Save profile:', { firstName, lastName, profileImage })
    try {
      setAuthenticated(true);
      console.log('Authentication set successfully');
    } catch (error) {
      console.error('Error setting authentication:', error);
    }
    // No need to navigate manually - the AuthContext change will automatically switch to tab navigator
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.topContent}>
              <Text style={styles.title}>Your Profile</Text>
              
              {/* Profile Avatar Section */}
              <View style={styles.avatarContainer}>
                <ImagePicker
                  onImageSelected={handleImageSelected}
                  style={styles.avatarCircle}
                  imageStyle={styles.avatarImage}
                  showSelectedImage={true}
                >
                  <View style={styles.avatarIcon}>
                    <View style={styles.avatarHead} />
                    <View style={styles.avatarBody} />
                  </View>
                </ImagePicker>
                <View style={styles.addPhotoButton}>
                  <Text style={styles.addPhotoIcon}>+</Text>
                </View>
              </View>

              {/* Form Fields */}
              <View style={styles.formContainer}>
                <TextField
                  placeholder="First Name (Required)"
                  value={firstName}
                  onChangeText={setFirstName}
                  containerStyle={styles.textFieldContainer}
                />
                <TextField
                  placeholder="Last Name (Optional)"
                  value={lastName}
                  onChangeText={setLastName}
                  containerStyle={styles.textFieldContainer}
                />
              </View>
            </View>

            <View style={styles.bottomContent}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  topContent: {
    paddingTop: 40,
    alignItems: 'center',
  },
  bottomContent: {
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: COLORS.light.textPrimary,
    marginBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 60,
    position: 'relative',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.light.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarIcon: {
    alignItems: 'center',
  },
  avatarHead: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.light.textSecondary,
    marginBottom: 4,
  },
  avatarBody: {
    width: 32,
    height: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: COLORS.light.textSecondary,
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.light.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.light.background,
  },
  addPhotoIcon: {
    color: COLORS.light.background,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
  },
  formContainer: {
    width: '100%',
    gap: 8,
  },
  textFieldContainer: {
    marginVertical: 4,
  },
  saveButton: {
    backgroundColor: COLORS.light.secondary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.light.background,
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 16,
  },
})

export default SignUpScreen;
