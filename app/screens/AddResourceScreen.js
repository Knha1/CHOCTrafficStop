import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import colors from "../config/colors";

function AddResourceScreen({ navigation }) {
	return (
		<View style={{ padding: 10 }}>
			<Text
				style={{
					paddingTop: 10,
					fontSize: 20,
					alignSelf: "center",
					padding: 20,
				}}
			>
				Add a Resource
			</Text>

			<View
				style={{
					borderBottomColor: "grey",
					borderBottomWidth: 1,
					marginBottom: 15,
				}}
			/>

			<View style={{ marginTop: 10, margin: 5 }}>
				<form>
					<Text>Resource Name: </Text>
					<input type="text"></input>
					<Text>Address: </Text>
					<input type="text"></input>
					<Text>Hours: </Text>
					<input type="text"></input>
					<Text>Phone Number: </Text>
					<input type="text"></input>
					<Text>Website: </Text>
					<input type="text"></input>
				</form>

				<Button
					title="Add Resource"
					color="red"
					onPress={() => navigation.navigate("Admin Home")}
				/>
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

export default AddResourceScreen;
