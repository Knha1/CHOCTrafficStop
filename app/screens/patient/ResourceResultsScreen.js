import React, { useState, useEffect } from "react";
import {
	Text,
	ScrollView,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	View,
	ActivityIndicator,
	TouchableHighlight,
	Image,
	Modal,
} from "react-native";
import { Linking } from "react-native";
import { storeData, readData } from "../../utils/DataHandler";
import { firebase } from "../../firebase/config";
// ASSET IMPORTS
import back from "../../assets/backArrowBlack.png";

/**
 * Displays a list of all resources
 * @param {object} route - Contains tags and screen name that was navigated from
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function ResourceResultsScreen({ route, navigation }) {
	// State variable to show loading screen if resources aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource list
	const [data, setData] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [hotlineModal, setHotlineModal] = useState(false);

	var resultText =
		"Based on your survey results, here are some resources that might be helpful to you.";
	var filter = route.params;
	const tags = filter["tags"];
	const prevScreen = filter["prevScreen"];
	var crisis = false;

	// Change result text if the survey was empty
	if (prevScreen == "empty survey") {
		resultText = "No answers recorded, showing all resources.";
	} else if (prevScreen == "youth services") {
		titleText = "Youth Support Resources";
		resultText = null;
	}

	// Parsing tags for use in filtering resources
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
		// Set flag if suicide hotline needs to be displayed
		if (filterTags.includes("suicide")) {
			crisis = true;
		}
	}

	// Review and Edit Survey Answers
	const header = () => {
		if (prevScreen == "home" || prevScreen == "youth services") {
			// Don't display "Review and Edit" button if navigating from youth services or home screen
			return null;
		} else if (crisis == true) {
			// Display suicide hotline button if tag detected
			return (
				<View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.goBack()}
					>
						<Text style={{ color: "white" }}>Review and Edit My Answers</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => setHotlineModal(true)}
						style={{
							alignSelf: "center",
							alignItems: "center",
							backgroundColor: "#A32E2E",
							width: "80%",
							padding: 5,
							borderRadius: 20,
							position: "absolute",
							bottom: "-20%",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 4,
							marginTop: 40,
							marginBottom: 15,
						}}
					>
						<Text style={{ color: "white" }}>CALL SUICIDE HOTLINE</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.goBack()}
				>
					<Text style={{ color: "white" }}>Review and Edit My Answers</Text>
				</TouchableOpacity>
			);
		}
	};

	const footer = () => {
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

	// Load in resources from local storage and sort them for display if tags match
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
				if (prevScreen == "filled survey" && firstCatFound == true) {
					storeData("previousTags", tags);
				} else if (firstCatFound == false) {
					setModalVisible(true);
				}
				setData(sections);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	return (
		<View>
			{isLoading ? (
				// If still loading
				<ActivityIndicator size="small" color="#0000ff" />
			) : (
				// If done loading
				<ScrollView>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Image source={back} style={styles.backButton}></Image>
					</TouchableOpacity>
					<Text style={styles.header}>Resources for You</Text>
					<Text style={styles.subtext}>{resultText}</Text>

					<Modal
						animationType="none"
						visible={hotlineModal}
						transparent={true}
						onRequestClose={() => {
							setHotlineModal(!hotlineModal);
						}}
					>
						<View
							style={[
								styles.container,
								{
									backgroundColor: "rgba(0,0,0,0.5)",
									justifyContent: "center",
								},
							]}
						>
							<View style={styles.emergencyConfirm}>
								<Text
									style={{
										textAlign: "center",
										marginBottom: 10,
										color: "#9C0000",
										fontWeight: "bold",
										fontSize: 24,
									}}
								>
									Warning!
								</Text>
								<Text
									style={{
										textAlign: "center",
										marginBottom: 20,
										marginHorizontal: "10%",
									}}
								>
									Would you like to dial the suicide hotline?
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-evenly",
									}}
								>
									<TouchableOpacity
										onPress={() => setHotlineModal(!hotlineModal)}
										style={{
											width: "40%",
											backgroundColor: "#D9D9D9",
											borderRadius: 20,
											padding: 10,
											textAlign: "center",
										}}
									>
										<Text style={{ color: "black", textAlign: "center" }}>
											Cancel
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => Linking.openURL(`tel:${18002738255}`)}
										style={{
											backgroundColor: "#A32E2E",
											width: "40%",
											alignItems: "center",
											borderRadius: 20,
											padding: 10,
										}}
									>
										<Text style={{ color: "white", textAlign: "center" }}>
											Yes
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Modal>
					{/* Pop-up for no resources found */}
					<Modal
						animationType="none"
						visible={modalVisible}
						transparent={true}
						onRequestClose={() => {
							setModalVisible(!modalVisible);
						}}
					>
						<View style={[styles.containerPopup]}>
							<View style={[styles.popup, { flexDirection: "row" }]}>
								<Text
									style={{
										textAlign: "center",
										marginVertical: 10,
										color: "white",
										// fontWeight: "bold",
										fontSize: 15,
										marginLeft: "10%",
									}}
								>
									No resources matched your responses.
								</Text>

								<TouchableOpacity
									onPress={() => setModalVisible(!modalVisible)}
									style={{
										borderRadius: 20,
										padding: 10,
									}}
								>
									<Text
										style={{
											color: "white",
											textAlign: "right",
											fontSize: 24,
											bottom: "75%",
											marginLeft: 10,
										}}
									>
										x
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
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
		marginBottom: 12,
		position: "absolute",
		marginTop: 40,
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
		marginBottom: 40,
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
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "11%",
	},
	containerPopup: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	popup: {
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 20,
		position: "absolute",
		bottom: "5%",
	},
	emergencyConfirm: {
		backgroundColor: "white",
		borderRadius: 20,
		marginHorizontal: "5%",
		paddingVertical: "5%",
	},
});

export default ResourceResultsScreen;
