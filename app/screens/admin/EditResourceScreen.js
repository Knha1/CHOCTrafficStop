import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, Linking, Image, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


import colors from "../../config/colors";
import backArrowWhite from "../../assets/backArrowWhite.png";
import edit from "../../assets/edit.png";

function EditResourceScreen({ navigation }) {
	//const [text, onChangeText] = React.useState("Getting Enough Sleep");

	return (
			<View style={styles.container}>
				<Image style={styles.backArrow} source={backArrowWhite}></Image>
				<ScrollView style={styles.bottomContainer}>
					<KeyboardAvoidingView
					behavior="height"
					style={{ flex: 1 }}
					enabled={true}>
						<Text style={styles.text}>Editing Resource</Text>

						<Text style = {styles.text3}>Title</Text>
						<TextInput
							style={styles.input}
							defaultValue = "Getting Enough Sleep"
						/>

						<Text style = {styles.text3}>Tags</Text>
						<TextInput
							style={styles.input}
							defaultValue = "SLEEP"
						/>

						<Text style = {styles.text3}>Organization</Text>
						<TextInput
							style={styles.input}
							defaultValue = "CHOC"
						/>

						<Text style = {styles.text3}>Availability</Text>
						<TextInput
							style={styles.input}
							defaultValue = "24/7; Online Resource"
						/>

						<Text style = {styles.text3}>Phone Number</Text>
						<TextInput
							style={styles.input}
							defaultValue = "714-997-3000"
						/>

						<Text style = {styles.text3}>Address</Text>
						<TextInput
							style={styles.input}
							defaultValue = "https://kidshealth.org/CHOC/en/teens/how-much-sleep.html"
						/>
						
						<Text style = {styles.text3}>Description</Text>
						<TextInput
							multiline={true}
							//textAlignVertical="center"
							style={styles.descriptionInput}
							defaultValue = "Getting Enough Sleep provides tips for sleeping better at night. Nulla ultrices sed commodo in id arcu iaculis in urna. Est, massa tristique nunc egestas urna commodo fames duis. Aliquam curabitur congue vel lectus ornare risus lectus. Tortor, sed sed dictum sed tellus amet. Dictum massa elementum sagittis iaculis proin."
						/>
						
					</KeyboardAvoidingView>
					

						<TouchableOpacity
							onPress={() => navigation.navigate("Statistics Details")}
							style={styles.cancelButton}>
							<Text style={{color: '#0E4B9D'}}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Statistics Details")}
							style={styles.saveButton}>
							<Text style={{color: 'white'}}>Save Changes</Text>
						</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0066BB",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 0,
		paddingTop: 100,
	},
	input: {
		height: 30,
		width: 300,
		left: 40,
		top: 34,
		fontSize: 18
	},
	descriptionInput: {
		width: 330,
		left: 40,
		top: 34,
		fontSize: 16
	},
	backArrow: {
		height: 34,
		width: 34,
		alignSelf: "flex-start",
		left: 30,
		bottom: 25,
	},
	skipToResultsText: {
		color: "#CAEDFF",
		fontSize: 14,
		position: "absolute",
		top: 96,
		paddingBottom: 100,
	},
	iconButton: {
		position: 'absolute',
		left: '78%',
		top: '10%',
		borderColor:'rgba(0,0,0,0.2)',
		justifyContent:'center',
		width:55,
		height:55,
		backgroundColor:'#d8d8d8',
		borderRadius:50,
	},
	rectangle: {
		height: 4,
		width: 320,
		borderRadius: 10,
		position: "absolute",
		top: 80,
		backgroundColor: "#FFF",
	},
	topText: {
		fontSize: 20,
		color: "#FFF",
		bottom: 40,
		alignSelf: "center",
		textAlign: "center",
		alignItems: "center",
	},
	text: {
		color: "#003C98",
		top: 34,
		left: 40,
		fontWeight: "bold",
		fontSize: 24,
	},
	button: {
		top: 55,
		height: 45,
		margin: 3,
		width: 280,
		borderRadius: 64,
		alignSelf: "center",
		backgroundColor: "#F8F8F8",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#D6D6D6",
		borderWidth: 1,
	},
	bottomContainer: {
		flex: 1,
		alignSelf: "stretch",
		backgroundColor: "#fff",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
	},
	buttonText: {
		color: "#000",
		alignSelf: "center",
	},
	text2: {
		color: "black",
		top: 50,
		left: 40,
		fontSize: 14,
		width: 300,
		marginTop: 5
	},
	text3: {
		fontSize: 16,
		color: "black",
		top: 38,
		left: 40,
		fontWeight: 'bold'
	},
	description: {
		fontSize: 14,
		width: 320,
		left: 40,
		top: 75,
	},
	cancelButton: {
		position: 'absolute',
		top: '85%',
		left: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderColor: "#0E4B9D",
		borderRadius: 30,
		borderWidth: 2,
		height: 45,
		width: 129,
	},
	saveButton: {
		position: 'absolute',
		top: '85%',
		left: 200,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#0E4B9D",
		borderRadius: 30,
		height: 45,
		width: 168
	}
});

export default EditResourceScreen;