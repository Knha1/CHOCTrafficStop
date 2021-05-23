import React, { useEffect, useState } from "react";
import {
	ImageBackground,
	Linking,
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
	ActivityIndicator,
} from "react-native";
import backArrowWhite from "../../assets/backArrowWhite.png";

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import { readData } from "../../utils/DataHandler";

function ResourceDetailScreen({ route, navigation }) {
	var resource = route.params;
	const resource_id = resource["resource_id"];
	// State variable to show loading screen if resource details aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource details
	const [data, setData] = useState([]);

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
		<View>
			{isLoading ? (
				// If still loading
				<ActivityIndicator size="small" color="#0000ff" />
			) : (
				// If done loading
				<View style={styles.container}>
					<Text style={styles.topText}>Resource Details</Text>
					<Image
						style={styles.backArrow}
						source={backArrowWhite}
						onPress={() => navigation.navigate("Resource List")}
						// TODO: Check if navigating back works
					></Image>
					<View style={styles.bottomContainer}>
						<View>
							<Text style={styles.text}>{data["name"]}</Text>
							<Text style={styles.text3}>{data["category"]}</Text>
							<Text style={styles.text2}>
								Organization: {data["organization"]}
							</Text>
							<Text style={styles.text2}>
								Availability: {data["availability"]}
							</Text>
							<Text style={styles.text2}>
								Phone Number: {data["phone_num"]}
							</Text>
							<Text style={styles.text2}>Address: {data["address"]}</Text>
							<Text
								style={styles.text2}
								onPress={() => {
									Linking.openURL(data["website"]);
									// TODO: Check if URL opening works
								}}
							>
								Website: {data["website"]}
							</Text>
							<Text style={styles.text4}>{data["description"]}</Text>
						</View>
					</View>
				</View>
			)}
		</View>
	);
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0066BB",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 0,
		paddingTop: 100,
	},
	backArrow: {
		height: 34,
		width: 34,
		alignSelf: "flex-start",
		left: 30,
		bottom: 25,
	},
	skipToResultsText: {
		color: "#CAEDFF",
		fontSize: 14,
		position: "absolute",
		top: 96,
		paddingBottom: 100,
	},
	rectangle: {
		height: 4,
		width: 320,
		borderRadius: 10,
		position: "absolute",
		top: 80,
		backgroundColor: "#FFF",
	},
	topText: {
		fontSize: 20,
		color: "#FFF",
		bottom: 40,
		alignSelf: "center",
		textAlign: "center",
		alignItems: "center",
	},
	text: {
		color: "#003C98",
		top: 34,
		left: 40,
		fontWeight: "bold",
		fontSize: 24,
	},
	button: {
		top: 55,
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
	text2: {
		color: "black",
		top: 50,
		left: 40,
		fontSize: 14,
		width: 300,
	},
	text3: {
		fontSize: 16,
		color: "black",
		top: 30,
		left: 40,
	},
	text4: {
		fontSize: 14,
		width: 320,
		left: 40,
		top: 70,
	},
});

export default ResourceDetailScreen;
