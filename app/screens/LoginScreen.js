import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, Rectangle, TouchableOpacity, TextInput, View, Button, KeyboardAvoidingView} from 'react-native';
import colors from "../config/colors";

function LoginScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior = "height">
        <View style={styles.bottomContainer}>
        <Text style = {{color: '#003C98', paddingTop: 40, fontSize:20 , alignSelf: 'flex-start', paddingLeft: 36}}>Get Started</Text>
          <TextInput 
            style={{margin: 40, padding: 5, paddingLeft: 15, borderWidth: 1.0, borderColor: '#D1D1D1'}}
            autoCapitalize="characters"
            placeholder = "Enter Registration Code (Optional)" />
          <TouchableOpacity
            style={styles.button}
            title="Login"
            onPress={() =>
              navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* NAVIGATE TO ADMIN LOG IN PAGE */}
          <Text style={{color: '#003C98', alignSelf: 'center', paddingTop: 80}}
            onPress={() => navigation.navigate('Home')}>
            Log In as Admin User
          </Text>
        </View>
        </KeyboardAvoidingView>
       
    );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066BB',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    paddingTop: 200
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
      top: 180,
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