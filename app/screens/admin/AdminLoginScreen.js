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
	const [message, setMessage] = useState("");

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
						Admin Login
					</Text>
					<Text style={{left: 40, top:25}}>Username</Text>
					<TextInput
						style={{
							margin: 40,
							marginTop: 30,
							marginBottom: 15,
							borderRadius: 5,
							padding: 5,
							paddingLeft: 15,
							borderWidth: 1.0,
							borderColor: "#D1D1D1",
						}}
						autoCapitalize="characters"
						placeholder="Enter Username"
						onChangeText={(text) => setUsername(text)}
					/>
					<Text style={{left: 40, top:15}}>Password</Text>
					<TextInput
						style={{
							margin: 40,
							marginTop: 20,
							marginBottom: 0,
							borderRadius: 5,
							padding: 5,
							paddingLeft: 15,
							borderWidth: 1.0,
							borderColor: "#D1D1D1",
						}}
						autoCapitalize="characters"
						placeholder="Enter Password"
						onChangeText={(text) => setPassword(text)}
						secureTextEntry={true}
					/>

					<Text style={{color: 'red', alignSelf: 'center', top:10}}>{message}</Text>

					<TouchableOpacity
						style={styles.button}
						title="Login"
						onPress={() => {
							var valid = false;
							if (username.length == 0 || password.length == 0) {
								setMessage(
									"Username and/or password are not filled in. Try again."
								);
								console.log(
									"Username and/or password are not filled in. Try again."
								);
							} else {
								// TODO: Replace w/ EXTRA secure sign in
								var validUsername = false;
								var validPassword = false;
								var admin_id = 0;

								firebase
									.database()
									.ref()
									.child("admin")
									.get()
									.then((snapshot) => {
										if (snapshot.exists()) {
											snapshot.forEach((child) => {
												if (username == child.val().username) {
													validUsername = true;
													admin_id = child.val().admin_id;
												}
											});
										} else {
											console.log("Unable to find admin in database.");
										}
									})
									.then(() => {
										// TODO: don't check for password is username is wrong
										firebase
											.database()
											.ref()
											.child("admin")
											.child(admin_id)
											.get()
											.then((snapshot) => {
												if (snapshot.exists()) {
													if (password == snapshot.val().password) {
														validPassword = true;
													}
												} else {
													console.log("invalid password");
												}
											})
											.finally(() => {
												if (validUsername && validPassword) {
													navigation.navigate("Admin Home");
												} else {
													setMessage("Invalid password or username");
													console.log("Invalid password or username.");
												}
											});
									});
							}
						}}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>

					<Text
						style={{ color: "#003C98", alignSelf: "center", marginTop: 110 }}
						onPress={() => navigation.navigate("Login")}
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
		top: 310,
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
