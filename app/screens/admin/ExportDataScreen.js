import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	Modal,
	TextInput,
	ImageBackground,
	Image,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import back from "../../assets/backArrowWhite.png";
import { firebase } from "../../firebase/config";
import { Picker } from "@react-native-picker/picker";
import { readData } from "../../utils/DataHandler";

async function processData(data) {
	var processed_data = {};
	var indexed_resources = {};

	// Add on related info to be displayed
	readData("resources")
		.then((resource) => {
			var resources = JSON.parse(resource);

			// Index resources based on resource_id for faster retrieval
			for (var r in resources) {
				indexed_resources[resources[r]["resource_id"]] = resources[r];
			}
		})
		.then(() => {
			for (var resource_id in data) {
				// Process view count and grab name for each resource
				const total_views = data[resource_id].length;
				const unique_views = new Set(data[resource_id]).size;
				const name = indexed_resources[resource_id]["name"];

				processed_data[resource_id] = {
					resource_id: resource_id,
					name: name,
					total_views: total_views,
					unique_views: unique_views,
				};
			}
		})
		.finally(() => {
			console.log("done processing data");
			console.log(processed_data);
		});
	return processed_data;
}

function createDateStr(month, year) {
	// Convert ints to strings before checking length
	if (month.length == undefined) {
		month = month.toString();
	}
	if (month.length == 1) {
		month = "0" + month;
	}
	return year + "-" + month;
}

