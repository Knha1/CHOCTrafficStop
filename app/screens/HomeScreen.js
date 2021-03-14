import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal } from "react-native";

import colors from "../config/colors";

function HomeScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<View style={styles.buttonSpacing}>
					<Button title="Take Resource Survey" />
				</View>
				<View style={styles.buttonSpacing}>
					<Button title="See Past Resources" />
				</View>
				<View style={styles.buttonSpacing}>
					<Button
						title="View All Resources"
						onPress={() => navigation.navigate("Resource List")}
					/>
				</View>
			</View>

			{/* Emergency Button - with confirmation pop up */}
			<View style={styles.emergency}>
				<Button
					title="EMERGENCY 911"
					color="red"
					onPress={() => setModalVisible(true)}
				/>
			</View>
			{/* Emergency Confirmation Pop-Up */}
			<Modal
				animationType="none"
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.container}>
					<View style={styles.emergencyConfirm}>
						<Text>Are you sure you want to call 911?</Text>
						<View style={styles.emergencyChoice}>
							<View style={styles.buttonSpacing}>
								<Button
									title="NO"
									color="red"
									onPress={() => setModalVisible(!modalVisible)}
								/>
							</View>
							<View style={styles.buttonSpacing}>
								<Button title="YES" />
							</View>
						</View>
					</View>
				</View>
			</Modal>
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
});

export default HomeScreen;
