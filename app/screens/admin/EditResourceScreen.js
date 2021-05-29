import React, { useState, useEffect } from "react";
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
	ActivityIndicator,
	Picker,
	TouchableWithoutFeedback,
	Keyboard,
	ImageBackground
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// TODO: Remove Picker import, replace with @react-native-community/picker

import colors from "../../config/colors";
import back from "../../assets/backArrowWhite.png";
import edit from "../../assets/close.png";
import { storeData, readData } from "../../utils/DataHandler.js";
import { firebase } from "../../firebase/config";
import bg from "../../assets/background.png";

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
		// TODO: Potentially change this to ScrollView if fields get too long
		// <SafeAreaView style={styles.container}>
		// 	<Image style={styles.backArrow} source={backArrowWhite}></Image>
		// 	<View
		// 		style={styles.bottomContainer}
		// 		contentContainerStyle={styles.contentContainer}
		// 	>
		// 		<KeyboardAvoidingView
		// 			behavior="height"
		// 			style={{ flex: 1 }}
		// 			enabled={true}
		// 		>
		// 			<Text style={styles.text}>Edit Resource</Text>

		// 			<Text style={styles.text3}>Title</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setTitle}
		// 				defaultValue={data["name"]}
		// 			/>

		// 			<Text style={styles.text3}>Availability</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setAvailability}
		// 				defaultValue={data["availability"]}
		// 			/>

		// 			<Text style={styles.text3}>Phone Number</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setPhone}
		// 				defaultValue={data["phone_num"]}
		// 			/>

		// 			<Text style={styles.text3}>Email</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setEmail}
		// 				defaultValue={data["email"]}
		// 			/>

		// 			<Text style={styles.text3}>Address</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setAddress}
		// 				defaultValue={data["address"]}
		// 			/>

		// 			<Text style={styles.text3}>Website</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setWebsite}
		// 				defaultValue={data["website"]}
		// 			/>

		// 			<Text style={styles.text3}>Category</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setCategory}
		// 				defaultValue={data["category"]}
		// 			/>

		// 			<Text style={styles.text3}>Description</Text>
		// 			<TextInput
		// 				style={styles.input}
		// 				onChangeText={setDescription}
		// 				defaultValue={data["description"]}
		// 			/>

		// 			<Text style={styles.text3}>Organization</Text>
		// 			<Picker
		// 				selectedValue={selectedOrganization}
		// 				style={styles.dropdown}
		// 				onValueChange={(itemValue, itemIndex) =>
		// 					setSelectedOrganization(itemValue)
		// 				}
		// 			>
		// 				<Picker.Item label="Project Choice" value="Project Choice" />
		// 				<Picker.Item label="CHOC" value="CHOC" />
		// 				<Picker.Item label="Waymakers" value="Waymakers" />
		// 				<Picker.Item label="211OC" value="211OC" />
		// 			</Picker>

		// 			<TouchableOpacity
		// 				onPress={() => navigation.goBack()}
		// 				style={styles.cancelButton}
		// 			>
		// 				<Text style={{ color: "#0E4B9D" }}>Cancel</Text>
		// 			</TouchableOpacity>
		// 			<TouchableOpacity
		// 				onPress={() => {
		// 					var tagString = selectedOrganization
		// 						.toLowerCase()
		// 						.replace(" ", "-"); // Format to a tag
		// 					var tag = { 0: tagString };

		// 					firebase
		// 						.database()
		// 						.ref()
		// 						.child("resource/" + data["resource_id"])
		// 						.get()
		// 						.then((snapshot) => {
		// 							// Make sure resource exists in DB before replacing
		// 							if (snapshot.exists()) {
		// 								// Create resource object
		// 								const edited_resource_data = {
		// 									address: address,
		// 									availability: availability,
		// 									category: category,
		// 									description: description,
		// 									email: email,
		// 									name: title,
		// 									organization: selectedOrganization,
		// 									phone_num: phone,
		// 									resource_id: data["resource_id"],
		// 									tags: tag,
		// 									website: website,
		// 								};

		// 								firebase
		// 									.database()
		// 									.ref()
		// 									.child("resource/" + data["resource_id"])
		// 									.set(edited_resource_data);
		// 							} else {
		// 								console.log(
		// 									"Resource with resource_id " +
		// 										data["resource_id"] +
		// 										" was not found in the database."
		// 								);
		// 							}
		// 						});

		// 					// TODO: Display confirmation that resource was successfully edited
		// 					navigation.navigate("Admin Home");
		// 				}}
		// 				style={styles.saveButton}
		// 			>
		// 				<Text style={{ color: "white" }}>Save Changes</Text>
		// 			</TouchableOpacity>
		// 		</KeyboardAvoidingView>

		// 		{/* <View style={{ position: "absolute", bottom: "15%" }}> */}
					
		// 		{/* </View> */}
		// 	</View>
		// </SafeAreaView>
		
	
	
    <View>
	<ImageBackground source={bg} style={{overflow: "hidden",resizeMode: "stretch",height: "100%", width: "100%"}}>
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
          {/* <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} /> */}
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
						style={{marginBottom: 28}}
						itemStyle = {{fontSize: 20}}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedOrganization(itemValue)
						}
					>
						<Picker.Item label="Project Choice" value="Project Choice" />
						<Picker.Item label="CHOC" value="CHOC" />
						<Picker.Item label="Waymakers" value="Waymakers" />
						<Picker.Item label="211OC" value="211OC" />
					</Picker>
				<View style={{flexDirection: "row", position: "absolute", bottom: 10, marginLeft: "15%", alignContent: "space-around" }}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.cancelButton}
					>
						<Text style={{ color: "#0E4B9D", textAlign: "center" }}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							var tagString = selectedOrganization
								.toLowerCase()
								.replace(" ", "-"); // Format to a tag
							var tag = { 0: tagString };

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

							// TODO: Display confirmation that resource was successfully edited
							navigation.navigate("Admin Home");
						}}
						style={styles.saveButton}
					>
						<Text style={{ color: "white", textAlign: "center" }}>Save Changes</Text>
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
		backgroundColor: "#FFFFFF"
	},
	header: {
	fontSize: 36,
	marginBottom: 48
	},
	textInput: {
		height: 40,
		fontSize: 12,
		borderColor: "#000000",
		borderBottomWidth: 1,
		marginBottom: 36
	},
	btnContainer: {
		backgroundColor: "white",
		marginTop: 12
	},
	text: {
		color: "#003C98",
		// top: 34,
		marginTop: "10%",
		marginHorizontal: "5%",
		// left: 40,
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: "3%"
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
		marginVertical: "4%",
		// backgroundColor: "gray",
		// width: "80%",
		// marginVertical: 10,
		marginHorizontal: "5%",
		// left: 40,
		// top: 36,
		fontSize: 18,
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
		marginHorizontal: "4%"
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
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#0066BB",
// 		alignItems: "center",
// 		justifyContent: "flex-start",
// 		paddingTop: 100,
// 	},
// 	contentContainer: {
// 		justifyContent: "flex-end",
// 		//height: '90%',
// 	},
// 	input: {
// 		height: 30,
// 		width: "80%",
// 		left: 40,
// 		top: 36,
// 		fontSize: 18,
// 	},
// 	backArrow: {
// 		height: 34,
// 		width: 34,
// 		alignSelf: "flex-start",
// 		left: 30,
// 		bottom: 25,
// 	},
// 	text: {
// 		color: "#003C98",
// 		top: 34,
// 		left: 40,
// 		fontWeight: "bold",
// 		fontSize: 24,
// 	},
// 	bottomContainer: {
// 		flex: 1,
// 		height: "100%",
// 		alignSelf: "stretch",
// 		backgroundColor: "white",
// 		borderTopRightRadius: 30,
// 		borderTopLeftRadius: 30,
// 	},
// 	buttonText: {
// 		color: "#000",
// 		alignSelf: "center",
// 	},
// 	text2: {
// 		color: "black",
// 		top: 50,
// 		left: 40,
// 		fontSize: 14,
// 		width: 300,
// 		marginTop: 5,
// 	},
// 	text3: {
// 		fontSize: 16,
// 		color: "black",
// 		top: 38,
// 		left: 40,
// 		fontWeight: "bold",
// 	},
// 	cancelButton: {
// 		position: "absolute",
// 		margin: 3,
// 		//top: '95%',
// 		// bottom: "10%",
// 		left: 40,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		backgroundColor: "white",
// 		borderColor: "#0E4B9D",
// 		borderRadius: 30,
// 		borderWidth: 2,
// 		height: 45,
// 		width: 129,
// 	},
// 	saveButton: {
// 		position: "absolute",
// 		margin: 3,
// 		left: 180,
// 		//top: '95%',
// 		alignItems: "center",
// 		justifyContent: "center",
// 		backgroundColor: "#0E4B9D",
// 		borderRadius: 30,
// 		height: 45,
// 		width: 168,
// 	},

// 	dropdown: {
// 		top: 30,
// 	},
// });



export default EditResourceScreen;
