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
			{ name: "RESOURCE 1" }, 
			{ name: "RESOURCE 2" }],
	},
	{
		title: "Food / Fitness",
		innerData: [
			{ name: "RESOURCE 1" },
			{ name: "RESOURCE 2" },
			{ name: "RESOURCE 3" },
		],
	},
	{
		title: "Health / Wellness",
		innerData: [
			{ name: "RESOURCE 1" },
			{ name: "RESOURCE 2" },
			{ name: "RESOURCE 3" },
		],
	},
	{
		title: "Mindfulness",
		innerData: [
			{ name: "RESOURCE 1" },
			{ name: "RESOURCE 2" },
			{ name: "RESOURCE 3" },
		],
	},
	{
		title: "Relationships",
		innerData: [
			{ name: "RESOURCE 1" }, 
			{ name: "RESOURCE 2" }],
	},
	{
		title: "Sleep",
		innerData: [
			{ name: "RESOURCE 1" }, 
			{ name: "RESOURCE 2" }],
	},
	{
		title: "Other",
		innerData: [
			{ name: "RESOURCE 1" },
			{ name: "RESOURCE 2" },
			{ name: "RESOURCE 3" },
		],
	},
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Text style={[styles.title, textColor]}>{item.title}</Text>
);

function ResourceListScreen({ navigation }) {
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
			<Text style={styles.header}>Resources for You</Text>
			<Text style={styles.subtext}>
				Based on your survey results, here are some resources that might be
				helpful to you.
			</Text>
			<TouchableOpacity style={styles.button}>
				<Text style={{ color: "white" }}>Review and Edit My Answers</Text>
			</TouchableOpacity>
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
		paddingTop: 60,
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
		fontSize: 16
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

export default ResourceListScreen;
