
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
import DropDownPicker from "react-native-dropdown-picker";

import colors from "../../config/colors";
import backArrowWhite from "../../assets/backArrowWhite.png";
import edit from "../../assets/close.png";

function AddResourceScreen({ navigation }) {
	const [selectedOrganization, setSelectedOrganization] = useState("Project Choice");
	const [title, setTitle] = useState("NO TITLE RECEIVED");
	const [description, setDescription] = useState("NO DESCRIPTION RECEIVED");
	const [phone, setPhone] = useState("NO PHONE # RECEIVED");
	const [address, setAddress] = useState("NO ADDRESS RECEIVED");
	const [availability, setAvailability] = useState("NO AVAILABILITY RECEIVED");
	const [URL, setURL] = useState("NO URL RECEIVED");
	
	return (
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
					<TextInput style={styles.input} placeholder="Enter resource title" onChangeText={setTitle} />

					{/* <Text style={styles.text3}>Tags</Text>
					<TextInput style={styles.input} defaultValue="SLEEP" /> */}

					<Text style={styles.text3}>Availability</Text>
					<TextInput style={styles.input} placeholder="Enter open hours" onChangeText={setAvailability} />

					<Text style={styles.text3}>Phone Number</Text>
					<TextInput style={styles.input} placeholder="Enter phone number" onChangeText={setPhone} />

					<Text style={styles.text3}>Address</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter street address (if applicable)"
						onChangeText={setAddress} 
					/>

					<Text style={styles.text3}>Website</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter URL"
						onChangeText={setURL} 
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
		top: 50,
	},
});

export default AddResourceScreen;