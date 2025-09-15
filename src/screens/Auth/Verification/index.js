import { useState } from 'react'
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { TextField } from '../../../ui/components/TextField';
import { CountrySelector } from '../../../ui/components/CountrySelector';
import { COLORS } from '../../../constants/colors';
import { COUNTRIES } from '../../../mock/countries';
import { useNavigation } from '@react-navigation/native';

const VerificationScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default to US
  const [phoneNumber, setPhoneNumber] = useState('');

  const {navigate} = useNavigation();

  const handleContinue = () => {
    navigate('MFA');
  };

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
              <Text style={styles.title}>
                Enter Your Phone Number
              </Text>
              <Text style={styles.subtitle}>
                Please confirm your country code and enter your phone number
              </Text>
              
              <View style={styles.phoneInputContainer}>
                <CountrySelector 
                  selectedCountry={selectedCountry}
                  onCountrySelect={setSelectedCountry}
                />
                <TextField 
                  variant="phone"
                  keyboardType='phone-pad' 
                  placeholder='Phone Number'
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </View>

            <View style={styles.bottomContent}>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
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
    paddingTop: 60,
  },
  bottomContent: {
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Mulish',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Mulish_400Regular',
    fontSize: 14,
    color: COLORS.light.textPrimary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  continueButton: {
    backgroundColor: COLORS.light.secondary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.light.background,
    fontFamily: 'Mulish',
    fontWeight: 600,
    fontSize: 16,
  },
})

export default VerificationScreen;
