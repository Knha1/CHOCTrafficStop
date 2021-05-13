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
} from "react-native";

import colors from "../../config/colors";
import { readData } from "../../utils/DataHandler";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Text style={[styles.title, textColor]}>{item.title}</Text>
);

function ResourceListScreen({ navigation }) {
	// State variable to show loading screen if resources aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource list
	const [data, setData] = useState([]);

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
					<Text style={styles.header}>Resources for You</Text>
					<Text style={styles.subtext}>
						Based on your survey results, here are some resources that might be
						helpful to you.
					</Text>
					<TouchableOpacity style={styles.button}>
						<Text style={{ color: "white" }}>Review and Edit My Answers</Text>
					</TouchableOpacity>
					<FlatList
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
													onPress={() =>
														navigation.navigate("Resource Details", {
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
});

export default ResourceListScreen;
