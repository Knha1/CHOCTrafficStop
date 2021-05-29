import React, { useState } from "react";
import { useEffect } from "react";
import {
	Text,
	ScrollView,
	SafeAreaView,
	StyleSheet,
	SectionList,
	FlatList,
	TouchableOpacity,
	View,
	ActivityIndicator,
	TouchableHighlight,
} from "react-native";

import colors from "../../config/colors";
import { storeData, readData } from "../../utils/DataHandler";
import { firebase } from "../../firebase/config";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Text style={[styles.title, textColor]}>{item.title}</Text>
);

function ResourceResultsScreen({ route, navigation }) {
	const [resultText, setResultText] = useState(
		"Based on your survey results, here are some resources that might be helpful to you."
	);
	var filter = route.params;
	var titleText = "Resources for you";
	const tags = filter["tags"];
	console.log(tags);
	const prevScreen = filter["prevScreen"];
	// Change result text if the survey was empty
	if (prevScreen == "empty survey") {
		setResultText("No answers recorded, showing all resource.");
	} else if (prevScreen == "youth services") {
		titleText = "Youth Support Resources";
		resultText = null;
	} else {
		if (prevScreen == "filledSurvey" && tags) storeData("previousTags", tags);
	}
	// State variable to show loading screen if resources aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource list
	const [data, setData] = useState([]);
	var filterTags = [];

	for (var o in tags) {
		// Goes through each answer's list of tags
		if (tags[o] != null) {
			for (var j = 0; j < tags[o].length; j++) {
				if (!(tags[o][j].trim in filterTags)) {
					// If the tag hasn't been seen
					filterTags.push(tags[o][j].trim());
				}
			}
		}
	}

	// Review and Edit Survey Answers
	const header = () => {
		// TODO: fix footer, button isn't pressable
		if (prevScreen == "home" || prevScreen == "youth services") {
			return null;
		} else {
			return (
				<TouchableOpacity
					style={styles.button}
					// onPress={() => navigation.navigate("Home")}
					onPress={() => navigation.goBack()}
					// TODO: Remove navigation to home -- temp for testing
				>
					<Text style={{ color: "white" }}>Review and Edit My Answers</Text>
				</TouchableOpacity>
			);
		}
	};

	const footer = () => {
		// TODO: fix footer, button isn't pressable
		if (prevScreen == "filled survey" || prevScreen == "empty survey") {
			return (
				<TouchableHighlight
					underlayColor="#A6E1FF"
					style={styles.submitButton}
					onPress={() => navigation.navigate("Home")}
				>
					<Text style={{ color: "#FFF" }}>RETURN TO HOME</Text>
				</TouchableHighlight>
			);
		} else {
			return null;
		}
	};

	useEffect(() => {
		readData("resources")
			.then((resources) => {
				// Load 'resources' from AsyncStorage
				var resources = JSON.parse(resources);
				// Sort resources by category
				resources = resources.sort((a, b) =>
					a.category > b.category ? 1 : -1
				);

				var currentCategory = "";
				var categoryIndex = 0;
				var firstCatFound = false;
				var sections = [];

				for (var i = 0; i < resources.length; i++) {
					// If there's a new category, push a new category title + innerData

					var validResource = false;
					if (
						prevScreen == "filled survey" ||
						prevScreen == "home" ||
						prevScreen == "youth services"
					) {
						for (var j = 0; j < resources[i].tags.length; j++) {
							if (filterTags.includes(resources[i].tags[j])) {
								// console.log("FOUND: " + resources[i].tags[j]);
								validResource = true;
							}
						}
					}

					// If the survey was empty, add all resources
					else if (prevScreen == "empty survey") {
						validResource = true;
					}
					if (validResource == true) {
						if (resources[i].category != currentCategory) {
							// Skip the first case, only go to next category for every new category encountered after

							if (firstCatFound == false) {
								// CHANGED: Instead of checking for i=0, just check if this is the first category
								firstCatFound = true;
							} else {
								categoryIndex++;
							}
							currentCategory = resources[i].category;
							sections.push({
								title: currentCategory,
								innerData: [
									{
										name: resources[i].name,
										description: resources[i].description,
										resource_id: resources[i].resource_id,
										tags: resources[i].tags,
									},
								],
							});
						}
						// If category is the same, add to innerData
						else {
							sections[categoryIndex].innerData.push({
								name: resources[i].name,
								description: resources[i].description,
								resource_id: resources[i].resource_id,
								tags: resources[i].tags,
							});
						}
					}
				}
				if (firstCatFound == false) {
					setResultText("No results currently match your answers.");
				}
				setData(sections);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	return (
		// TODO: Fix nesting of ScrollView and FlatList --> later performance issues
		// TODO: Change nested FlatList + FlatList into SectionList
		<View>
			{isLoading ? (
				// If still loading
				<ActivityIndicator size="small" color="#0000ff" />
			) : (
				// If done loading
				<ScrollView>
					<Text style={styles.header}>{titleText}</Text>
					<Text style={styles.subtext}>{resultText}</Text>
					<FlatList
						ListHeaderComponent={header}
						ListFooterComponent={footer}
						data={data} // Loading in data from useState variable
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => {
							const color = "black";
							const backgroundColor = "white";
							return (
								<View>
									<View>
										<Text style={styles.title}>{item.title}</Text>
									</View>

									<FlatList
										data={item.innerData}
										keyExtractor={(item, index) => index.toString()}
										renderItem={({ item: innerData, index }) => (
											<View style={styles.cards}>
												<TouchableOpacity
													style={styles.links}
													onPress={() => {
														// TODO: may conflict if multiple devices access and update num_data at the same time
														firebase
															.database()
															.ref()
															.child("data")
															.child("num_data")
															.get()
															.then((snapshot) => {
																if (snapshot.exists()) {
																	var num_data = snapshot.val() + 1;

																	const date = new Date();
																	// Add 1 to month since getMonth() returns 0-11
																	const month = date.getMonth() + 1;
																	const year = date.getFullYear();

																	readData("user_id").then((patient_id) => {
																		readData("regCode").then((regCode) => {
																			firebase
																				.database()
																				.ref()
																				.child("data/" + num_data)
																				.set({
																					data_id: num_data,
																					month: month,
																					patient_id: parseInt(patient_id),
																					resource_id: parseInt(
																						innerData.resource_id
																					),
																					year: year,
																				});
																		});
																	});

																	// Update num_data count
																	firebase
																		.database()
																		.ref()
																		.child("data/num_data")
																		.set(num_data);
																} else {
																	console.log(
																		"No 'num_data' variable under 'data' found."
																	);
																}
															});
														navigation.navigate("Resource Details", {
															resource_id: innerData.resource_id,
														});
													}}
												>
													<Text style={styles.resourceTitle}>
														{innerData.name}
													</Text>
													<Text>{innerData.description}</Text>
												</TouchableOpacity>
											</View>
										)}
									/>
								</View>
							);
						}}
					/>
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9F9F9",
	},
	header: {
		color: "#003C98",
		alignSelf: "center",
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 12,
	},
	subtext: {
		fontSize: 14,
		textAlign: "center",
		alignSelf: "center",
		width: 330,
		paddingBottom: 15,
		color: "#585858",
	},
	links: {
		paddingLeft: 10,
		paddingBottom: 20,
		paddingTop: 10,
	},
	cards: {
		backgroundColor: "white",
		paddingBottom: 10,
		borderRadius: 15,
		margin: 5,
		width: "87%",
		alignSelf: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
	},
	title: {
		color: "#000",
		alignSelf: "flex-start",
		padding: 10,
		paddingLeft: 20,
		fontSize: 16,
	},
	resourceTitle: {
		color: "#003C98",
	},
	button: {
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		elevation: 2,
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		backgroundColor: "#0066BB",
		borderRadius: 30,
		height: 45,
		width: 340,
		marginBottom: 15,
	},
	submitButton: {
		// top: 50,
		marginTop: 25,
		marginBottom: 50,
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

export default ResourceResultsScreen;
