import React, { useState, useEffect } from "react";
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
	FlatList,
	ActivityIndicator,
} from "react-native";
import { readData } from "../../utils/DataHandler";
import RadioButtonRN from "radio-buttons-react-native";
import logo from "../../assets/logo_nobg.png";

function YesNoQuestionScreen({ route, navigation }) {
	const [isLoading, setLoading] = React.useState(true);
	const [data, setData] = useState([]);
	var category = route.params;
	var finalTags = [];
	const category_name = category["category"];

	const footer = () => {
		return (
			<TouchableHighlight
				underlayColor="#A6E1FF"
				style={styles.submitButton}
				onPress={() =>
					navigation.navigate("Resource List", {
						tags: finalTags,
					})
				}
			>
				<Text style={{ color: "#FFF" }}>SUBMIT SURVEY</Text>
			</TouchableHighlight>
		);
	};

	useEffect(() => {
		readData("questions")
			.then((questions) => {
				console.log("loading questions");
				// Load 'questions' from AsyncStorage
				var questions = JSON.parse(questions);
				var sections = [];
				for (var i = 0; i < questions.length; i++) {
					console.log("loading each question");
					if (questions[i].category == category_name) {
						// If yes/no question
						console.log("Type of question: " + questions[i].type);
						if (questions[i].type == "Yes/No") {
							sections.push({
								text: questions[i].order + ". " + questions[i].text,
								type: questions[i].type,
								choices: [
									// TODO: change tags' value to tags
									{ label: "Yes", tags: "tags for yes" },
									{ label: "No", tags: "tags for no" },
								],
								order: questions[i].order,

								// Add more to this later on
							});
						}
						// If Likert scale
						else {
							sections.push({
								text: questions[i].order + ". " + questions[i].text,
								type: questions[i].type,
								choices: [
									// TODO: change tags' value to tags
									{
										label: "1 " + questions[i].answer_choices[1],
										tags: "tags for 1",
									},
									{
										label: "2 " + questions[i].answer_choices[2],
										tags: "tags for 2",
									},
									{
										label: "3 " + questions[i].answer_choices[3],
										tags: "tags for 3",
									},
									{
										label: "4 " + questions[i].answer_choices[4],
										tags: "tags for 4",
									},
									{
										label: "5 " + questions[i].answer_choices[5],
										tags: "tags for 5",
									},
								],
								order: questions[i].order,

								// Add more to this later on
							});
						}
					}
					console.log(sections);
					setData(sections);
				}
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	return (
		<View style={styles.container}>
			<Text style={styles.topText}>{category_name} Survey</Text>
			<View style={styles.rectangle}></View>
			<Text
				style={styles.skipToResultsText}
				onPress={() =>
					navigation.navigate("Resource List", {
						tags: finalTags,
					})
				}
			>
				Skip to Results?
			</Text>
			<View style={styles.bottomContainer}>
				<FlatList
					contentContainerStyle={{ paddingBottom: 100 }}
					data={data}
					keyExtractor={(item, index) => index.toString()}
					ListFooterComponent={footer}
					renderItem={({ item }) => {
						return (
							<View>
								<Text style={styles.text}>{item.text}</Text>
								<RadioButtonRN
									data={item.choices}
									selectedBtn={(e) => {
										finalTags[item.order] = e.tags;
										console.log(e.tags);
									}}
								/>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0066BB",
		alignItems: "center",
		//justifyContent: "flex-start",
		//padding: 0,
		paddingTop: 100,
	},
	skipToResultsText: {
		color: "#CAEDFF",
		fontSize: 14,
		position: "absolute",
		top: 130,
		paddingBottom: 100,
	},
	rectangle: {
		height: 4,
		width: 320,
		borderRadius: 10,
		position: "absolute",
		top: 115,
		backgroundColor: "#FFF",
	},
	topText: {
		fontSize: 20,
		color: "#FFF",
		bottom: 70,
		alignSelf: "center",
		textAlign: "center",
		alignItems: "center",
		paddingTop: 40,
	},
	text: {
		color: "#003C98",
		//top: 50,
		left: 40,
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 40,
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
		justifyContent: "center",
	},
});

export default YesNoQuestionScreen;
