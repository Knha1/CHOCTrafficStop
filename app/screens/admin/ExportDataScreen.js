import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, TextInput, ImageBackground } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import { TouchableOpacity } from "react-native-gesture-handler";

function ExportDataScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<ImageBackground source={bg} style={{overflow: "hidden",resizeMode: "stretch",height: "100%", width: "100%"}}>
				<View style={[styles.base]}>
					<Text style={{
							marginTop: "10%",
							fontSize: 26,
							alignSelf: "flex-start",
							textAlign: "left",
							marginLeft: "10%",
							marginBottom: "5%",
							color: "#003C98",
							fontWeight: 'bold'

						}}>
							Export Data 
					</Text>
					<Text style={styles.subheader}>File Name: </Text>
					<TextInput style={styles.baseText} placeholder = " File Name" />
					<Text style={styles.subheader}>File Format: </Text>
					<DropDownPicker
						containerStyle={{marginHorizontal:"10%", height: "5%"}}
						itemStyle={{marginHorizontal: "10%", justifyContent: "flex-start"}}
						items={[
							{label: '.pdf', value: 'pdf'},
							{label: '.docx', value: 'docx'},
							{label: '.txt', value: 'txt'},
							{label: '.odt', value: 'odt'},
						]}
					/>

					<View style={{flexDirection: "row", position: "absolute", bottom: 30, left: 40 }}>
						<TouchableOpacity onPress={() =>navigation.navigate('Statistics Home')} 
						style={{
							backgroundColor: "#DFDFDF",
							alignSelf: "center",
							borderRadius: 20,
							padding: 15,
							marginHorizontal: 10
						}}>
							<Text style={[styles.buttonText, {color: "#003C98"}]}>Cancel</Text>

						</TouchableOpacity>
						<TouchableOpacity onPress={() =>navigation.navigate('Statistics Home')}
						style={{
							backgroundColor: "#0E4B9D",
							alignSelf: "center",
							borderRadius: 20,
							padding: 15,
							marginHorizontal: 10
						}}>
							<Text style={[styles.buttonText, {color: "#FFFFFF"}]}>Export Data</Text>
						</TouchableOpacity>
					</View>
						


				</View>
			</ImageBackground>
		</View>
    //     <View style={{padding: 10}}>

    //     <Text>File Name: </Text>
    //     <TextInput 
    //     style={{height: 40}}
    //     placeholder = "File Name" />
	// 	<View style ={{marginTop: 10, margin:5}}/>
	// 	<Text>File Type: </Text>
	// 	<DropDownPicker
	// 		items={[
	// 			{label: '.pdf', value: 'pdf'},
	// 			{label: '.docx', value: 'docx'},
	// 			{label: '.txt', value: 'txt'},
	// 			{label: '.odt', value: 'odt'},
	// 		]}
	// 	/>

    //     <View style ={{marginTop: 10, margin:5}}>
    //     <Button
    //       title="Export Data"
    //       onPress={() =>
    //         navigation.navigate('Admin Home')
    //       }
    //     />
    //     </View>

    //     <View style ={{marginTop: 10, margin:5}}>
    //     <Button
    //       title="Cancel"
	// 	  color = "grey"
    //       onPress={() =>
    //         navigation.navigate('Admin Home')
    //       }
    //     />
    //     </View>
    //    </View>
    );
    
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	base: {
		marginTop: "20%",
		backgroundColor: 'white',
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1
	},
	baseText:{
		marginLeft: "10%",
		marginRight: "10%",
		marginBottom: "5%",
		height: "5%",
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#D1D1D1",
		backgroundColor: "white"
	},
	subheader:{
		marginLeft: "10%",
		marginBottom: "1%"
	},
	buttonText:{
		fontSize: 16,
		textAlign: "center",
		minWidth: "30%"
	}
});

export default ExportDataScreen;
