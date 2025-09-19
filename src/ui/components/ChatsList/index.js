import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import { COLORS } from '../../../constants/colors'

const ChatsList = ({ chats = [], onChatPress, containerStyle }) => {
  const defaultChats = [
    {
      id: 'placeholder',
      name: 'Placeholder',
      lastMessage: '',
      time: '',
      unreadCount: 0,
      avatar: require('../../../../assets/images/add-chats.webp'),
      isPlaceholder: true,
      avatarColor: '#FF6B6B'
    },
    {
      id: 1,
      name: 'Athalia Putri',
      lastMessage: 'Good morning, did you sleep well?',
      time: 'Today',
      unreadCount: 1,
      avatar: require('../../../../assets/images/avatar-placeholder.png'),
      isOnline: true
    },
    {
      id: 2,
      name: 'Raki Devon',
      lastMessage: 'How is it going?',
      time: '17/6',
      unreadCount: 0,
      avatar: null,
      initials: 'RD',
      avatarColor: '#002DE3',
      isOnline: false
    },
    {
      id: 3,
      name: 'Erlan Sadewa',
      lastMessage: 'Aight, noted',
      time: '17/6',
      unreadCount: 1,
      avatar: require('../../../../assets/images/avatar-placeholder.png'),
      isOnline: false
    }
  ]

  const chatsToRender = chats.length > 0 ? chats : defaultChats

  const renderChatItem = (chat) => (
    <TouchableOpacity
      key={chat.id}
      style={styles.chatItem}
      onPress={() => onChatPress && onChatPress(chat)}
    >
      <View style={styles.avatarContainer}>
        {chat.isPlaceholder ? (
          <View style={[styles.placeholderAvatar, { backgroundColor: chat.avatarColor }]}>
            <Image source={chat.avatar} style={styles.placeholderIcon} />
          </View>
        ) : chat.avatar ? (
          <Image source={chat.avatar} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: chat.avatarColor }]}>
            <Text style={styles.avatarInitials}>{chat.initials}</Text>
          </View>
        )}
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {chat.name}
          </Text>
          {chat.time && (
            <Text style={styles.chatTime}>{chat.time}</Text>
          )}
        </View>
        {chat.lastMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {chat.lastMessage}
            </Text>
            {chat.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView 
      style={[styles.container, containerStyle]} 
      showsVerticalScrollIndicator={false}
    >
      {chatsToRender.map(chat => renderChatItem(chat))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  placeholderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Mulish_600SemiBold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00C851',
    borderWidth: 2,
    borderColor: COLORS.light.background,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.light.textPrimary,
    fontFamily: 'Mulish_600SemiBold',
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
    color: COLORS.light.textSecondary,
    fontFamily: 'Mulish_400Regular',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: COLORS.light.textSecondary,
    fontFamily: 'Mulish_400Regular',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#002DE3',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Mulish_600SemiBold',
  },
})

export default ChatsList
