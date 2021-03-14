import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, View, Button} from 'react-native';
// import "Register" from 

const LoginScreen = ({navigation}) => {
    const [text, setText] = useState('')
    
    return (
        <View style={{padding: 10}}>
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Login</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <Text>Username:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter a username" />
        <Text>Password:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter a password" />
        
        <View style ={{marginTop: 10, margin:5}}>
        <Button
          title="Login"
        //   onPress={() =>
        //     navigation.navigate('Login')
        //   }
        />
        </View>

        <View style ={{margin:5}}>
        <Button
          title="Register"
          color = "green"
          onPress={() =>
            navigation.navigate('Register')
          }
        />
        </View>
        <View style ={{margin:5}}>
        <Button
          title="Forgot Password"
          color = "red"
          onPress={() =>
            navigation.navigate('Forgot Password')
          }
        />
        </View>
       </View>
    );
    
}

export default LoginScreen;