import React, { useState } from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
} from "react-native";
import colors from "../config/colors";
import { firebase } from "../firebase/config";

function LoginScreen({ navigation }) {
	const [text, setText] = useState("");

	return (
		<View style={{ padding: 10 }}>
			<Text
				style={{
					paddingTop: 10,
					fontSize: 20,
					alignSelf: "center",
					padding: 20,
				}}
			>
				Get Started
			</Text>

			<View
				style={{
					borderBottomColor: "grey",
					borderBottomWidth: 1,
					marginBottom: 15,
				}}
			/>

			<Text>Registration Code: </Text>
			<TextInput
				style={{ height: 40 }}
				placeholder="Enter Registration Code"
				onChangeText={(text) => setText(text)}
			/>

			<View style={{ marginTop: 10, margin: 5 }}>
				<Button
					title="Login"
					onPress={() => {
						var regCode = text.toUpperCase();

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
				/>
			</View>
		</View>
	);
}

export default LoginScreen;
