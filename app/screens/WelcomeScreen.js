import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState} from "react";
import {ImageBackground, Button,StyleSheet, Text, TextInput, View, Image} from 'react-native';
import logo from "../assets/test_logo.png";
import { NavigationContainer } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function WelcomeScreen({navigation, props}) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={{width: 100, height: 100, alignSelf: 'center'}} />
        <Text> </Text>
        <Text style = {{paddingTop: 10, alignSelf: 'center', padding: 20, fontSize:hp('5%')}}>Welcome to ConnecTeen</Text>
        <Text style = {{paddingTop: 20, fontSize:hp('5%') , alignSelf: 'center', padding: 20}}>An app to track your mood and health!</Text>
        <Text> </Text>
        <Button
          title="Get Started"
          onPress={() =>
            navigation.navigate('Login')
          }
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
  });

  export default WelcomeScreen;