import React, { useState } from 'react'
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextField } from '../../ui/components/TextField'
import { COLORS } from '../../constants/colors'

const ContactsScreen = () => {
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('')

  const contacts = [
    {
      id: 1,
      name: 'Athalia Putri',
      status: 'Last seen yesterday',
      avatar: require('../../../assets/images/avatar-placeholder.png'), // Placeholder
      isOnline: false
    },
    {
      id: 2,
      name: 'Erlan Sadewa',
      status: 'Online',
      avatar: require('../../../assets/images/avatar-placeholder.png'), // Placeholder
      isOnline: true
    },
    {
      id: 3,
      name: 'Midala Huera',
      status: 'Last seen 3 hours ago',
      avatar: require('../../../assets/images/avatar-placeholder.png'), // Placeholder
      isOnline: false
    },
    {
      id: 4,
      name: 'Nafisa Gitari',
      status: 'Online',
      avatar: require('../../../assets/images/avatar-placeholder.png'), // Placeholder
      isOnline: true
    },
    {
      id: 5,
      name: 'Raki Devon',
      status: 'Online',
      avatar: null, // Will show initials
      isOnline: true,
      initials: 'RD',
      avatarColor: '#002DE3'
    },
    {
      id: 6,
      name: 'Salsabila Akira',
      status: 'Last seen 30 minutes ago',
      avatar: null, // Will show initials
      isOnline: false,
      initials: 'SA',
      avatarColor: '#002DE3'
    }
  ]

  const handleContactPress = (contact) => {
    navigation.navigate('PersonalChat', {
      name: contact.name,
      id: contact.id,
      avatar: contact.avatar,
      initials: contact.initials,
      avatarColor: contact.avatarColor,
      isOnline: contact.isOnline
    })
  }

  const renderContactItem = (contact) => (
    <TouchableOpacity 
      key={contact.id} 
      style={styles.contactItem}
      onPress={() => handleContactPress(contact)}
    >
      <View style={styles.avatarContainer}>
        {contact.avatar ? (
          <Image source={contact.avatar} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: contact.avatarColor }]}>
            <Text style={styles.avatarInitials}>{contact.initials}</Text>
          </View>
        )}
        {contact.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactStatus}>{contact.status}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image 
            source={require('../../../assets/images/home/search-icon.webp')} 
            style={styles.searchIcon} 
          />
          <TextField
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            containerStyle={styles.searchFieldContainer}
            inputStyle={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView style={styles.contactsList} showsVerticalScrollIndicator={false}>
        {contacts.map(contact => renderContactItem(contact))}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.light.textPrimary,
    fontFamily: 'Mulish_600SemiBold',
  },
  addButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '300',
    color: COLORS.light.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchInputContainer: {
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
  searchFieldContainer: {
    flex: 1,
    marginVertical: 0,
  },
  searchInput: {
    paddingLeft: 48,
    backgroundColor: COLORS.light.backgroundSecondary,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
  },
  contactsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  contactItem: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.light.textPrimary,
    fontFamily: 'Mulish_600SemiBold',
    marginBottom: 2,
  },
  contactStatus: {
    fontSize: 14,
    color: COLORS.light.textSecondary,
    fontFamily: 'Mulish_400Regular',
  },
})

export default ContactsScreen;
