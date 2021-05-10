import React, { useState } from "react";
import {
	Text,
	SafeAreaView,
	StyleSheet,
	SectionList,
	FlatList,
	TouchableOpacity,
	View,
} from "react-native";

import colors from "../../config/colors";

var sections = [
    {
		title: "Coping",
		innerData: [
			{ name: "Understand & Managing Your Health" },
            { name: "Stress and Coping" },
            { name: "Positive Emotions" },
		],
	},
    {
		title: "Food / Fitness",
		innerData: [
			{ name: "Healthy Relationships with Food & Exercise" },
			{ name: "Food Pantries in Orange County" },
            { name: "Exercise and Fitness" },
		],
	},
    {
		title: "Health / Wellness",
		innerData: [
			{ name: "Be Your Best Self" },
			{ name: "Relaxation and Breathing" },
            { name: "Meditations" },
            { name: "Yoga" },
		],
	},
    {
		title: "Mindfulness",
		innerData: [
			{ name: "How to Be Mindful" },
			{ name: "Mindfulness Exercises" },
		],
	},
    {
		title: "Relationships",
		innerData: [
			{ name: "Understanding Other Teens" },
			{ name: "Healthy Relationships" },
			{ name: "Abusive Relationships" },
            { name: "Stress and Coping" },
            { name: "Asking for Help" },
		],
	},
	{
		title: "Sleep",
		innerData: [
			{ name: "Preventing Nightmares" },
			{ name: "Counteracting Restfulness" },
		],
	},
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Text style={[styles.title, textColor]}>{item.title}</Text>
);

function CHOCResourceList({ navigation }) {
	const renderItem = ({ sections }) => {
		return (
			<Item
				item={sections.innerData}
				onPress={() => (backgroundColor = "#3248a8")}
			/>
		);
	};

	return (
		<View>
			<Text style={styles.header}>CHOC Resources</Text>
			<FlatList
				data={sections}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					const color = "black";
					const backgroundColor = "white";
					return (
						<View>
							<View>
								<Text style={styles.title}>{item.title}</Text>
							</View>

							<FlatList
								data={item.innerData}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item: innerData, index }) => (
									<View style={styles.cards}>
										<TouchableOpacity
											style={styles.links}
											onPress={() => navigation.navigate("Resource Details")}
										>
											<Text style={styles.resourceTitle}>{innerData.name}</Text>
											<Text>Info about Resource</Text>
										</TouchableOpacity>
									</View>
								)}
							/>
						</View>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9F9F9",
	},
	header: {
		color: "#003C98",
		alignSelf: "center",
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 12,
	},
	subtext: {
		fontSize: 14,
		textAlign: "center",
		alignSelf: "center",
		width: 330,
		paddingBottom: 15,
		color: "#585858",
	},
	links: {
		paddingLeft: 10,
		paddingBottom: 20,
		paddingTop: 10,
	},
	cards: {
		backgroundColor: "white",
		paddingBottom: 10,
		borderRadius: 15,
		margin: 5,
		width: "87%",
		alignSelf: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
	},
	title: {
		color: "#000",
		alignSelf: "flex-start",
		padding: 10,
		paddingLeft: 20,
		fontSize: 16,
	},
	resourceTitle: {
		color: "#003C98",
	},
	button: {
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		elevation: 2,
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		backgroundColor: "#0066BB",
		borderRadius: 30,
		height: 45,
		width: 340,
		marginBottom: 15,
	},
});

export default CHOCResourceList;
