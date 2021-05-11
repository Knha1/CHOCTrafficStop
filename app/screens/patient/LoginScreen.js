import React, { useState } from "react";
// import DataHandler from "../../utils/DataHandler";

import {
	ImageBackground,
	StyleSheet,
	Text,
	Rectangle,
	TouchableOpacity,
	TextInput,
	View,
	Button,
	KeyboardAvoidingView,
	ActivityIndicator,
} from "react-native";
import colors from "../../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import { firebase } from "../../firebase/config";
import { useEffect } from "react";
import {storeData, readData} from "../../utils/DataHandler.js"

function LoginScreen({ navigation }) {
	const [text, setText] = useState("");
	const [isLoading, setLoading] = useState(true);
	// const [data, setData] = useState([]);
	
	useEffect(() => {
		readData("log").then(
			function (value){
			var loggedIn = value;
			// console.log(loggedIn);
			
			if(loggedIn != null)
			{
				navigation.navigate("Home");
			}

			},
			function (err) {
				console.log(err);
				}
			).finally(() => setLoading(false));
		  }, []);

	return (
		
		<LinearGradient
			colors={["#0658BC", "#489CAB"]}
			locations={[0, 0.9]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
		>
			{isLoading ? <ActivityIndicator/> : (
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
							if (regCode.length == 0) {
								regCode = "GUEST";
							}
							storeData("log", "True");
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

					{/* NAVIGATE TO ADMIN LOG IN PAGE */}
					<Text
						style={{ color: "#003C98", alignSelf: "center", paddingTop: 80 }}
						onPress={() => navigation.navigate("Admin Home")}
					>
						Log In as Admin User
					</Text>
				</View>
			</KeyboardAvoidingView>
			)}

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