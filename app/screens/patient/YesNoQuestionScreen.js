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
import back from "../../assets/backArrowWhite.png";
import { readData } from "../../utils/DataHandler";
import RadioButtonRN from "radio-buttons-react-native";
import logo from "../../assets/logo_nobg.png";

function YesNoQuestionScreen({ route, navigation }) {
	const [isLoading, setLoading] = React.useState(true);
	const [data, setData] = useState([]);
	var category = route.params;
	var finalTags = [];
	const category_name = category["category"];
	const chosen = {}; //
	const [chosenTags, setChosenTags] = useState([]); // Tags for the resource list
	const [answeredQuestions, setAnsweredQuestions] = useState(0); // # of answered questions for progress bar
	const [totalQuestions, setTotalQuestions] = useState(0); // # of total questions for progress abr

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

	async function updateAnswers(qNum) {}

	useEffect(() => {
		readData("questions")
			.then((questions) => {
				// Load 'questions' from AsyncStorage
				var questions = JSON.parse(questions);
				var sections = [];
				for (var i = 0; i < questions.length; i++) {
					if (questions[i].category == category_name) {
						// If yes/no question
						console.log("Type of question: " + questions[i].type);
						if (questions[i].type == "Yes/No") {
							sections.push({
								text: questions[i].order + ". " + questions[i].text,
								type: questions[i].type,
								choices: [
									// TODO: change tags' value to tags
									{ label: "Yes", tags: questions[i].tags[1] },
									{ label: "No", tags: questions[i].tags[2] },
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
										tags: questions[i].tags[1],
									},
									{
										label: "2 " + questions[i].answer_choices[2],
										tags: questions[i].tags[2],
									},
									{
										label: "3 " + questions[i].answer_choices[3],
										tags: questions[i].tags[3],
									},
									{
										label: "4 " + questions[i].answer_choices[4],
										tags: questions[i].tags[4],
									},
									{
										label: "5 " + questions[i].answer_choices[5],
										tags: questions[i].tags[5],
									},
								],
								order: questions[i].order,

								// Add more to this later on
							});
						}
					}
					setData(sections);
				}
			})
			.then(() => {
				setTotalQuestions(data.length);
				for (var i = 0; i < data.length; i++) {
					chosen[i] = "nonex";
				}
			})
			.then(() => {
				setChosenTags(chosen);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image source={back} style={styles.backButton}></Image>
			</TouchableOpacity>
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
				Skip to Results? ({answeredQuestions} / {totalQuestions})
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

										var tempChosen = chosenTags;
										var answerCount = 0;

										tempChosen[item.order - 1] = e.tags;
										for (var ans in tempChosen) {
											if (tempChosen[ans] != "nonex") {
												answerCount++;
											}
										}

										console.log(tempChosen);

										setChosenTags(tempChosen);
										setAnsweredQuestions(answerCount);
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
		alignSelf: "center",
	},
	rectangle: {
		height: 4,
		width: 320,
		borderRadius: 10,
		position: "absolute",
		top: 115,
		backgroundColor: "#FFF",
		alignSelf: "center",
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
		marginTop: 60,
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
		marginTop: "20%",
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
	backButton: {
		resizeMode: "contain",
		width: 50,
		height: 50,
		alignSelf: "flex-start",
		// position: 'absolute',
		// top: 0,
		// paddingBottom: '10%'
		// marginBottom: '2%',
		// marginLeft: '4%',
		// marginTop: '11%',
	},
});

export default YesNoQuestionScreen;
