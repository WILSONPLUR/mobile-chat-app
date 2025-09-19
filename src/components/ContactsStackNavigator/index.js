import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from '../../screens/Contacts';
import { PersonalChat } from '../../screens/PersonalChat';

const Stack = createNativeStackNavigator();

export function ContactsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="ContactsList" 
        component={ContactsScreen} 
      />
      <Stack.Screen 
        name="PersonalChat" 
        component={PersonalChat}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
