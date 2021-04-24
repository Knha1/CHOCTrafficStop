import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';

function RegisterScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
        <View style={{padding: 10}}>
        
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Register</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <Text>Name:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter your name" />
        <Text>Email:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter your Email" />
        <Text>Username:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter a username" />
        <Text>Password:</Text>
        <TextInput 
        style={{height: 40}}        
        placeholder = "Enter a password" />
        <Text>Confirm password:</Text>
        <TextInput 
        style={{height: 40}}        
        placeholder = "Enter a password" />


        <View style ={{margin:5}}>
        <Button
          title="Confirm"
          color = "green"
          onPress={() =>
            navigation.navigate('Login')
          }
        />
        </View>
       </View>
    );
}

export default RegisterScreen;