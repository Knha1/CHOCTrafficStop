import React, { useState, useEffect } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { readData } from "../../utils/DataHandler.js";
import { firebase } from "../../firebase/config";
// ASSET IMPORTS
import back from "../../assets/backArrowWhite.png";
import bg from "../../assets/background.png";

/**
 * Allows admin to edit resource details and push changes to DB
 * @param {object} route - Contains resource_id to load resource details from
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function EditResourceScreen({ route, navigation }) {
	var resource = route.params;
	const resource_id = resource["resource_id"];
	// State variable to show loading screen if resource details aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource details
	const [data, setData] = useState([]);
	const [selectedOrganization, setSelectedOrganization] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [availability, setAvailability] = useState("");
	const [website, setWebsite] = useState("");
	const [category, setCategory] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		// Load in resource details from local storage
		readData("resources")
			.then((resources) => {
				var resources = JSON.parse(resources);

				// Index of resource is resource_id - 1
				var current_resource = resources[resource_id - 1];

				// Set value to 'N/A' if detail isn't supplied
				for (var key in current_resource) {
					if (current_resource[key] == "") {
						current_resource[key] = "N/A";
					}
				}

				setData(current_resource);

				setSelectedOrganization(data["organization"]);
				setTitle(data["name"]);
				setDescription(data["description"]);
				setPhone(data["phone_num"]);
				setAddress(data["address"]);
				setAvailability(data["availability"]);
				setWebsite(data["website"]);
				setEmail(data["email"]);
				setCategory(data["category"]);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

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
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={back} style={styles.backButton}></Image>
				</TouchableOpacity>

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<ScrollView>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={styles.inner}>
								<Text style={styles.text}>Edit Resource</Text>

								<Text style={styles.text3}>Title</Text>
								<TextInput
									style={styles.input}
									onChangeText={setTitle}
									defaultValue={data["name"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Availability</Text>
								<TextInput
									style={styles.input}
									onChangeText={setAvailability}
									defaultValue={data["availability"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Phone Number</Text>
								<TextInput
									style={styles.input}
									onChangeText={setPhone}
									defaultValue={data["phone_num"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Email</Text>
								<TextInput
									style={styles.input}
									onChangeText={setEmail}
									defaultValue={data["email"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Address</Text>
								<TextInput
									style={styles.input}
									onChangeText={setAddress}
									defaultValue={data["address"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Website</Text>
								<TextInput
									style={styles.input}
									onChangeText={setWebsite}
									defaultValue={data["website"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Category</Text>
								<TextInput
									style={styles.input}
									onChangeText={setCategory}
									defaultValue={data["category"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Description</Text>
								<TextInput
									style={styles.input}
									onChangeText={setDescription}
									defaultValue={data["description"]}
									multiline={true}
								/>

								<Text style={styles.text3}>Organization</Text>
								<Picker
									selectedValue={selectedOrganization}
									style={{ marginBottom: 40, width: "90%", marginLeft: "4%" }}
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
											// Temporarily assigning tag as organization
											var tagString = selectedOrganization
												.toLowerCase()
												.replace(" ", "-"); // Format to a tag
											var tag = { 0: tagString };

											// Replace resource with edited resource details on DB
											firebase
												.database()
												.ref()
												.child("resource/" + data["resource_id"])
												.get()
												.then((snapshot) => {
													// Make sure resource exists in DB before replacing
													if (snapshot.exists()) {
														// Create resource object
														const edited_resource_data = {
															address: address,
															availability: availability,
															category: category,
															description: description,
															email: email,
															name: title,
															organization: selectedOrganization,
															phone_num: phone,
															resource_id: data["resource_id"],
															tags: tag,
															website: website,
														};

														firebase
															.database()
															.ref()
															.child("resource/" + data["resource_id"])
															.set(edited_resource_data);
													} else {
														console.log(
															"Resource with resource_id " +
																data["resource_id"] +
																" was not found in the database."
														);
													}
												});
											navigation.navigate("Admin Home");
										}}
										style={styles.saveButton}
									>
										<Text style={{ color: "white", textAlign: "center" }}>
											Save Changes
										</Text>
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
		// backgroundColor: "#F1F2F2",
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
	// textInput: {
	// 	height: 40,
	// 	fontSize: 12,
	// 	borderColor: "#000000",
	// 	borderBottomWidth: 1,
	// 	marginBottom: 36
	// },
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
		//marginVertical: "4%",
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
export default EditResourceScreen;
