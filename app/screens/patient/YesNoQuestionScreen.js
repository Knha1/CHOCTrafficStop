import React, { useState } from "react";
import {
	ImageBackground,
	SimpleSurvey,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	TouchableOpacity,
	Icon,
	TouchableHighlight,
	Image,
	ScrollView,
	// ==================================================
	// Add FlatList
	FlatList,
} from "react-native";
// ==================================================
// Add import vvv
import back from "../../assets/backArrowWhite.png";

var questions = [
	{
		question: "1. Do you have a safe place to stay?",
		answers: [
			{ option: "Yes" }, 
			{ option: "No" }],
	},
	{
		question: "2. Do you need safety planning?",
		answers: [
			{ option: "Yes" },
			{ option: "No" },
		],
	},
	{
		question: "3. Likert Scale Question",
		answers: [
			{ option: "(1) Great" }, 
			{ option: "(2) Good" },
			{ option: "(3) Okay" },
			{ option: "(4) Surviving" },
			{ option: "(5) Crisis" },
		],
	},
	{
		question: "4. Example Question",
		answers: [
			{option: "Yes"},
			{option: "No"}
		],
	},
	{
		question: "5. Example Question",
		answers: [
			{option: "Yes"},
			{option: "No"}
		],
	},
	{
		question: "6. Example Question",
		answers: [
			{option: "Yes"},
			{option: "No"}
		],
	}
	
];



const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Text style={styles.text}>{item.question}</Text>
	
);



function YesNoQuestionScreen({ navigation }) {
	const [value, setValue] = React.useState('first');
	const renderItem = ({ questions }) => {
		return (
			<Item
				item={questions.answers}
				onPress={() => (backgroundColor = "#3248a8")}
			/>

		)
	}

	const footer = () => {
		return (
			<TouchableHighlight
			underlayColor="#A6E1FF"
			style={styles.submitButton}
			onPress={() => navigation.navigate("Resource List")}>
				<Text style={{color: "#FFF"}}>SUBMIT SURVEY</Text>
			</TouchableHighlight>
		);
	  };
	
	return (

		<View style={styles.container}>
			{/* ==================================================
			*	Add TouchableOpacity
			 */}
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image source = {back} style = {styles.backButton}></Image>
			</TouchableOpacity>

			<Text style={styles.topText}>Safety and Security Survey</Text>
			<View style={styles.rectangle}></View>
			<Text style={styles.skipToResultsText}>Skip to Results?</Text>
			
			<View style={styles.bottomContainer}>

			
			<FlatList
			 	// contentContainerStyle={{ paddingBottom: 100 }}
				data={questions}
				keyExtractor={(item, index) => index.toString()}
				
				ListFooterComponent={footer}
				renderItem={({ item }) => {
					return (
							<View>
								<Text style={styles.text}>{item.question}</Text>
								<FlatList
								data={item.answers}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item: answers, index }) => (
									<View>
										<TouchableHighlight
											underlayColor="#A6E1FF"
											onPress={() => navigation.navigate("Resource List")}
											style={styles.button}>
											<Text style={styles.buttonText}>{answers.option}</Text>
										</TouchableHighlight>
									</View>
								)}
								/>
								
							</View>
					);
				}}
			/>
			
			</View>
		</View>
		
	);
}
// ==================================================
// I think you should just copy and paste this whole stylesheet. Was Kinda a mess
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0066BB",
		// alignItems: "center",
		//justifyContent: "flex-start",
		//padding: 0,
		paddingTop: 50,
	},
	skipToResultsText: {
		color: "#CAEDFF",
		fontSize: 14,
		position: "absolute",
		top: 130,
		marginBottom: 100,
		alignSelf: 'center'
	},
	rectangle: {
		height: 4,
		width: 320,
		borderRadius: 10,
		position: "absolute",
		top: 115,
		backgroundColor: "#FFF",
		alignSelf: 'center'
		
	},
	topText: {
		// fontSize: 20,
		// color: "#FFF",
		// bottom: 70,
		// alignSelf: "center",
		// textAlign: "center",
		// alignItems: "center",
		// paddingTop: 40,
		// position: "absolute"
		color: "white",
		alignSelf: "center",
		fontSize: 20,
		marginBottom: 12,
		position: "absolute",
		marginTop: 60
	},
	text: {
		color: "#003C98",
		//top: 50,
		left: 40,
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 40
	},
	button: {
		top: 20,
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
		marginTop: '20%',
	},
	buttonText: {
		color: "#000",
		alignSelf: "center",
	},
	submitButton: {
		top: 50,
		height: 45,
		margin: 3,
		width: 340,
		borderRadius: 64,
		alignSelf: "center",
		backgroundColor: "#0E4B9D",
		alignItems: "center",
		justifyContent: "center"
	},
	backButton: {
		resizeMode: "contain",
		width: 50,
		height: 50,
		alignSelf: 'flex-start',
		// position: 'absolute',
		// top: 0,
		// paddingBottom: '10%'
		// marginBottom: '2%',
		// marginLeft: '4%',
		// marginTop: '11%',
	},
});

export default YesNoQuestionScreen;
