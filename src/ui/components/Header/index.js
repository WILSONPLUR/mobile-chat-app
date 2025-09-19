import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { COLORS } from '../../../constants/colors'

const Header = ({ 
  title, 
  leftButton, 
  rightButtons = [], 
  containerStyle,
  titleStyle 
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftButton && (
        <TouchableOpacity 
          style={styles.leftButton}
          onPress={leftButton.onPress}
        >
          {leftButton.icon ? (
            <Image source={leftButton.icon} style={styles.buttonIcon} />
          ) : (
            <Text style={styles.buttonText}>{leftButton.text}</Text>
          )}
        </TouchableOpacity>
      )}
      
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      
      <View style={styles.rightButtonsContainer}>
        {rightButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.rightButton, { marginLeft: index > 0 ? 12 : 0 }]}
            onPress={button.onPress}
          >
            {button.icon ? (
              <Image source={button.icon} style={styles.buttonIcon} />
            ) : (
              <Text style={styles.buttonText}>{button.text}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  leftButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.light.textPrimary,
    fontFamily: 'Mulish_600SemiBold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '300',
    color: COLORS.light.textPrimary,
  },
})

export default Header
