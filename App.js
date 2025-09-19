import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
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
import { store } from './src/store';
import { AuthProvider, useAuth } from './src/context/auth';
import { MainTabNavigator } from './src/components/MainTabNavigator';
import { AuthStackNavigator } from './src/components/AuthStackNavigator';


function AppNavigator() {
  const { authenticated } = useAuth();
  
  return authenticated ? <MainTabNavigator /> : <AuthStackNavigator />;
}

const App = () => {
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
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />  
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;