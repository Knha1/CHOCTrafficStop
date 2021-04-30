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

function HomeScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={[styles.base]}>
			<ImageBackground
				source={bg}
				style={{
					borderTopRightRadius: 60,
					borderTopLeftRadius: 60,
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%"
				}}
			>
				<View style={{ height: "70%", padding: 20, alignItems: "center" }}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Survey Categories")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>Take Resource Survey</Text>
						<Image source={callCenter} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Resource List")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>See Past Resources</Text>
						<Image source={schedule} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Resource List")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>View All Resources</Text>
						<Image source={charity} style={styles.icon} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Settings")}
						style={styles.card}
					>
						<Text style={styles.buttonText}>Settings</Text>
						<Image source={cog} style={styles.icon} />
					</TouchableOpacity>
				</View>

				<View style={styles.emergency}>
					<Text
						style={{ color: "#F1F2F2", textAlign: "center", marginBottom: 10 }}
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
							borderTopRightRadius: 20,
							borderTopLeftRadius: 20,
							borderBottomRightRadius: 20,
							borderBottomLeftRadius: 20,
						}}
					>
						<Text style={{ color: "white" }}>EMERGENCY 911</Text>
					</TouchableOpacity>
				</View>

				<Modal
					animationType="none"
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={[styles.emergencyConfirm, { paddingBottom: 20 }]}>
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
						<Text style={{ textAlign: "center", marginBottom: 20 }}>
							This button is intended for use ONLY in case of an emergency. Are
							you sure you want to call 911?
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								flexWrap: "wrap",
							}}
						>
							<TouchableOpacity
								onPress={() => setModalVisible(!modalVisible)}
								style={{
									height: "100%",
									width: "45%",
									backgroundColor: "#D9D9D9",
									borderRadius: 20,
									padding: 4,
									textAlign: "center",
								}}
							>
								<Text style={{ color: "black", textAlign: "center" }}>
									Cancel
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor: "#A32E2E",
									height: "100%",
									width: "45%",
									alignItems: "center",
									borderRadius: 20,
									padding: 4,
								}}
							>
								<Text style={{ color: "white", textAlign: "center" }}>
									Call 911
								</Text>
							</TouchableOpacity>
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
		backgroundColor: colors.bg,
		alignItems: "center",
		justifyContent: "center",
	},
	emergency: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 50,
	},
	emergencyConfirm: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		margin: "10%",
		marginVertical: "85%",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
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
		height: "100%",
		borderTopRightRadius: 60,
		borderTopLeftRadius: 60,
	},
	icon: {
		resizeMode: "contain",
		width: "40%",
		height: "50%",
	},
	card: {
		backgroundColor: "#F1F2F2",
		width: "80%",
		height: "15%",
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
});

export default HomeScreen;
