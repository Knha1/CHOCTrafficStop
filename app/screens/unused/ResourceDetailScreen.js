import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

import colors from "../../config/colors";

function ResourceDetailScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Resource Detail Screen</Text>
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
});

export default ResourcesScreen;
