import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	View,
	KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { firebase } from "../../firebase/config";
import { storeData, readData } from "../../utils/DataHandler.js";

/**
 * Login screen with optional registration code for patients
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function LoginScreen({ navigation }) {
	const [text, setText] = useState("");

	useEffect(() => {
		// Auto-navigate to home screen if already logged in
		readData("log").then(
			function (value) {
				var loggedIn = value;
				if (loggedIn == "User") {
					navigation.navigate("Home");
				}
			},
			function (err) {
				console.log(err);
			}
		);
	}, []);

	return (
		<LinearGradient
			colors={["#0658BC", "#489CAB"]}
			locations={[0, 0.9]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
		>
			<KeyboardAvoidingView style={styles.container} behavior="height">
				<View style={styles.bottomContainer}>
					<Text
						style={{
							color: "#003C98",
							paddingTop: 40,
							fontSize: 20,
							alignSelf: "flex-start",
							paddingLeft: 36,
						}}
					>
						Get Started
					</Text>
					<TextInput
						style={{
							margin: 40,
							borderRadius: 5,
							padding: 5,
							paddingLeft: 15,
							borderWidth: 1.0,
							borderColor: "#D1D1D1",
						}}
						autoCapitalize="characters"
						placeholder="Enter Registration Code (Optional)"
						onChangeText={(text) => setText(text)}
					/>
					<TouchableOpacity
						style={styles.button}
						title="Login"
						onPress={() => {
							var regCode = text.toUpperCase();
							var validCode = false;
							firebase
								.database()
								.ref()
								.child("reg_codes")
								.get()
								.then((snapshot) => {
									if (snapshot.exists()) {
										// Checks if registration code is valid
										for (var i = 0; i < snapshot.val().length; i++) {
											if (regCode == snapshot.val()[i]) {
												storeData("regCode", regCode); // Store registration code locally
												validCode = true;
												break;
											}
										}
									}
								})
								.then(() => {
									// If code isn't valid, set it to 'GUEST'
									if (regCode.length == 0 || validCode == false) {
										regCode = "GUEST";
										storeData("regCode", regCode);
									}
								});
							storeData("log", "User");

							// Grab the num_patients count on DB
							firebase
								.database()
								.ref()
								.child("patient")
								.child("num_patients")
								.get()
								.then((snapshot) => {
									if (snapshot.exists()) {
										var newPatientId = snapshot.val() + 1;
										storeData("user_id", newPatientId);
										// Update the num_patients count on DB
										firebase
											.database()
											.ref()
											.child("patient/num_patients")
											.set(newPatientId);

										// Create a new patient w/ reg_code and patient_id on DB
										firebase
											.database()
											.ref()
											.child("patient/" + newPatientId)
											.set({ patient_id: newPatientId, reg_code: regCode });
									} else {
										console.log(
											"No /'num_patients/' variable under /'patient/' exists in the database"
										);
									}
								});
							navigation.navigate("Home");
						}}
					>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableOpacity>

					<Text
						style={{ color: "#003C98", alignSelf: "center", marginTop: 80 }}
						onPress={() => {
							navigation.navigate("Admin Login");
							storeData("log", "Admin");
						}}
					>
						Log In as Admin User
					</Text>
				</View>
			</KeyboardAvoidingView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	bottomContainer: {
		alignSelf: "stretch",
		flex: 1,
		top: 180,
		backgroundColor: "#fff",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
	},
	text: {
		color: "#003C98",
	},
	button: {
		position: "absolute",
		top: 180,
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		backgroundColor: "#0E4B9D",
		borderRadius: 30,
		height: 45,
		width: 340,
	},
	buttonText: {
		color: "#fff",
	},
});

export default LoginScreen;
