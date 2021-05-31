import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { readData } from "../../utils/DataHandler.js";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import "react-native-gesture-handler";
// ASSET IMPORTS
import logo from "../../assets/Yoga_Leaf.png";

/**
 * Splash screen for app
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function WelcomeScreen({ navigation }) {
	// Auto-navigates the user to home screen if they've used the app before
	useEffect(() => {
		readData("log").then(
			function (value) {
				var loggedIn = value;

				if (loggedIn == "User") {
					navigation.navigate("Home");
				} else if (loggedIn == "Admin") {
					navigation.navigate("Admin Home");
				}
			},
			function (err) {
				console.log(err);
			}
		);
	}, []);

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["#0658BC", "#489CAB"]}
				locations={[0, 0.9]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
			>
				<Image source={logo} style={styles.image} />
				<Text></Text>
				<Text
					style={{
						color: "#fff",
						top: 165,
						left: 34,
						fontSize: hp("3.5%"),
						textAlign: "left",
					}}
				>
					Welcome to{"\n"}ConnecTeen
				</Text>
				<Text
					style={{
						color: "#fff",
						top: 180,
						left: 34,
						fontSize: hp("2%"),
						textAlign: "left",
						width: 250,
					}}
				>
					Get help finding resources, tracking your mood, and more.{" "}
				</Text>
				<TouchableOpacity
					style={styles.button}
					color="#f2f"
					title="Get Started"
					onPress={() => navigation.navigate("Login")}
				>
					<Text style={styles.buttonText}>Get Started</Text>
				</TouchableOpacity>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 20,
		paddingTop: 60,
	},
	text: {
		color: "#fff",
		paddingLeft: 20,
	},
	button: {
		position: "absolute",
		bottom: 50,
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		borderRadius: 30,
		height: 45,
		width: 340,
	},
	image: {
		width: 69,
		height: 84,
		position: "absolute",
		top: 85,
		left: 34,
	},
	buttonText: {
		color: "#003C98",
	},
});

export default WelcomeScreen;
