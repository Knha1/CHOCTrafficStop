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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import colors from "../../config/colors";
import backArrowWhite from "../../assets/backArrowWhite.png";
import edit from "../../assets/close.png";

function AddResourceScreen({ navigation }) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Project Choice", value: "Project Choice" },
		{ label: "Waymakers", value: "Waymakers" },
		{ label: "CHOC", value: "CHOC" },
		{ label: "211OC", value: "211OC" },
	]);

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
					<Text style={styles.text}>Edit Resource</Text>

					<Text style={styles.text3}>Title</Text>
					<TextInput style={styles.input} defaultValue="Enter resource title" />

					{/* <Text style={styles.text3}>Tags</Text>
					<TextInput style={styles.input} defaultValue="SLEEP" /> */}

					<Text style={styles.text3}>Availability</Text>
					<TextInput style={styles.input} defaultValue="Enter open hours" />

					<Text style={styles.text3}>Phone Number</Text>
					<TextInput style={styles.input} defaultValue="Enter phone number" />

					<Text style={styles.text3}>Address</Text>
					<TextInput
						style={styles.input}
						defaultValue="https://kidshealth.org/CHOC/en/teens/how-much-sleep.html"
					/>

					<Text style={styles.text3}>Description</Text>
					<TextInput
						style={styles.input}
						defaultValue="Enter resource description"
					/>

					<Text style={styles.text3}>Organization</Text>
					<DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						containerStyle={{ marginHorizontal: "10%", height: "5%" }}
						itemStyle={{
							marginHorizontal: "10%",
							justifyContent: "flex-start",
						}}
					/>
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
							console.log(value);
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
});

export default AddResourceScreen;