function ExportDataScreen({ navigation }) {
	const [data, setData] = useState([]);
	const [startMonth, setStartMonth] = useState("1");
	const [startYear, setStartYear] = useState("2021");
	const [endMonth, setEndMonth] = useState("1");
	const [endYear, setEndYear] = useState("2021");
	const [message, setMessage] = useState("");

	var num_patients = 0;
	var raw_data = {};

	return (
		<View style={styles.container}>
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
				<View style={[styles.base]}>
					<Text
						style={{
							marginTop: "10%",
							fontSize: 24,
							alignSelf: "flex-start",
							textAlign: "left",
							marginLeft: "10%",
							marginBottom: "5%",
							color: "#003C98",
							fontWeight: "bold",
						}}
					>
						Export Data
					</Text>

					<Text style={styles.subheader}>Export Date Range From: </Text>

					<Picker
						selectedValue={startMonth}
						onValueChange={(itemValue, itemIndex) => {
							setStartMonth(itemValue);
						}}
						style={styles.monthPicker}
					>
						<Picker.Item label="January" value="1" />
						<Picker.Item label="February" value="2" />
						<Picker.Item label="March" value="3" />
						<Picker.Item label="April" value="4" />
						<Picker.Item label="May" value="5" />
						<Picker.Item label="June" value="6" />
						<Picker.Item label="July" value="7" />
						<Picker.Item label="August" value="8" />
						<Picker.Item label="September" value="9" />
						<Picker.Item label="October" value="10" />
						<Picker.Item label="November" value="11" />
						<Picker.Item label="December" value="12" />
					</Picker>

					<Picker
						selectedValue={startYear}
						onValueChange={(itemValue, itemIndex) => {
							setStartYear(itemValue);
						}}
						style={styles.yearPicker}
					>
						<Picker.Item label="2021" value="2021" />
						<Picker.Item label="2022" value="2022" />
						<Picker.Item label="2023" value="2023" />
					</Picker>

					<Text style={styles.subheader}>to </Text>

					<Picker
						selectedValue={endMonth}
						onValueChange={(itemValue, itemIndex) => {
							setEndMonth(itemValue);
						}}
						style={styles.monthPicker}
					>
						<Picker.Item label="January" value="1" />
						<Picker.Item label="February" value="2" />
						<Picker.Item label="March" value="3" />
						<Picker.Item label="April" value="4" />
						<Picker.Item label="May" value="5" />
						<Picker.Item label="June" value="6" />
						<Picker.Item label="July" value="7" />
						<Picker.Item label="August" value="8" />
						<Picker.Item label="September" value="9" />
						<Picker.Item label="October" value="10" />
						<Picker.Item label="November" value="11" />
						<Picker.Item label="December" value="12" />
					</Picker>

					<Picker
						selectedValue={endYear}
						onValueChange={(itemValue, itemIndex) => {
							setEndYear(itemValue);
						}}
						style={styles.yearPicker}
					>
						<Picker.Item label="2021" value="2021" />
						<Picker.Item label="2022" value="2022" />
						<Picker.Item label="2023" value="2023" />
					</Picker>

					<Text style={styles.subheader}>File Name: </Text>
					<TextInput style={styles.baseText} placeholder=" Enter File Name" />

					{/* Status message if month/year is entered wrong */}
					<Text style={styles.subheader}>{message}</Text>

					<View
						style={{
							flexDirection: "row",
							position: "absolute",
							bottom: 30,
							left: 40,
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("Admin Home")}
							style={{
								backgroundColor: "#DFDFDF",
								alignSelf: "center",
								borderRadius: 64,
								padding: 15,
								marginHorizontal: 10,
							}}
						>
							<Text style={[styles.buttonText, { color: "#003C98" }]}>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								if (startYear > endYear) {
									// Checks if ending year happens before starting year
									setMessage(
										"Make sure the ending year doesn't occur before the starting year."
									);
								} else if (startYear == endYear && startMonth > endMonth) {
									// Checks if ending month happens before starting month
									setMessage(
										"Make sure the ending month doesn't occur before the starting month."
									);
								} else {
									setMessage("Downloading data and exporting...");
									// Generate strings for start and end dates in format YYYY-MM
									const startDate = createDateStr(startMonth, startYear);
									const endDate = createDateStr(endMonth, endYear);

									// Get the current # of patients
									firebase
										.database()
										.ref()
										.child("patient/num_patients")
										.get()
										.then((snapshot) => {
											if (snapshot.exists()) {
												num_patients = snapshot.val();
											} else {
												console.log(
													"'num_patients' doesn't exist in database."
												);
											}
										});
									// Get data points
									firebase
										.database()
										.ref()
										.child("data")
										.get()
										.then((snapshot) => {
											if (snapshot.exists()) {
												snapshot.forEach((datum) => {
													// Ignore the 'num_data' counter in database
													if (!Number.isInteger(datum.val())) {
														const year = datum.val().year;
														const month = datum.val().month;
														const resource_id = parseInt(
															datum.val().resource_id
														);
														const patient_id = datum.val().patient_id;
														const date = createDateStr(month, year);

														// Check if date is in the specified range
														if (date >= startDate && date <= endDate) {
															// Store patient_ids to represent view count
															if (raw_data[resource_id] == undefined) {
																raw_data[resource_id] = [patient_id];
															} else {
																raw_data[resource_id].push(patient_id);
															}
														}
													}
												});
											} else {
												console.log("'data' doesn't exist in database.");
											}
										})
										.then(() => {
											// console.log("passing in:");
											// console.log(raw_data);
											processData(raw_data).then((pd) => {
												console.log("results: ");
												console.log(pd);
											});
										});
								}
							}}
							style={{
								backgroundColor: "#0E4B9D",
								alignSelf: "center",
								borderRadius: 64,
								padding: 15,
								marginHorizontal: 10,
							}}
						>
							<Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
								Export Data
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
		//     <View style={{padding: 10}}>

		//     <Text>File Name: </Text>
		//     <TextInput
		//     style={{height: 40}}
		//     placeholder = "File Name" />
		// 	<View style ={{marginTop: 10, margin:5}}/>
		// 	<Text>File Type: </Text>
		// 	<DropDownPicker
		// 		items={[
		// 			{label: '.pdf', value: 'pdf'},
		// 			{label: '.docx', value: 'docx'},
		// 			{label: '.txt', value: 'txt'},
		// 			{label: '.odt', value: 'odt'},
		// 		]}
		// 	/>

		//     <View style ={{marginTop: 10, margin:5}}>
		//     <Button
		//       title="Export Data"
		//       onPress={() =>
		//         navigation.navigate('Admin Home')
		//       }
		//     />
		//     </View>

		//     <View style ={{marginTop: 10, margin:5}}>
		//     <Button
		//       title="Cancel"
		// 	  color = "grey"
		//       onPress={() =>
		//         navigation.navigate('Admin Home')
		//       }
		//     />
		//     </View>
		//    </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	emergency: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 30,
	},
	emergencyConfirm: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonSpacing: {
		margin: 5,
	},
	emergencyChoice: {
		flexDirection: "row",
	},
	base: {
		// marginTop: "1%",
		backgroundColor: "#F1F2F2",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
	},
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "11%",
	},
	baseText: {
		marginLeft: "10%",
		marginRight: "10%",
		marginBottom: "5%",
		height: "5%",
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#D1D1D1",
		backgroundColor: "white",
	},
	subheader: {
		marginLeft: "10%",
		marginBottom: "1%",
	},
	buttonText: {
		fontSize: 16,
		textAlign: "center",
		minWidth: "30%",
	},
	monthPicker: {
		// For month picker
		marginLeft: "10%",
		marginRight: "10%",
	},
	yearPicker: {
		// For year picker
		marginLeft: "10%",
		marginRight: "10%",
	},
});

export default ExportDataScreen;
