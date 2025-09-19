import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';

export const PersonalChat = ({route}) => {
  const navigation = useNavigation();
  const { name, id, avatar, initials, avatarColor, isOnline } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.contactInfo}>
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image source={avatar} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: avatarColor }]}>
                <Text style={styles.avatarInitials}>{initials}</Text>
              </View>
            )}
            {isOnline && <View style={styles.onlineIndicator} />}
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.contactName}>{name}</Text>
            <Text style={styles.onlineStatus}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📹</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.chatArea}>
        <Text style={styles.chatPlaceholder}>Chat with {name}</Text>
        <Text style={styles.chatSubtext}>Start a conversation...</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    paddingBottom: 90, // Add padding to prevent overlap with bottom tab bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
    backgroundColor: COLORS.light.background,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.light.textPrimary,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: COLORS.light.background,
    fontSize: 16,
    fontFamily: 'Mulish_600SemiBold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.light.background,
  },
  nameContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontFamily: 'Mulish_600SemiBold',
    color: COLORS.light.textPrimary,
  },
  onlineStatus: {
    fontSize: 14,
    fontFamily: 'Mulish_400Regular',
    color: COLORS.light.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.light.inputBackground,
  },
  actionButtonText: {
    fontSize: 18,
  },
  chatArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  chatPlaceholder: {
    fontSize: 20,
    fontFamily: 'Mulish_600SemiBold',
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  chatSubtext: {
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    color: COLORS.light.textSecondary,
  },
});
