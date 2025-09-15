import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { COLORS } from '../../../constants/colors'

export const MFAScreen = () => {
  const [code, setCode] = useState(['', '', '', ''])
  const phoneNumber = '+62 1309 - 1710 - 1920'

  const handleNumberPress = (number) => {
    const newCode = [...code]
    const emptyIndex = newCode.findIndex(digit => digit === '')
    if (emptyIndex !== -1) {
      newCode[emptyIndex] = number
      setCode(newCode)
    }
  }

  const handleBackspace = () => {
    const newCode = [...code]
    const lastFilledIndex = newCode.map((digit, index) => digit !== '' ? index : -1)
      .filter(index => index !== -1)
      .pop()
    
    if (lastFilledIndex !== undefined) {
      newCode[lastFilledIndex] = ''
      setCode(newCode)
    }
  }

  const handleResendCode = () => {
    // Handle resend code logic
    console.log('Resend code')
  }

  const renderKeypadButton = (number) => (
    <TouchableOpacity
      key={number}
      style={styles.keypadButton}
      onPress={() => handleNumberPress(number.toString())}
      accessibilityRole="button"
      accessibilityLabel={`Number ${number}`}
    >
      <Text style={styles.keypadButtonText}>{number}</Text>
    </TouchableOpacity>
  )

  const renderBackspaceButton = () => (
    <TouchableOpacity
      style={styles.keypadButton}
      onPress={handleBackspace}
      accessibilityRole="button"
      accessibilityLabel="Delete"
    >
      <Text style={styles.backspaceText}>⌫</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.light.background} />
    
      <View style={styles.content}>
        {/* Title and subtitle */}
        <View style={styles.topContent}>
          <Text style={styles.title}>Enter Code</Text>
          <Text style={styles.subtitle}>
            We have sent you an SMS with the code{'\n'}to {phoneNumber}
          </Text>

          {/* Code input circles */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.codeCircle,
                  digit !== '' && styles.codeCircleFilled
                ]}
              >
                <Text style={styles.codeText}>{digit}</Text>
              </View>
            ))}
          </View>

          {/* Resend code link */}
          <TouchableOpacity 
            onPress={handleResendCode}
            style={styles.resendButton}
            accessibilityRole="button"
            accessibilityLabel="Resend verification code"
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        </View>

        {/* Numeric keypad */}
        <View style={styles.keypadContainer}>
          <View style={styles.keypadRow}>
            {renderKeypadButton(1)}
            {renderKeypadButton(2)}
            {renderKeypadButton(3)}
          </View>
          <View style={styles.keypadRow}>
            {renderKeypadButton(4)}
            {renderKeypadButton(5)}
            {renderKeypadButton(6)}
          </View>
          <View style={styles.keypadRow}>
            {renderKeypadButton(7)}
            {renderKeypadButton(8)}
            {renderKeypadButton(9)}
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keypadButton} />
            {renderKeypadButton(0)}
            {renderBackspaceButton()}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light.backgroundSecondary,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 18,
    color: COLORS.light.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  topContent: {
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Mulish_400Regular',
    fontSize: 14,
    color: COLORS.light.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  codeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.light.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeCircleFilled: {
    backgroundColor: COLORS.light.textPrimary,
  },
  codeText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.light.background,
  },
  resendButton: {
    paddingVertical: 8,
  },
  resendText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: COLORS.light.secondary,
    fontWeight: '600',
  },
  keypadContainer: {
    paddingBottom: 40,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  keypadButton: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.light.textPrimary,
  },
  backspaceText: {
    fontSize: 24,
    color: COLORS.light.textPrimary,
  },
})
