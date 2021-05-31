import React from "react";
import { Text, View, StyleSheet, Button, Modal } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../config/colors";

function SettingsScreen({ navigation }) {
	return (
		<View styles={styles.container}>
			{/*container for the text*/}
			<View styles={styles.container}>
				<Text
					style={{
						alignSelf: "center",
						fontSize: hp("3%"),
						paddingTop: 20,
						paddingBottom: 10,
					}}
				>
					Name: Jonathan Doe
				</Text>
				<Text
					style={{ alignSelf: "center", fontSize: hp("3%"), paddingBottom: 20 }}
				>
					Language: English
				</Text>
			</View>

			{/*Cointainer for the buttons*/}
			<View styles={styles.cointainer}>
				<View style={styles.buttonSpacing}>
					<Button title="Change Name" />
				</View>
				<View style={styles.buttonSpacing}>
					<Button title="Change Language" />
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

	buttonSpacing: {
		margin: 5,
		width: 250,
		alignSelf: "center",
		padding: 4,
	},
});

export default SettingsScreen;
