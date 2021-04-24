import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal } from "react-native";

import colors from "../config/colors";

function AdminHomeScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<View style={styles.buttonSpacing}>
					<Button title="View Statistics"
							onPress={() => navigation.navigate("View Statistics")}
					/>
				</View>
				<View style={styles.buttonSpacing}>
					<Button
						title="Edit/View Resource List"
						onPress={() => navigation.navigate("Statistics Details")}
					/>
				</View>
				<View style={styles.buttonSpacing}>
					<Button
						title="Export Data"
						onPress={() => navigation.navigate("Export Data")}
					/>

				<View style={styles.buttonSpacing}>
					<Button
						title="Add Resource +"
						color = "red"
						onPress={() =>
							navigation.navigate('Add Resource')
						}
						/>
					</View>
				</View>
			</View>
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

export default AdminHomeScreen;
