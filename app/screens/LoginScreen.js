import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import colors from "../config/colors";

function LoginScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
        <View style={{padding: 10}}>
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Get Started</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <Text>Registration Code: </Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter Registration Code" />

        
        <View style ={{marginTop: 10, margin:5}}>
        <Button
          title="Login"
          onPress={() =>
            navigation.navigate('Home')
          }
        />
        </View>
       </View>
    );
    
}

export default LoginScreen;