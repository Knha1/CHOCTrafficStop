import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	Modal,
	ImageBackground,
	TouchableOpacity,
	Image,
} from "react-native";

import colors from "../../config/colors";
import schedule from "../../assets/schedule1.png";
import clipboard from "../../assets/clipboard1.png";
import file from "../../assets/file.png";
import bg from "../../assets/background.png";
import back from "../../assets/backArrowWhite.png";
import cog from "../../assets/settings1.png";
import charity from "../../assets/charity1.png";
import { storeData, readData } from "../../utils/DataHandler.js";

function AdminHomeScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={[styles.container]}>
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
				<View
					style={[
						styles.base,
						{ height: "70%", padding: 20, alignItems: "center" },
					]}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate("Statistics Home")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>View Statistics</Text>
						<Image source={clipboard} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Admin Resource List")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>View Resource List</Text>
						<Image source={charity} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Statistics Details")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>Edit/View Resource List</Text>
						<Image source={schedule} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Export Data")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>Export Data</Text>
						<Image source={file} style={styles.icon} />
					</TouchableOpacity>

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

					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						style={{
							alignSelf: "center",
							alignItems: "center",
							backgroundColor: "#4B9E76",
							width: "80%",
							padding: 10,
							borderRadius: 20,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 4,
						}}
					>
						<Text style={{ color: "white" }}>Add Resource +</Text>
					</TouchableOpacity>
				</View>
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
		width: 50,
		height: 50,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "11%",
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
	buttonText: {
		textAlign: "left",
		marginLeft: "10%",
		color: "#003C98",
		flexWrap: "wrap",
		width: "50%",
	},
	icon: {
		resizeMode: "contain",
		width: "40%",
		height: "50%",
	},
});

export default AdminHomeScreen;
