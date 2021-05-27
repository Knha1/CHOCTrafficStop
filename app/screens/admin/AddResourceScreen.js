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
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	ScrollView,
	Picker,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// TODO: Remove Picker import, replace with @react-native-community/picker

import colors from "../../config/colors";
import backArrowWhite from "../../assets/backArrowWhite.png";
import edit from "../../assets/close.png";
import { firebase } from "../../firebase/config";

function AddResourceScreen({ navigation }) {
	// Defaulting org to Project Choice in case user doesn't select org
	const [selectedOrganization, setSelectedOrganization] =
		useState("Project Choice");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [availability, setAvailability] = useState("");
	const [website, setWebsite] = useState("");
	const [category, setCategory] = useState("");
	const [email, setEmail] = useState("");

	return (
		// TODO: Potentially change this to ScrollView if fields get too long
		<SafeAreaView style={styles.container}>
			<Image
				style={styles.backArrow}
				source={backArrowWhite}
				onPress={() => navigation.navigate("Admin Home")}
			></Image>
			
			<View
				style={styles.bottomContainer}
				contentContainerStyle={styles.contentContainer}
			>
				<KeyboardAvoidingView
					behavior="height"
					style={{ flex: 1 }}
					enabled={true}
				>
					<Text style={styles.text}>Add Resource</Text>

					<Text style={styles.text3}>Title</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter resource title"
						onChangeText={setTitle}
					/>

					<Text style={styles.text3}>Availability</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter open hours"
						onChangeText={setAvailability}
					/>

					<Text style={styles.text3}>Phone Number</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter phone number (if applicable)"
						onChangeText={setPhone}
					/>

					<Text style={styles.text3}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter email (if applicable)"
						onChangeText={setEmail}
					/>

					<Text style={styles.text3}>Address</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter street address (if applicable)"
						onChangeText={setAddress}
					/>

					<Text style={styles.text3}>Website</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter website URL (if applicable)"
						onChangeText={setWebsite}
					/>

					<Text style={styles.text3}>Category</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter resource category"
						onChangeText={setCategory}
					/>

					<Text style={styles.text3}>Description</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter resource description"
						onChangeText={setDescription}
					/>

					<Text style={styles.text3}>Organization</Text>
					<Picker
						selectedValue={selectedOrganization}
						style={styles.dropdown}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedOrganization(itemValue)
						}
					>
						<Picker.Item label="Project Choice" value="Project Choice" />
						<Picker.Item label="CHOC" value="CHOC" />
						<Picker.Item label="Waymakers" value="Waymakers" />
						<Picker.Item label="211OC" value="211OC" />
					</Picker>
				</KeyboardAvoidingView>

				<View style={{ position: "absolute", bottom: "15%" }}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.cancelButton}
					>
						<Text style={{ color: "#0E4B9D" }}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							// TODO: Add checking to make sure specific fields have data
							var tagString = selectedOrganization
								.toLowerCase()
								.replace(" ", "-"); // Format to a tag
							var tag = { 0: tagString };
							var new_resource_id = null;
							firebase
								.database()
								.ref()
								.child("resource")
								.child("num_resources")
								.get()
								.then((snapshot) => {
									if (snapshot.exists()) {
										// Get the current resource_id and increment by 1 for new resource
										new_resource_id = snapshot.val() + 1;
									} else {
										console.log(
											"No 'num_resources' variable under 'resource' exists in the database"
										);
									}
								});

							firebase
								.database()
								.ref()
								.child("resource")
								.get()
								.then((snapshot) => {
									if (snapshot.exists()) {
										// Make sure resource_id is generated properly
										if (new_resource_id != null) {
											// Create resource object
											const new_resource_data = {
												address: address,
												availability: availability,
												category: category,
												description: description,
												email: email,
												name: title,
												organization: selectedOrganization,
												phone_num: phone,
												resource_id: new_resource_id,
												tags: tag,
												website: website,
											};

											firebase
												.database()
												.ref()
												.child("resource/" + new_resource_id)
												.set(new_resource_data)
												.then(() => {
													// Update num of resources (same as newly created resource_id)
													firebase
														.database()
														.ref()
														.child("resource/num_resources")
														.set(new_resource_id);
												});
										}
									} else {
										console.log("'resource' not found in database.");
									}
								});

							// TODO: Display confirmation that resource has been added
							// TODO: Redownload data from Firebase to refresh AsyncStorage

							navigation.navigate("Admin Home");
						}}
						style={styles.saveButton}
					>
						<Text style={{ color: "white" }}>Add Resource</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0066BB",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 100,
	},
	contentContainer: {
		justifyContent: "flex-end",
		//height: '90%',
	},
	input: {
		height: 30,
		width: "80%",
		left: 40,
		top: 36,
		fontSize: 18,
	},
	backArrow: {
		height: 34,
		width: 34,
		alignSelf: "flex-start",
		left: 30,
		bottom: 25,
	},
	text: {
		color: "#003C98",
		top: 34,
		left: 40,
		fontWeight: "bold",
		fontSize: 24,
	},
	bottomContainer: {
		flex: 1,
		height: "100%",
		alignSelf: "stretch",
		backgroundColor: "white",
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
		top: 38,
		left: 40,
		fontWeight: "bold",
	},
	cancelButton: {
		position: "absolute",
		margin: 3,
		//top: '95%',
		//bottom: 0,
		left: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderColor: "#0E4B9D",
		borderRadius: 30,
		borderWidth: 2,
		height: 45,
		width: 129,
	},
	saveButton: {
		position: "absolute",
		margin: 3,
		left: 180,
		//top: '95%',
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#0E4B9D",
		borderRadius: 30,
		height: 45,
		width: 168,
	},
	dropdown: {
		top: 30,
	},
});

export default AddResourceScreen;
