import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	Modal,
	TouchableOpacity,
	Image,
	ImageBackground,
} from "react-native";
import colors from "../../config/colors";
import callCenter from "../../assets/call-center1.png";
import charity from "../../assets/charity1.png";
import schedule from "../../assets/schedule1.png";
import bg from "../../assets/background.png";
import cog from "../../assets/settings1.png";
import logo from "../../assets/logo_nobg.png";
import back from "../../assets/backArrowWhite.png";
import heart from "../../assets/heart.png";
import { Linking } from "react-native";
import { storeData, readData } from "../../utils/DataHandler.js";

function HomeScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={[styles.container]}>
			<ImageBackground
				source={bg}
				style={{
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%",
				}}
			>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={back} style={styles.backButton}></Image>
				</TouchableOpacity>
				<View
					style={[
						styles.base,
						{ height: "70%", padding: 20, alignItems: "center" },
					]}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate("Youth Support Services")}
						style={[styles.card, { backgroundColor: "#4B9E76" }]}
					>
						<Text style={[styles.buttonText, { color: "white" }]}>
							Youth Support Services
						</Text>
						<Image source={heart} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Resource List")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>View All Resources</Text>
						<Image source={charity} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Survey Categories")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>Take Resource Survey</Text>
						<Image source={callCenter} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							var filterTags = [];
							readData("previousTags")
								.then((value) => {
									filterTags = JSON.parse(value);
									console.log(filterTags);
								})
								.finally(() => {
									console.log("navigating");
									console.log(filterTags);
									navigation.navigate("Resource Results", {
										tags: filterTags,
									});
								});
						}}
						style={styles.card}
					>
						<Text style={styles.buttonText}>See Past Resources</Text>
						<Image source={schedule} style={styles.icon} />
					</TouchableOpacity>

					{/* Unused Settings Screen */}
					{/* <TouchableOpacity
						onPress={() => navigation.navigate("Settings")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>Settings</Text>
						<Image source={cog} style={styles.icon} />

					</TouchableOpacity> */}

					<TouchableOpacity
						style={styles.card}
						onPress={() => {
							storeData("log", null);
							navigation.navigate("Welcome");
						}}
					>
						<Text style={styles.buttonText}>Clear Credentials</Text>
						<Image source={cog} style={styles.icon} />
					</TouchableOpacity>

					<Text
						style={{
							color: "black",
							textAlign: "center",
							marginBottom: 10,
							width: "80%",
							position: "absolute",
							bottom: "10%",
						}}
					>
						This button is intended for use ONLY in case of an emergency.
					</Text>

					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						style={{
							alignSelf: "center",
							alignItems: "center",
							backgroundColor: "#A32E2E",
							width: "80%",
							padding: 10,
							borderRadius: 20,
							position: "absolute",
							bottom: "5%",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 4,
						}}
					>
						<Text style={{ color: "white" }}>EMERGENCY 911</Text>
					</TouchableOpacity>
				</View>

				<Modal
					animationType="none"
					visible={modalVisible}
					transparent={true}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View
						style={[
							styles.container,
							{ backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
						]}
					>
						<View style={styles.emergencyConfirm}>
							<Text
								style={{
									textAlign: "center",
									marginBottom: 10,
									color: "#9C0000",
									fontWeight: "bold",
									fontSize: 24,
								}}
							>
								Warning!
							</Text>
							<Text
								style={{
									textAlign: "center",
									marginBottom: 20,
									marginHorizontal: "10%",
								}}
							>
								This button is intended for use ONLY in case of an emergency. If
								you are in immediate danger and you require immediate help call
								911.
							</Text>
							<View
								style={{ flexDirection: "row", justifyContent: "space-evenly" }}
							>
								<TouchableOpacity
									onPress={() => setModalVisible(!modalVisible)}
									style={{
										width: "40%",
										backgroundColor: "#D9D9D9",
										borderRadius: 20,
										padding: 10,
										textAlign: "center",
									}}
								>
									<Text style={{ color: "black", textAlign: "center" }}>
										Cancel
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => Linking.openURL(`tel:${911}`)}
									style={{
										backgroundColor: "#A32E2E",
										width: "40%",
										alignItems: "center",
										borderRadius: 20,
										padding: 10,
									}}
								>
									<Text style={{ color: "white", textAlign: "center" }}>
										Call 911
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: "center",
		// justifyContent: "flex-start",
	},
	emergency: {
		flex: 1,
		justifyContent: "flex-end",
		//marginBottom: 50,
		paddingBottom: 50,
		backgroundColor: "white",
	},
	emergencyConfirm: {
		backgroundColor: "white",
		borderRadius: 20,
		marginHorizontal: "5%",
		paddingVertical: "5%",
	},
	buttonSpacing: {
		margin: 5,
	},
	emergencyChoice: {
		flexDirection: "row",
	},
	button: {
		backgroundColor: "white",
		width: "80%",
		height: 100,
		alignSelf: "center",
	},
	buttonText: {
		textAlign: "center",
		marginLeft: "10%",
		color: "#003C98",
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
		width: 50,
		height: 50,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "11%",
	},
	icon: {
		resizeMode: "contain",
		width: "40%",
		height: "50%",
	},
	card: {
		backgroundColor: "white",
		width: "80%",
		height: "10%",
		borderRadius: 20,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
});

export default HomeScreen;
