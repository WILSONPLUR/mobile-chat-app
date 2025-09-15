import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts,
  Mulish_200ExtraLight,
  Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
  Mulish_900Black,
} from '@expo-google-fonts/mulish';
import {View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Auth/Login';
import VerificationScreen from './src/screens/Auth/Verification';
import { Button } from './src/ui/components/Button';
import { MFAScreen } from './src/screens/Auth/MFA';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Mulish_200ExtraLight, 
    Mulish_300Light, 
    Mulish_400Regular, 
    Mulish_500Medium, 
    Mulish_600SemiBold, 
    Mulish_700Bold, 
    Mulish_800ExtraBold, 
    Mulish_900Black, 
  });
  if(!fontsLoaded) {
    return null;
  }

  else {
    return (
    <NavigationContainer>
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
      </Stack.Navigator>
      <StatusBar style="auto" />  
    </NavigationContainer>
  );
  }
  
}