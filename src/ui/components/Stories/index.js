import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import { COLORS } from '../../../constants/colors'

const Stories = ({ stories = [], onStoryPress, containerStyle }) => {
  const defaultStories = [
    {
      id: 'your-story',
      name: 'Your Story',
      isYourStory: true,
      avatar: null,
      initials: null,
      avatarColor: '#FF6B6B'
    },
    {
      id: 'midala',
      name: 'Midala Hu...',
      isYourStory: false,
      avatar: require('../../../../assets/images/avatar-placeholder.png'),
      initials: null,
      avatarColor: null
    },
    {
      id: 'salsabila',
      name: 'Salsabila...',
      isYourStory: false,
      avatar: null,
      initials: 'SA',
      avatarColor: '#002DE3'
    }
  ]

  const storiesToRender = stories.length > 0 ? stories : defaultStories

  const renderStoryItem = (story) => (
    <TouchableOpacity
      key={story.id}
      style={styles.storyItem}
      onPress={() => onStoryPress && onStoryPress(story)}
    >
      <View style={styles.storyAvatarContainer}>
        {story.isYourStory ? (
          <View style={[styles.yourStoryAvatar, { backgroundColor: story.avatarColor }]}>
            <Image 
              source={require('../../../../assets/images/add-chats.webp')} 
              style={styles.addIcon}
            />
          </View>
        ) : story.avatar ? (
          <Image source={story.avatar} style={styles.storyAvatar} />
        ) : (
          <View style={[styles.storyAvatarPlaceholder, { backgroundColor: story.avatarColor }]}>
            <Text style={styles.storyAvatarInitials}>{story.initials}</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.name}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {storiesToRender.map(story => renderStoryItem(story))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  storyAvatarContainer: {
    marginBottom: 8,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  yourStoryAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatarInitials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Mulish_600SemiBold',
  },
  addIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  storyName: {
    fontSize: 12,
    color: COLORS.light.textSecondary,
    fontFamily: 'Mulish_400Regular',
    textAlign: 'center',
  },
})

export default Stories
