import React, { useState } from "react";
import { useEffect } from "react";
import {
	Text,
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

// var resources = "";

// if (resources == undefined) {
// 	// Sort resources by category
// 	var sortedResources = resources.sort((a, b) =>
// 		a.category > b.category ? 1 : -1
// 	);

// 	var currentCategory = sortedResources[0].category;
// 	var sections = []; // TODO: rename later

// 	// Sections2 index tracker
// 	var index = 0;
// 	// Creating new object
// 	sections.push({
// 		title: sortedResources[0].category,
// 		innerData: [],
// 	});

// 	for (var i = 0; i < sortedResources.length; i++) {
// 		// If there's a new category, push a new category title + innerData
// 		if (sortedResources[i].category != currentCategory) {
// 			index++;
// 			currentCategory = sortedResources[i].category;
// 			sections.push({
// 				title: sortedResources[i].category,
// 				innerData: [],
// 			});
// 		}
// 		// If in current category, add to innerData
// 		else {
// 			// Test print
// 			console.log("NAME: " + sortedResources[i].name);

// 			sections[index].innerData.push({
// 				name: sortedResources[i].name,
// 				description: sortedResources[i].description,
// 				resource_id: sortedResources[i].resource_id,
// 			});
// 		}
// 	}
// 	// console.log("OUR WORK");
// 	// console.log(sections);

// ===== ANGIE'S SECTIONS =====
// var sections2 = [
// 	{
// 		title: "Sleep",
// 		innerData: [{ name: "RESOURCE 1" }, { name: "RESOURCE 2" }],
// 	},
// 	{
// 		title: "Coping",
// 		innerData: [{ name: "RESOURCE 1" }, { name: "RESOURCE 2" }],
// 	},
// 	{
// 		title: "Mindfulness",
// 		innerData: [
// 			{ name: "RESOURCE 1" },
// 			{ name: "RESOURCE 2" },
// 			{ name: "RESOURCE 3" },
// 		],
// 	},
// 	{
// 		title: "Relationships",
// 		innerData: [{ name: "RESOURCE 1" }, { name: "RESOURCE 2" }],
// 	},
// 	{
// 		title: "Health / Wellness",
// 		innerData: [
// 			{ name: "RESOURCE 1" },
// 			{ name: "RESOURCE 2" },
// 			{ name: "RESOURCE 3" },
// 		],
// 	},
// 	{
// 		title: "Food / Fitness",
// 		innerData: [
// 			{ name: "RESOURCE 1" },
// 			{ name: "RESOURCE 2" },
// 			{ name: "RESOURCE 3" },
// 		],
// 	},
// 	{
// 		title: "Other",
// 		innerData: [
// 			{ name: "RESOURCE 1" },
// 			{ name: "RESOURCE 2" },
// 			{ name: "RESOURCE 3" },
// 		],
// 	},
// ];
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
				// Load 'resources' from AsyncStorage, put in data useState
				console.log("Resources about to be stored in 'data':");
				console.log(JSON.parse(resources));
				setData(JSON.parse(resources));
			})
			.then(() => {
				// Load 'resources' from data useState now, sort and put into 'sections'
				console.log("Loading resources in 'data': ");
				console.log({ data });
				var resources = { data };
				// Sort resources by category
				resources = resources["data"];
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
						// console.log("same category; index = ", categoryIndex);
						// console.log("pulling: " + JSON.stringify(resources[categoryIndex]));
						sections[categoryIndex].innerData.push({
							name: resources[i].name,
							description: resources[i].description,
							resource_id: resources[i].resource_id,
						});
					}
				}
				setData(sections);
				console.log(sections);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	// const Item = ({ title }) => {
	// 	<View>
	// 		<Text>{title}</Text>;
	// 	</View>;
	// };

	// const renderItem = ({ item }) => <Item title={item.title} />;

	return (
		<View>
			{isLoading ? (
				// If still loading
				<ActivityIndicator size="small" color="#0000ff" />
			) : (
				// TODO: replace with Angie's FlatList UI
				<FlatList
					data={data}
					renderItem={({ item }) => <Text>{item.title}</Text>}
				/>
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
