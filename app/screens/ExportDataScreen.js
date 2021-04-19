import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../config/colors";

function ExportDataScreen({ navigation }) {
	return (
        <View style={{padding: 10}}>

        <Text>File Name: </Text>
        <TextInput 
        style={{height: 40}}
        placeholder = "File Name" />
		<View style ={{marginTop: 10, margin:5}}/>
		<Text>File Type: </Text>
		<DropDownPicker
			items={[
				{label: '.pdf', value: 'pdf'},
				{label: '.docx', value: 'docx'},
				{label: '.txt', value: 'txt'},
				{label: '.odt', value: 'odt'},
			]}
		/>

        <View style ={{marginTop: 10, margin:5}}>
        <Button
          title="Export Data"
          onPress={() =>
            navigation.navigate('Admin Home')
          }
        />
        </View>

        <View style ={{marginTop: 10, margin:5}}>
        <Button
          title="Cancel"
		  color = "grey"
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

export default ExportDataScreen;
