import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, TextInput} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";

function AddResourceScreen({ navigation }) {
	return (
        <View style={{padding: 10}}>
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Add a Resource</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <View style ={{marginTop: 10, margin:5}}>


		<Text>Name:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter a name" />
        <Text>Address:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter an address" />
        <Text>Hours:</Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "Enter the hours" />
        <Text>Phone Number:</Text>
        <TextInput 
        style={{height: 40}}        
        placeholder = "Enter a phone number" />
        <Text>Website:</Text>
        <TextInput 
        style={{height: 40}}        
        placeholder = "Enter a website" />

		<Button
          title="Add Resource"
		  color = "red"
          onPress={() =>
            navigation.navigate('Admin Home')
          }
        />
        
        </View>
       </View>
    );
    
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg,
		alignItems: "center",
		justifyContent: "center",
	},
	emergency: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 30,
	},
	emergencyConfirm: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonSpacing: {
		margin: 5,
	},
	emergencyChoice: {
		flexDirection: "row",
	},
});

export default AddResourceScreen;