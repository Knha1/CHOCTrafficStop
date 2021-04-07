import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState} from "react";
import {ImageBackground, Button,StyleSheet, TouchableOpacity, Text, TextInput, View, Image} from 'react-native';
import logo from "../assets/logo_nobg.png";
import { NavigationContainer } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { processFontFamily } from 'expo-font';

function WelcomeScreen({navigation, props}) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={{width: 69, height: 84, alignSelf: 'flex-start'}} />
        <Text> </Text>
        <Text style = {{color: '#fff', paddingTop: 10, alignSelf: 'flex-start', padding: 10, fontSize:hp('3.5%'), textAlign: 'left'}}>Welcome to{"\n"}ConnecTeen</Text>
        <Text style = {{color: '#fff', paddingTop: 10, fontSize:hp('2%') , alignSelf: 'flex-start', padding: 10, textAlign: 'left'}}>Get help finding resources, tracking your mood, and more. </Text>
        <Text> </Text>
        <TouchableOpacity
          style={styles.button}
          color="#f2f"
          title="Get Started"
          onPress={() =>
            navigation.navigate('Login')
          }
        >
        <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0066BB',
      //border: '30, solid, #ffb3cc',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
      paddingTop: 60
      //paddingTop: 50,
      //marginTop: 50,
      //paddingLeft: 30,
      //paddingRight: 30
    },
    text: {
      color: '#fff'
      
    },
    button: {
      position: 'absolute',
      bottom: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#fff",
      borderRadius: 30,
      height: 45,
      width: 340
    },
    buttonText: {
      color: '#000'
      //alignSelf: 'center',
      //textAlignVertical: 'center'
    }
  });

  export default WelcomeScreen;