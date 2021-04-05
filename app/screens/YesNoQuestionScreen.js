import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Icon, TouchableHighlight, Image} from 'react-native';
import check from "../assets/check.png";
import close from "../assets/close.png";

function YesNoQuestionScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
        <View style={{padding: 10}}>
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Do you have a safe place to stay?</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 90
        }}
        />
        {/* <View style = {{alignSelf: 'center', }}> */}

            <View style={styles.container}>
                <TouchableHighlight onPress={() => navigation.navigate("Resource List")} style={ styles.imageContainer }>
                    <Image style={ styles.image } source={close} />
                </TouchableHighlight> 

                <TouchableHighlight onPress={() => navigation.navigate("Resource List")} style={styles.imageContainer}>
                    <Image style={ styles.image} source={check} />
                </TouchableHighlight> 
         </View>
         
       </View>
        
    );
    
}

var styles = StyleSheet.create({
    container: {
        // width: 300,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    imageContainer: {
      flex: 1,
      height:90,
      width: 90,
      borderRadius: 64,
      
      
    },
    image: {
      height:90,
      width: 90,
      borderRadius: 64,
      alignSelf: 'center',
    },
    imageContainer2: {
  
    }
  });

export default YesNoQuestionScreen;