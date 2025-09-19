import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../../ui/components/Header'
import SearchBar from '../../ui/components/SearchBar'
import Stories from '../../ui/components/Stories'
import ChatsList from '../../ui/components/ChatsList'
import { COLORS } from '../../constants/colors'

const ChatsScreen = () => {
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('')

  const handleAddChat = () => {
    // Handle add chat functionality
    console.log('Add chat pressed')
  }

  const handleFilterChats = () => {
    // Handle filter chats functionality
    console.log('Filter chats pressed')
  }

  const handleStoryPress = (story) => {
    // Handle story press
    console.log('Story pressed:', story.name)
  }

  const handleChatPress = (chat) => {
    // Navigate to chat screen or handle chat press
    if (!chat.isPlaceholder) {
      console.log('Chat pressed:', chat.name)
      // You can navigate to PersonalChat here if needed
      // navigation.navigate('PersonalChat', { ...chat })
    }
  }

  const headerRightButtons = [
    {
      icon: require('../../../assets/images/add-chats.webp'),
      onPress: handleAddChat
    },
    {
      icon: require('../../../assets/images/filter-chats.webp'),
      onPress: handleFilterChats
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Chats"
        rightButtons={headerRightButtons}
      />
      
      <SearchBar 
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      
      <Stories onStoryPress={handleStoryPress} />
      
      <ChatsList onChatPress={handleChatPress} />
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
