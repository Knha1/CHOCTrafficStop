import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	Modal,
	ImageBackground,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import back from "../../assets/backArrowWhite.png";
import { firebase } from "../../firebase/config";
import { readData } from "../../utils/DataHandler";

function StatisticsHomeScreen({ navigation }) {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const curMonth = new Date().getMonth();
	const curYear = new Date().getFullYear();
	// State variable to show loading screen if resource details aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	const [res1, setRes1] = useState("");
	const [res2, setRes2] = useState("");
	const [res3, setRes3] = useState("");
	var raw_data = {};
	var indexed_resources = {};

	useEffect(() => {
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
							const month = datum.val().month - 1; // Date().getMonth() starts at 0 (not 1)
							const resource_id = parseInt(datum.val().resource_id);

							// Check if year and month match up
							if (curYear == year && curMonth == month) {
								if (raw_data[resource_id] == undefined) {
									raw_data[resource_id] = 1;
								} else {
									raw_data[resource_id]++;
								}
							}
						}
					});

					readData("resources").then((resource) => {
						var resources = JSON.parse(resource);

						// Index resources based on resource_id for faster retrieval
						for (var r in resources) {
							indexed_resources[resources[r]["resource_id"]] = resources[r];
						}
					});
					// Sort by descending # of views
					raw_data = Object.entries(raw_data).sort((a, b) => b[1] - a[1]);

					for (var resIndex in raw_data) {
						if (resIndex == 0) {
							console.log(raw_data[resIndex]);
						} else if (res == 1) {
							console.log(raw_data[resIndex]);
						} else if (res == 2) {
							console.log(raw_data[resIndex]);
						} else {
							break;
						}
					}

					setLoading(false);
				} else {
					console.log("'data' doesn't exist in database.");
				}
			});
	}, [isLoading]);

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

				<View style={{ alignItems: "center" }}></View>

				<View style={styles.base}>
					<Text
						style={{
							marginTop: "10%",
							fontSize: 24,
							alignSelf: "flex-start",
							textAlign: "left",
							marginLeft: "10%",
							color: "#003C98",
							fontWeight: "bold",
						}}
					>
						Top 3 Resources Accessed
					</Text>
					<Text
						style={{
							marginLeft: "10%",
							fontSize: 16,
							marginBottom: 15,
							color: "#888888",
						}}
					>
						For {monthNames[curMonth]} {curYear}
					</Text>
					{isLoading ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : (
						<View>
							<Text style={styles.resourceText}>Resource 1</Text>
							<Text style={styles.resourceText}>Resource 2</Text>
							<Text style={styles.resourceText}>Resource 3</Text>
						</View>
					)}

					<View
						style={{
							flexDirection: "row",
							position: "absolute",
							bottom: 30,
							left: 40,
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("Export Data")}
							style={{
								backgroundColor: "#DFDFDF",
								alignSelf: "center",
								borderRadius: 64,
								padding: 15,
								marginHorizontal: 10,
							}}
						>
							<Text style={[styles.buttonText, { color: "#003C98" }]}>
								Export Data
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: colors.bg,
		// alignItems: "center",
		flexDirection: "row",
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
	resourceText: {
		marginTop: "2%",
		marginHorizontal: "12%",
		textAlign: "left",
		borderRadius: 6,
		backgroundColor: "#F9F9F9",
		padding: 8,
		width: "76%",
	},
	buttonText: {
		fontSize: 16,
		textAlign: "center",
		minWidth: "30%",
	},
});

export default StatisticsHomeScreen;
