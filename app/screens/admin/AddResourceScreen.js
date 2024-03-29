import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
	ImageBackground,
} from "react-native";
import { firebase } from "../../firebase/config";
import { Picker } from "@react-native-picker/picker";
// ASSET IMPORTS
import back from "../../assets/backArrowWhite.png";
import bg from "../../assets/background.png";

/**
 * Allows an admin to add a new resource to the DB
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
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
		<View>
			<ImageBackground
				source={bg}
				style={{
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%",
					width: "100%",
				}}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<ScrollView>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Image source={back} style={styles.backButton}></Image>
						</TouchableOpacity>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={styles.inner}>
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
									style={{ marginBottom: 28, width: "90%", marginLeft: "4%" }}
									itemStyle={{ fontSize: 20 }}
									onValueChange={(itemValue, itemIndex) =>
										setSelectedOrganization(itemValue)
									}
								>
									<Picker.Item label="Project Choice" value="Project Choice" />
									<Picker.Item label="CHOC" value="CHOC" />
									<Picker.Item label="Waymakers" value="Waymakers" />
									<Picker.Item label="211OC" value="211OC" />
								</Picker>
								<View
									style={{
										flexDirection: "row",
										position: "absolute",
										bottom: 10,
										marginLeft: "15%",
										alignContent: "space-around",
									}}
								>
									<TouchableOpacity
										onPress={() => navigation.goBack()}
										style={styles.cancelButton}
									>
										<Text style={{ color: "#0E4B9D", textAlign: "center" }}>
											Cancel
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => {
											// Temporarily assigning tag to organization
											var tagString = selectedOrganization
												.toLowerCase()
												.replace(" ", "-"); // Format to a tag
											var tag = { 0: tagString };

											// Generate new resource_id for new resource
											var new_resource_id = null;
											firebase
												.database()
												.ref()
												.child("resource")
												.child("num_resources")
												.get()
												.then((snapshot) => {
													if (snapshot.exists()) {
														new_resource_id = snapshot.val() + 1;
													} else {
														console.log(
															"No 'num_resources' variable under 'resource' exists in the database"
														);
													}
												});

											// Add new resource to DB
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
											navigation.navigate("Admin Home");
										}}
										style={styles.saveButton}
									>
										<Text style={{ color: "white" }}>Add Resource</Text>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</ScrollView>
				</KeyboardAvoidingView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		backgroundColor: "#F1F2F2",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
		paddingBottom: 24,
		backgroundColor: "#FFFFFF",
	},
	header: {
		fontSize: 36,
		marginBottom: 48,
	},
	textInput: {
		height: 40,
		fontSize: 12,
		borderColor: "#000000",
		borderBottomWidth: 1,
		marginBottom: 36,
	},
	btnContainer: {
		backgroundColor: "white",
		marginTop: 12,
	},
	text: {
		color: "#003C98",
		// top: 34,
		marginTop: "10%",
		marginHorizontal: "5%",
		// left: 40,
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: "3%",
	},
	text3: {
		fontSize: 16,
		color: "black",
		// top: 38,
		// left: 40,
		marginHorizontal: "5%",

		fontWeight: "bold",
	},
	input: {
		maxHeight: "10%",
		// marginVertical: "4%",
		// backgroundColor: "gray",
		// width: "80%",
		// marginVertical: 10,
		marginHorizontal: "5%",
		// left: 40,
		// top: 36,
		fontSize: 18,
		marginBottom: "4%",
	},
	cancelButton: {
		//  position: "absolute",
		// margin: 3,
		//top: '95%',
		//  bottom: 0,
		// left: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderColor: "#0E4B9D",
		borderRadius: 30,
		borderWidth: 2,
		// padding: 10
		// height: 45,
		width: "40%",
		alignSelf: "center",
		// borderRadius: 20,
		padding: 15,
		// paddingHorizontal: 25,
		marginHorizontal: "4%",
	},
	saveButton: {
		// position: "absolute",
		// margin: 3,
		// left: 180,
		//top: '95%',
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#0E4B9D",
		borderRadius: 30,
		// padding: 10
		// height: 45,
		width: "40%",
		alignSelf: "center",
		// borderRadius: 20,
		padding: 15,
		// paddingHorizontal: 25,
		// marginHorizontal: 10
	},
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: "flex-start",
		// marginBottom: "2%",
		marginLeft: "2%",
		marginTop: "14%",
	},
});

export default AddResourceScreen;
