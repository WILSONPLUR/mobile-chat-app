import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import MFAScreen from "../../screens/Auth/MFA";
import SignUpScreen from "../../screens/Auth/SignUp";
import VerificationScreen from "../../screens/Auth/Verification";
import HomeScreen from "../../screens/Home";
import { COLORS } from '../../constants/colors';
import {Button} from '../../ui/components/Button';

const Stack = createNativeStackNavigator();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen 
        name="Verification" 
        component={VerificationScreen} 
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <Button type='back' />
          ),
        }} 
      />
      <Stack.Screen name="MFA" component={MFAScreen} options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <Button type='back' />
          ),
        }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Button type='back' />
              <Text style={{fontFamily: 'Mulish_600SemiBold', fontSize: 16, color: COLORS.light.textPrimary}}>Your Profile</Text>
            </View>
          ),
        }} />
    </Stack.Navigator>
  );
}