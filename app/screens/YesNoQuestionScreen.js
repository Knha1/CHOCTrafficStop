import React, {useState} from "react";
import {ImageBackground, SimpleSurvey, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Icon, TouchableHighlight, Image} from 'react-native';
import check from "../assets/check.png";
import close from "../assets/close.png";

function YesNoQuestionScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
        <View style = {styles.container}>
          <Text style={styles.topText}>Safety and Security Survey</Text>
          <View style={{borderBottomColor: '#FFF', borderBottomWidth: 1}}></View>
        <View style={styles.bottomContainer}>
        <View>
        <Text style = {styles.text}>1. Do you have a safe place to stay?</Text>
              <TouchableHighlight underlayColor = "#A6E1FF" onPress={() => navigation.navigate("Resource List")} style={styles.button}>
                <Text style= {styles.buttonText}>Yes</Text>
              </TouchableHighlight> 
              <TouchableHighlight underlayColor = "#A6E1FF" onPress={() => navigation.navigate("Resource List")} style={styles.button}>
                  <Text style= {styles.buttonText}>No</Text>
              </TouchableHighlight>
        </View>
        <View style={{top: 50}}>
        <Text style = {styles.text}>2. Do you need safety planning?</Text>
              <TouchableHighlight underlayColor = "#A6E1FF" onPress={() => navigation.navigate("Resource List")} style={styles.button}>
                <Text style= {styles.buttonText}>Yes</Text>
              </TouchableHighlight> 
              <TouchableHighlight underlayColor = "#A6E1FF" onPress={() => navigation.navigate("Resource List")} style={styles.button}>
                  <Text style= {styles.buttonText}>No</Text>
              </TouchableHighlight>
          </View>
        </View>
        </View>
    );
    
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0066BB',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0,
      paddingTop: 100
    },
    topText: {
      fontSize: 20,
      color: "#FFF",
      bottom: 70,
      alignSelf: "center",
      textAlign: 'center'
    },
    text: {
      color: "#003C98",
      top: 34,
      left: 40,
      fontWeight: "bold",
      fontSize: 16
    },
    button: {
      top: 55,
      height:45,
      margin: 3,
      width: 280,
      borderRadius: 64,
      alignSelf: 'center',
      backgroundColor: "#F8F8F8",
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: "#D6D6D6",
      borderWidth: 1
    },
    bottomContainer: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    image: {
      height: 20,
      width: 20
    },
    buttonText: {
      color: "#000",
      alignSelf: 'center'
    }
  });

export default YesNoQuestionScreen;