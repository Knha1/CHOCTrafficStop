import React from "react";
import { Text, StyleSheet, SectionList, View } from "react-native";

import colors from "../config/colors";

function ResourceListScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{ title: "Sleep", data: ["LINK 1", "LINK 2"] },
					{ title: "Coping", data: ["LINK 1", "LINK 2", "LINK 3"] },
					{ title: "Mindfulness", data: ["LINK 1", "LINK 2", "LINK 3"] },
					{ title: "Relationships", data: ["LINK 1", "LINK 2", "LINK 3"] },
					{ title: "Health / Wellness", data: ["LINK 1", "LINK 2", "LINK 3"] },
					{ title: "Food / Fitness", data: ["LINK 1", "LINK 2", "LINK 3"] },
					{ title: "Other", data: ["LINK 1", "LINK 2", "LINK 3"] },
				]}
				renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
				renderSectionHeader={({ section }) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				keyExtractor={(item, index) => index}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg,
		paddingTop: 20,
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: "bold",
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

export default ResourceListScreen;
