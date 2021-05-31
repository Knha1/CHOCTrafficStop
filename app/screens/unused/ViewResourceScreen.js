import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	Modal,
	Linking,
	Image,
	TouchableOpacity,
} from "react-native";
// import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";
import backArrowWhite from "../../assets/backArrowWhite.png";
import edit from "../../assets/edit.png";

function ViewResourceScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Image style={styles.backArrow} source={backArrowWhite}></Image>
			<View style={styles.bottomContainer}>
				<View>
					<Text style={styles.text}>Getting Enough Sleep</Text>
					<TouchableOpacity
						style={styles.iconButton}
						onPress={() => navigation.navigate("Edit Resource")}
					>
						<Image
							style={{ width: 25, height: 25, alignSelf: "center" }}
							source={edit}
						></Image>
					</TouchableOpacity>

					<Text style={styles.text3}>SLEEP</Text>
					<Text style={styles.text2}>Organization: CHOC</Text>
					<Text style={styles.text2}>Availability: 24/7; Online Resource</Text>
					<Text style={styles.text2}>Phone Number: 714-997-3000</Text>
					<Text style={styles.text2}>Address: n/a</Text>
					<Text
						style={styles.text2}
						onPress={() =>
							Linking.openURL(
								"https://kidshealth.org/CHOC/en/teens/how-much-sleep.html"
							)
						}
					>
						Website: https://kidshealth.org/CHOC/en/teens/how-much-sleep.html
					</Text>
					<Text style={styles.description}>
						Getting Enough Sleep provides tips for sleeping better at night...
						Nulla ultrices sed commodo in id arcu iaculis in urna.{"\n"}
						{"\n"}
						Est, massa tristique nunc egestas urna commodo fames duis. Aliquam
						curabitur congue vel lectus ornare risus lectus. Tortor, sed sed
						dictum sed tellus amet. Dictum massa elementum sagittis iaculis
						proin.
					</Text>
				</View>
				<View
					style={{
						position: "absolute",
						bottom: "7%",
						alignContent: "center",
						alignSelf: "center",
					}}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate("Statistics Details")}
						style={styles.deleteButton}
					>
						<Text style={{ color: "white" }}>Delete Resource</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
	iconButton: {
		position: "absolute",
		left: "78%",
		top: "10%",
		borderColor: "rgba(0,0,0,0.2)",
		justifyContent: "center",
		width: 55,
		height: 55,
		backgroundColor: "#d8d8d8",
		borderRadius: 50,
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
		marginTop: 5,
	},
	text3: {
		fontSize: 16,
		color: "black",
		top: 30,
		left: 40,
	},
	description: {
		fontSize: 14,
		width: 320,
		left: 40,
		top: 75,
	},
	deleteButton: {
		position: "absolute",
		bottom: "15%",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		backgroundColor: "#A32E2E",
		borderRadius: 30,
		height: 45,
		width: 340,
	},
});

export default ViewResourceScreen;
