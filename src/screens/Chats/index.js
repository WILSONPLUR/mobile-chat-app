import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const ChatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Chats</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    paddingBottom: 90, // Add padding to prevent overlap with bottom tab bar
  },
});

export default ChatsScreen;
