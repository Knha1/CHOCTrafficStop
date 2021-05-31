import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Modal,
	TextInput,
	ImageBackground,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import { firebase } from "../../firebase/config";
import { Picker } from "@react-native-picker/picker";
import { readData } from "../../utils/DataHandler";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx";
// ASSET IMPORTS
import bg from "../../assets/background.png";
import back from "../../assets/backArrowWhite.png";
import check from "../../assets/greenCheck.png";

/**
 * Helper function to handle date standardization to YYYY-MM
 * @param {int/string} month - month to be standardized
 * @param {int} year - year to be standardized
 * @returns {string} - date in form YYYY-MM
 */
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

/**
 * Allows admin to export resource usage data as an Excel sheet for a specific year-month range
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function ExportDataScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [startMonth, setStartMonth] = useState("1");
	const [startYear, setStartYear] = useState("2021");
	const [endMonth, setEndMonth] = useState("1");
	const [endYear, setEndYear] = useState("2021");
	const [message, setMessage] = useState("");
	const [filename, setFilename] = useState("");

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

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<ScrollView style={[styles.base]}>
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
							Export Data as Excel Sheet
						</Text>

						{/* Month/year pickers to return data for a specific range */}
						<Text style={styles.subheader}>Usage Data From: </Text>

						<Picker
							selectedValue={startMonth}
							onValueChange={(itemValue, itemIndex) => {
								setStartMonth(itemValue);
							}}
							style={styles.monthPicker}
							itemStyle={{ fontSize: 16 }}
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
							itemStyle={{ fontSize: 16 }}
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
							itemStyle={{ fontSize: 16 }}
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
							itemStyle={{ fontSize: 16 }}
						>
							<Picker.Item label="2021" value="2021" />
							<Picker.Item label="2022" value="2022" />
							<Picker.Item label="2023" value="2023" />
						</Picker>

						<Text style={styles.subheader}>Exported File Name: </Text>
						<TextInput
							style={[styles.baseText, { marginBottom: "2%" }]}
							placeholder=" Enter File Name"
							onChangeText={(text) => setFilename(text)}
						/>

						{/* Status message if month/year is entered wrong */}
						<Text
							style={[styles.subheader, { marginBottom: "2%", color: "red" }]}
						>
							{message}
						</Text>

						<View
							style={{
								flexDirection: "row",
								// position: "absolute",
								bottom: 20,
								marginLeft: "15%",
								alignContent: "space-around",
								marginTop: "40%",
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
												// Process data into JSON format
												var processed_data = [];
												var supplemental_data = [
													{
														num_patients: num_patients,
														start_year: startYear,
														start_month: startMonth,
														end_year: endYear,
														end_month: endMonth,
													},
												];
												var indexed_resources = {};

												// Add on related info to be displayed
												readData("resources")
													.then((resource) => {
														var resources = JSON.parse(resource);

														// Index resources based on resource_id for faster retrieval
														for (var r in resources) {
															indexed_resources[resources[r]["resource_id"]] =
																resources[r];
														}
													})
													.then(() => {
														for (var resource_id in raw_data) {
															// Process view count and grab name for each resource
															const total_views = raw_data[resource_id].length;
															const unique_views = new Set(
																raw_data[resource_id]
															).size;
															const name =
																indexed_resources[resource_id]["name"];

															processed_data.push({
																resource_id: resource_id,
																name: name,
																total_views: total_views,
																unique_views: unique_views,
															});
														}
													})
													.finally(() => {
														// Write to Excel sheet
														var ws1 = XLSX.utils.json_to_sheet(processed_data);
														var ws2 =
															XLSX.utils.json_to_sheet(supplemental_data);
														var wb = XLSX.utils.book_new();
														XLSX.utils.book_append_sheet(
															wb,
															ws1,
															"Resource Usage"
														);
														XLSX.utils.book_append_sheet(
															wb,
															ws2,
															"Supplemental Data"
														);
														const wbout = XLSX.write(wb, {
															type: "base64",
															bookType: "xlsx",
														});

														var fname = filename;
														if (fname.length == 0) {
															setMessage(
																"Exported file name cannot be empty. Enter a file name."
															);
														} else if (processed_data.length == 0) {
															setMessage(
																"No usage data was found for this date range. Please choose a different date range."
															);
														} else {
															fname = fname.replace(".xlsx", "");
															const uri =
																FileSystem.documentDirectory + fname + ".xlsx";

															FileSystem.writeAsStringAsync(uri, wbout, {
																encoding: FileSystem.EncodingType.Base64,
															});

															Sharing.shareAsync(uri, {
																mimeType:
																	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
																dialogTitle: "Resource Usage Statistics",
																UTI: "com.microsoft.excel.xlsx",
															});
															setModalVisible(true);
														}
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

							{/* Pop-up for successful data export */}
							<Modal
								animationType="none"
								visible={modalVisible}
								transparent={true}
								onRequestClose={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<View style={[styles.container]}>
									<View style={[styles.popup, { flexDirection: "row" }]}>
										<Image
											source={check}
											style={{
												resizeMode: "contain",
												width: 30,
												height: 30,
												marginRight: 10,
											}}
										></Image>
										<Text
											style={{
												textAlign: "center",
												marginVertical: 10,
												color: "white",
												fontWeight: "bold",
												fontSize: 20,
												marginLeft: "2%",
											}}
										>
											Exported Data Successfully!
										</Text>

										<TouchableOpacity
											onPress={() => setModalVisible(!modalVisible)}
											style={{
												borderRadius: 20,
												padding: 10,
											}}
										>
											<Text
												style={{
													color: "white",
													textAlign: "right",
													fontSize: 24,
													bottom: "75%",
													marginLeft: 10,
												}}
											>
												x
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</Modal>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</ImageBackground>
		</View>
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
		// height: "5%",
		paddingVertical: "2%",
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
	popup: {
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 20,
		position: "absolute",
		bottom: "5%",
	},
	yearPicker: {
		marginLeft: "8%",
		marginVertical: "1%",
		width: "80%",
		// height: "10%" ,
		alignSelf: "center",
	},
	monthPicker: {
		marginLeft: "8%",
		width: "80%",
		marginTop: "2%",
		// height: "8%" ,
		alignSelf: "center",
	},
});

export default ExportDataScreen;
