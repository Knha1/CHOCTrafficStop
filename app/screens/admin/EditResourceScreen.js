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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import colors from "../../config/colors";
import backArrowWhite from "../../assets/backArrowWhite.png";
import edit from "../../assets/close.png";
import { storeData, readData } from "../../utils/DataHandler.js";

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
	const [URL, setURL] = useState("");


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
				setURL(data["website"]);

			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);
	return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.backArrow} source={backArrowWhite}></Image>
			<View
				style={styles.bottomContainer}
				contentContainerStyle={styles.contentContainer}
			>
				<KeyboardAvoidingView
					behavior="height"
					style={{ flex: 1 }}
					enabled={true}
				>
					<Text style={styles.text}>Edit Resource</Text>

					<Text style={styles.text3}>Title</Text>
					<TextInput
						style={styles.input}
						onChangeText={setTitle} 
						defaultValue={data["name"]}
					/>

					{/* <Text style={styles.text3}>Tags</Text>
					<TextInput style={styles.input} defaultValue="SLEEP" /> */}

					<Text style={styles.text3}>Availability</Text>
					<TextInput
						style={styles.input}
						onChangeText={setAvailability} 
						defaultValue={data["availability"]}
					/>

					<Text style={styles.text3}>Phone Number</Text>
					<TextInput
						style={styles.input}
						onChangeText={setPhone} 
						defaultValue={data["phone"]}
					/>

					<Text style={styles.text3}>Address</Text>
					<TextInput
						style={styles.input}
						onChangeText={setAddress} 
						defaultValue={data["address"]}
					/>

					<Text style={styles.text3}>Website</Text>
					<TextInput
						style={styles.input}
						onChangeText={setURL} 
						defaultValue={data["website"]}
					/>

					<Text style={styles.text3}>Description</Text>
					<TextInput
						style={styles.input}
						onChangeText={setDescription} 
						defaultValue={data["description"]}
					/>

					<Text style={styles.text3}>Organization</Text>
					<Picker
					selectedValue={selectedOrganization}
					style={styles.dropdown}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedOrganization(itemValue)
					}>
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
							
							var tagString = selectedOrganization.toLowerCase().replace(" ", "-"); // Format to a tag
							var tag = { 0: tagString};
							console.log(selectedOrganization);
							console.log(title); 
							console.log(phone);
							console.log(address);
							console.log(availability);
							console.log(description);
							console.log(URL);
							console.log(tag);
							navigation.navigate("Admin Home");
						}}
						style={styles.saveButton}
					>
						<Text style={{ color: "white" }}>Save Changes</Text>
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
		top: 50,
	},
});

export default EditResourceScreen;
