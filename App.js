import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import logo from './assets/test_logo.png';


export default function App() {
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"></link>
  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: 200, height: 200, alignSelf: 'center'}} />
      <Text style = {{paddingTop: 10, fontSize:25 , alignSelf: 'center', padding: 20, fontSize: 50}}>Welcome to [app name]</Text>
      <Text style = {{paddingTop: 20, fontSize:25 , alignSelf: 'flex-start', padding: 20}}>An app to track your mood and health!</Text>
      <StatusBar style="auto" />

      <TouchableOpacity onPress = {() => alert('You are "BERRY" special <3')} style = {{backgroundColor: "#cc2d3a", width: 140, height: 30, alignSelf: "center", marginTop: 100}}>
        <Text style = {{fontSize: 20, color: '#fff', alignSelf: 'center'}}>Get Started</Text>
      </TouchableOpacity>

    </View>

  );
}


 /*
      <p style = {{paddingTop: 10, fontFamily: 'Lobster, cursive', fontSize:25 , alignItems: 'left'}}>Welcome to [app name]</p>
      <p style = {{paddingBottom: 100}}>An app to track your mood and health routine! doki doki~</p>
      <button className = "StartButton" style= {{width: 150, height: 40, backgroundColor: "#cc2d3a", alignSelf: 'center'}}>Get Started</button>
      */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffbfc3',
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
