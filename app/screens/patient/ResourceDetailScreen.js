import React from "react";
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
} from "react-native";

import colors from "../../config/colors";
import bg from "../../assets/background.png";

function ResourceDetailScreen({ route, navigation }) {
	var resource = route.params;
	const resource_id = resource["resource_id"];

	for (var i = 0; i < global.resources.length; i++) {
		if (global.resources[i].resource_id == resource_id) {
			var current_resource = global.resources[i];
			break;
		}
	}

	console.log(current_resource);

	return (
		<View style={styles.container}>
			<Text style={styles.topText}>Resource Details</Text>
			<View style={styles.rectangle}></View>
			<View style={styles.bottomContainer}>
				<View>
					<Text style={styles.text}>{current_resource["title"]}</Text>
					<Text style={styles.text2}>
						Category: {current_resource["category"]}
					</Text>
					<Text style={styles.text2}>
						Description: {current_resource["description"]}
					</Text>
					<Text style={styles.text2}>Organization: CHOC</Text>
					<Text style={styles.text2}>
						Availability: {current_resource["availability"]}
					</Text>
					<Text style={styles.text2}>
						Phone Number: {current_resource["phone_num"]}
					</Text>
					<Text style={styles.text2}>
						Address: {current_resource["address"]}
					</Text>
					<Text style={styles.text2}>
						Website: {current_resource["website"]}
					</Text>
				</View>
			</View>
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
		bottom: 70,
		alignSelf: "center",
		textAlign: "center",
		alignItems: "center",
	},
	text: {
		color: "#003C98",
		top: 34,
		left: 40,
		fontWeight: "bold",
		fontSize: 16,
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
		top: 34,
		left: 40,
		fontSize: 14,
	},
});

export default ResourceDetailScreen;
