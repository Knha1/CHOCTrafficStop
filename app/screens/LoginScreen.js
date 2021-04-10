import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, Rectangle, TouchableOpacity, TextInput, View, Button} from 'react-native';
import colors from "../config/colors";

function LoginScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
        <View style={styles.container}>
        

        <View style={styles.bottomContainer}>
        <Text style = {{color: '#003C98', paddingTop: 40, fontSize:20 , alignSelf: 'flex-start', paddingLeft: 36}}>Get Started</Text>
          <Text>Registration Code: </Text>
          <TextInput 
            style={{height: 40}}
            placeholder = "Enter Registration Code" />
          <TouchableOpacity
            style={styles.button}
            title="Login"
            onPress={() =>
              navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        </View>
       
    );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066BB',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60
  },
  bottomContainer: {
    //flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    
    //width: 300,
  },
  text: {
    color: "#003C98"
  },
  button: {
    position: 'absolute',
      bottom: 10,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: "#0E4B9D",
      borderRadius: 30,
      height: 45,
      width: 340
  },
  buttonText: {
    color: '#fff'
  }
});

export default LoginScreen;