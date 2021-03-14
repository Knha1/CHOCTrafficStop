import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';

const ForgotPasswordScreen = ({navigation}) => {
    const [text, setText] = useState('')
    
    return (
        <View style={{padding: 10}}>

        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Forgot Password?</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <Text>Email:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter your Email" />


        <View style ={{margin:5}}>
        <Button
          title="Reset Password"
          color = "grey"
          onPress={() =>
            navigation.navigate('Login')
          }
        />
        </View>
       </View>
    );
    
}

export default ForgotPasswordScreen;