import React, { useState } from "react";
import { useEffect } from "react";
import {
	Text,
	ScrollView,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	View,
	ActivityIndicator,
	Image,
} from "react-native";
import { storeData, readData } from "../../utils/DataHandler";
// ASSET IMPORTS
import { firebase } from "../../firebase/config";
import back from "../../assets/backArrowBlack.png";

/**
 * Displays current list of resources for admins to view and edit
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function AdminResourceListScreen({ navigation }) {
	// State variable to show loading screen if resources aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource list
	const [data, setData] = useState([]);

	useEffect(() => {
		// Make sure latest list of resources is loaded in from Firebase, THEN read from asyncstorage
		firebase
			.database()
			.ref()
			.child("resource")
			.get()
			.then((snapshot) => {
				if (snapshot.exists()) {
					var tempResources = [];

					snapshot.forEach((child) => {
						// Ignore the num_resources variable, store the rest of the resource
						if (!Number.isInteger(child.val())) {
							tempResources.push({
								resource_id: child.val().resource_id,
								name: child.val().name,
								description: child.val().description,
								category: child.val().category,
								organization: child.val().organization,
								address: child.val().address,
								phone_num: child.val().phone_num,
								availability: child.val().availability,
								website: child.val().website,
								tags: child.val().tags,
								email: child.val().email,
							});
						}
					});
					storeData("resources", tempResources);
				} else {
					console.log("'resource' data retrieval from DB was unsuccessful.");
				}
			})
			.then(() => {
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
						var sections = [];

						for (var i = 0; i < resources.length; i++) {
							// If there's a new category, push a new category title + innerData
							if (resources[i].category != currentCategory) {
								// Skip first category index increment, avoid OOB error
								if (i != 0) {
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
								});
							}
						}
						setData(sections);
					})
					.catch((error) => console.error(error))
					.finally(() => setLoading(false));
			})
			.catch((err) => console.log(err));
	}, [isLoading]);

	return (
		<ScrollView>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image source={back} style={styles.backButton}></Image>
			</TouchableOpacity>
			<Text style={styles.header}>Resource List</Text>
			<Text style={styles.subtext}>
				Tap on a resource to view and edit its details.
			</Text>

			{isLoading ? (
				// Display loading icon if not done loading resource list
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<FlatList
					data={data}
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
												onPress={() =>
													navigation.navigate("Edit Resource", {
														resource_id: innerData.resource_id,
													})
												}
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
			)}
		</ScrollView>
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
		marginTop: "10%",
		position: "absolute",
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
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "11%",
	},
});

export default AdminResourceListScreen;
