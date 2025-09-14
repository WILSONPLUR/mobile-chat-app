import React from 'react'
import { SafeAreaView, TextInput } from 'react-native'
 const LoginScreen = () => {
  return (
    <SafeAreaView>
        <TextInput placeholder='Email: ' />
        <TextInput placeholder='Password: ' />
    </SafeAreaView>
  )
}

export default LoginScreen;
