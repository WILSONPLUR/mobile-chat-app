import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { TextField } from '../TextField'
import { COLORS } from '../../../constants/colors'

const SearchBar = ({ 
  placeholder = "Search", 
  value, 
  onChangeText, 
  containerStyle,
  inputStyle 
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <Image 
          source={require('../../../../assets/images/home/search-icon.webp')} 
          style={styles.searchIcon} 
        />
        <TextField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          containerStyle={styles.fieldContainer}
          inputStyle={[styles.input, inputStyle]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    width: 20,
    height: 20,
    zIndex: 1,
    tintColor: COLORS.light.textSecondary,
  },
  fieldContainer: {
    flex: 1,
    marginVertical: 0,
  },
  input: {
    paddingLeft: 48,
    backgroundColor: COLORS.light.backgroundSecondary,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
  },
})

export default SearchBar
