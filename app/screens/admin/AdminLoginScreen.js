import React, { useState } from "react";
import {
	ImageBackground,
	Text,
	View,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { firebase } from "../../firebase/config";

function AdminLoginScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
						Login as an Admin
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
						placeholder="Enter Username"
						onChangeText={(text) => setUsername(text)}
					/>
					<TextInput
						style={{
							margin: 40,
							padding: 5,
							paddingLeft: 15,
							borderWidth: 1.0,
							borderColor: "#D1D1D1",
						}}
						autoCapitalize="characters"
						placeholder="Enter Password"
						onChangeText={(text) => setPassword(text)}
					/>

					<TouchableOpacity
						style={styles.button}
						title="Login"
						onPress={() => {
							var valid = false;
							if (username.length == 0 || password.length == 0) {
								console.log(
									"Username and/or password isn't filled in. Try again."
								);
							} else {
								// TODO: Replace w/ more secure sign in
								firebase
									.database()
									.ref()
									.child("admin")
									.get()
									.then((snapshot) => {
										if (snapshot.exists()) {
											// TODO: do child(username) and then do child(password)
										} else {
											console.log("Unable to find admin in database.");
										}
									});
							}
							navigation.navigate("Admin Home");
						}}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>

					<Text
						style={{ color: "#003C98", alignSelf: "center", marginTop: 80 }}
					>
						Not an Admin? Go Back
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
		top: 100,
		backgroundColor: "#fff",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
	},
	text: {
		color: "#003C98",
	},
	button: {
		position: "absolute",
		top: 300,
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

export default AdminLoginScreen;
