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
import { RectButton } from "react-native-gesture-handler";
import bg from "../../assets/background.png";

function YesNoQuestionScreen({ route, navigation }) {
	const [isLoading, setLoading] = React.useState(true);
	const [data, setData] = useState([]);
	var category = route.params;
	// var finalTags = [];
	const category_name = category["category"];
	const [chosenTags, setChosenTags] = useState([]); // Tags for the resource list
	const [answeredQuestions, setAnsweredQuestions] = useState(0); // # of answered questions for progress bar
	const [totalQuestions, setTotalQuestions] = useState(0); // # of total questions for progress abr

	const footer = () => {
		// TODO: fix footer, button isn't pressable
		return (
			<TouchableHighlight
				underlayColor="#A6E1FF"
				style={styles.submitButton}
				onPress={() => {
					if (answeredQuestions >= 1) {
						navigation.navigate("Resource Results", {
							tags: chosenTags,
							prevScreen: "filled survey",
						});
					} else {
						navigation.navigate("Resource Results", {
							tags: chosenTags,
							prevScreen: "empty survey",
						});
					}
				}}
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
				for (var qIndex in questions) {
					if (questions[qIndex].category == category_name) {
						// If yes/no question
						if (questions[qIndex].type == "Yes/No") {
							sections.push({
								text: questions[qIndex].order + ". " + questions[qIndex].text,
								type: questions[qIndex].type,
								choices: [
									{ label: "Yes", tags: questions[qIndex].tags[1] },
									{ label: "No", tags: questions[qIndex].tags[2] },
								],
								order: questions[qIndex].order,
							});
						}
						// If Likert scale
						else {
							sections.push({
								text: questions[qIndex].order + ". " + questions[qIndex].text,
								type: questions[qIndex].type,
								choices: [
									{
										label: "1 " + questions[qIndex].answer_choices[1],
										tags: questions[qIndex].tags[1],
									},
									{
										label: "2 " + questions[qIndex].answer_choices[2],
										tags: questions[qIndex].tags[2],
									},
									{
										label: "3 " + questions[qIndex].answer_choices[3],
										tags: questions[qIndex].tags[3],
									},
									{
										label: "4 " + questions[qIndex].answer_choices[4],
										tags: questions[qIndex].tags[4],
									},
									{
										label: "5 " + questions[qIndex].answer_choices[5],
										tags: questions[qIndex].tags[5],
									},
								],
								order: questions[qIndex].order,
							});
						}
					}
				}
				setData(sections);
			})
			.then(() => {
				setTotalQuestions(data.length);
				// Fill the chosen tags list with temp values for tracking progress bar
				var chosen = {};
				for (var i = 0; i < data.length; i++) {
					chosen[i] = "none";
				}
				setChosenTags(chosen);
			})
			.then(() => {})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={bg}
				style={{
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%",
				}}
			>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={back} style={styles.backButton}></Image>
				</TouchableOpacity>
				<Text style={styles.topText}>{category_name} Survey</Text>
				{/* <View style={styles.rectangle}>
				<View style={progressBar()}></View>
			</View> */}
				<Text
					style={styles.skipToResultsText}
					onPress={() => {
						if (answeredQuestions >= 1) {
							navigation.navigate("Resource Results", {
								tags: chosenTags,
								prevScreen: "filled survey",
							});
						} else {
							navigation.navigate("Resource Results", {
								tags: chosenTags,
								prevScreen: "empty survey",
							});
						}
					}}
				>
					Skip to Results? ({answeredQuestions} / {totalQuestions})
				</Text>
				<View
					style={[
						styles.base,
						{ height: "70%", marginTop: 40, alignItems: "center" },
					]}
				>
					<View style={styles.bottomContainer}>
						<FlatList
							contentContainerStyle={{ paddingBottom: 100 }}
							data={data}
							keyExtractor={(item, index) => index.toString()}
							ListFooterComponent={footer}
							renderItem={({ item }) => {
								return (
									<View style={{ alignContent: "flex-start" }}>
										<Text style={styles.text}>{item.text}</Text>
										<RadioButtonRN
											data={item.choices}
											boxStyle={{ marginHorizontal: "10%" }}
											selectedBtn={(e) => {
												// finalTags[item.order] = e.tags;

												var tempChosen = chosenTags;
												var answerCount = 0;

												tempChosen[item.order - 1] = e.tags;

												// Update answer count if temp value is overriden by actual tags
												for (var ans in tempChosen) {
													if (tempChosen[ans] != "none") {
														answerCount++;
													}
												}

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
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonSpacing: {
		margin: 5,
	},
	skipToResultsText: {
		color: "#CAEDFF",
		fontSize: 16,
		// position: "absolute",
		marginTop: "2%",
		alignSelf: "center",
	},
	topText: {
		color: "white",
		alignSelf: "center",
		fontSize: 20,
		marginBottom: 12,
		position: "absolute",
		marginTop: "15%",
		width: 250,
		textAlign: "center",
	},
	text: {
		color: "#003C98",
		// width: "100%",
		marginHorizontal: "8%",
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 40,
	},
	base: {
		backgroundColor: "white",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
		width: "100%",
	},
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "15%",
	},
	submitButton: {
		marginTop: 50,
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
