import React, { useEffect, useState } from "react";
import {
	ImageBackground,
	Linking,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import { readData } from "../../utils/DataHandler";
// ASSET IMPORTS
import backArrowWhite from "../../assets/backArrowWhite.png";
import bg from "../../assets/background.png";

/**
 * Displays details (address, website etc.) for a specific resource
 * @param {object} route - Contains resource_id to load resource details from
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function ResourceDetailScreen({ route, navigation }) {
	var resource = route.params;
	const resource_id = resource["resource_id"];
	// State variable to show loading screen if resource details aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource details
	const [data, setData] = useState([]);

	// Load in details for the specified resource from local storage
	useEffect(() => {
		readData("resources")
			.then((resources) => {
				var resources = JSON.parse(resources);

				// Index of resource is resource_id - 1
				var current_resource = resources[resource_id - 1];

				// Set value to 'N/A' if detail isn't supplied
				for (var key in current_resource) {
					if (current_resource[key] == "") {
						current_resource[key] = "N/A";
					}
				}

				setData(current_resource);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	return (
		<View style={[styles.container]}>
			<ImageBackground
				source={bg}
				style={{
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%",
				}}
			>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={backArrowWhite} style={styles.backButton}></Image>
				</TouchableOpacity>
				<View
					style={[
						styles.base,
						{ height: "70%", padding: 20, alignItems: "flex-start" },
					]}
				>
					{isLoading ? (
						// If still loading
						<ActivityIndicator size="large" color="#0000ff" />
					) : (
						// If done loading
						<View style={styles.bottomContainer}>
							<View>
								<Text style={styles.categoryText}>{data["category"]}</Text>
								<Text style={styles.text}>{data["name"]}</Text>

								<Text style={styles.infoText}>
									Organization: {data["organization"]}
								</Text>
								<Text style={styles.infoText}>
									Availability: {data["availability"]}
								</Text>
								<Text style={styles.infoText}>
									Phone Number: {data["phone_num"]}
								</Text>
								<Text style={styles.infoText}>Address: {data["address"]}</Text>
								<Text
									style={{
										color: "blue",
										textDecorationLine: "underline",
										top: 20,
										marginTop: 5,
										//left: 35,
										fontSize: 16,
										width: 300,
									}}
									onPress={() => {
										Linking.openURL(data["website"]);
									}}
								>
									Website: {data["website"]}
								</Text>
								<Text style={styles.descriptionText}>
									{data["description"]}
								</Text>
							</View>
						</View>
					)}
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
	text: {
		color: "#003C98",
		top: 0,
		//left: 35,
		width: 300,
		fontWeight: "bold",
		fontSize: 24,
	},
	base: {
		backgroundColor: "#F1F2F2",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
		paddingTop: "10%",
		paddingLeft: "10%",
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
	infoText: {
		color: "black",
		top: 20,
		marginTop: 5,
		//left: 35,
		fontSize: 16,
		width: 300,
	},
	categoryText: {
		fontSize: 16,
		color: "black",
		//left: 35,
	},
	descriptionText: {
		fontSize: 16,
		width: 300,
		//left: 35,
		top: 60,
	},
});

export default ResourceDetailScreen;
