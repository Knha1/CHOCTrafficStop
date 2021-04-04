import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { registerRootComponent } from 'expo';
// import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, Button, SafeAreaView} from 'react-native';
// import logo from './app/assets/test_logo.png';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { createStackNavigator } from '@react-navigation/stack';
// import WelcomeScreen from "./app/assets/screens/placeholder";
import LoginScreen from "./app/screens/LoginScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen"
// import RegisterScreen from './app/screens/RegisterScreen';
// import ForgotPasswordScreen from './app/screens/ForgotPasswordScreen';
import ResourceListScreen from './app/screens/ResourceListScreen';
import HomeScreen from './app/screens/HomeScreen';
import SettingsScreen from './app/screens/SettingsScreen'
import { Settings } from 'react-native';
// import SurveyCategoriesScreen from './app/screens/SurveyCategoriesScreen';
import ResourceRecommendedScreen from './app/screens/ResourceRecommendedScreen';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: 'Welcome' }} />

      <Stack.Screen 
      name="Login" 
      component={LoginScreen} />

      {/* <Stack.Screen 
      name="Register" 
      component={RegisterScreen} /> */}

      {/* <Stack.Screen 
      name="Forgot Password" 
      component={ForgotPasswordScreen} /> */}

      <Stack.Screen
      name="Resource List"
      component={ResourceListScreen} />

      <Stack.Screen
      name="Home"
      component={HomeScreen} />

      <Stack.Screen
      name="Settings"
      component={SettingsScreen} />

      <Stack.Screen
      name="Recommended"
      component={ResourceRecommendedScreen} />

{/* <Stack.Screen
      name="Survey Categories"
      component={SurveyCategoriesScreen} /> */}

    </Stack.Navigator>
  </NavigationContainer>
  );
}

