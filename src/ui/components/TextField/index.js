import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { COLORS } from '../../../constants/colors'

export const TextField = ({
  placeholder, 
  value, 
  onChangeText, 
  containerStyle,
  inputStyle,
  variant = 'default',
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  const handleChangeText = (text) => {
    if (onChangeText) {
      onChangeText(text);
    } else {
      setInternalValue(text);
    }
  };

  const getContainerStyle = () => {
    switch (variant) {
      case 'phone':
        return [styles.container, styles.phoneContainer, containerStyle];
      case 'search':
        return [styles.container, styles.searchContainer, containerStyle];
      default:
        return [styles.container, containerStyle];
    }
  };

  const getInputStyle = () => {
    switch (variant) {
      case 'phone':
        return [styles.input, styles.phoneInput, inputStyle];
      case 'search':
        return [styles.input, styles.searchInput, inputStyle];
      default:
        return [styles.input, inputStyle];
    }
  };

  return (
    <View style={getContainerStyle()}>
      <TextInput 
        placeholder={placeholder}
        placeholderTextColor={COLORS.light.textSecondary}
        value={value !== undefined ? value : internalValue} 
        onChangeText={handleChangeText}
        style={getInputStyle()}
        {...rest} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    color: COLORS.light.textPrimary,
    backgroundColor: COLORS.light.backgroundSecondary,
  },
  phoneContainer: {
    flex: 1,
  },
  phoneInput: {
    color: COLORS.light.textPrimary,
    backgroundColor: COLORS.light.backgroundSecondary,
    fontSize: 16,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    color: COLORS.light.textPrimary,
    backgroundColor: COLORS.light.backgroundSecondary,
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    '&:after': {
      content: '""',
      position: 'absolute',
      right: 16,
      top: 10,
      width: 24,
      height: 24,
      background: 'url(./assets/icons/search-icon.webp) no-repeat center center',
      backgroundSize: 'contain',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    }
  },
})
