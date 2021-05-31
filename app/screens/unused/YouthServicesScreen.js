import React, { useState } from "react";
import {
	Text,
	SafeAreaView,
	StyleSheet,
	SectionList,
	FlatList,
	TouchableOpacity,
	View,
	Linking,
	ImageBackground,
	Image,
	ScrollView,
} from "react-native";

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import back from "../../assets/backArrowBlack.png";

// var ProjectChoice = () => {Linking.openURL('https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/')}

var sections = [
	{
		title: "PROJECT CHOICE",
		innerData: [
			{
				name: "Individual Case Management",
				description:
					"Work together with Project CHOICE to develop safety plans and receive all the support you need.",
				website:
					"https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/",
			},
			{
				name: "Safety Planning",
				description: "Create a safety plan with the team at Project CHOICE.",
				website:
					"https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/",
			},
			{
				name: "Medical, Mental Health & Substance Use Support",
				description:
					"Receive support for mental health, medical health, and substance abuse.",
				website:
					"https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/",
			},
			{
				name: "Housing Referrals",
				description: "Be referred to affordable houing resources.",
				website:
					"https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/",
			},
			{
				name: "Education & Employment Assistance",
				description:
					"Get help and support in finding education and employment opportunities.",
				website:
					"https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/",
			},
			{
				name: "Court Support & Advocacy",
				description: "Find someone to support and advocate for you in Court.",
				website:
					"https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/",
			},
			{
				name: "Linkages to Community Resources",
				description:
					"Discover different kinds of community resources in Orange County.",
				website:
					"https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/",
			},
		],
	},
	{
		title: "WAYMAKERS",
		innerData: [
			{
				name: "Waymakers: Victim assistance Programs",
				description: "Victim assistance",
				website: "https://waymakersoc.org/",
			},
			{
				name: "Victim Services",
				description:
					"safety planning, crisis response, victim assistance for all crimes (human trafficking / rape crisis), court advocacy.",
				website: "https://waymakersoc.org/",
			},
		],
	},
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Text style={[styles.title, textColor]}>{item.title}</Text>
);

function YouthServicesScreen({ navigation }) {
	const renderItem = ({ sections }) => {
		return (
			<Item
				item={sections.innerData}
				onPress={() => (backgroundColor = "#3248a8")}
			/>
		);
	};

	return (
		<ScrollView>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image source={back} style={styles.backButton}></Image>
			</TouchableOpacity>
			<Text style={styles.header}>Youth Support Services</Text>
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
								contentContainerStyle={{ paddingBottom: 10 }}
								data={item.innerData}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item: innerData, index }) => (
									<View style={styles.cards}>
										<ImageBackground
											source={bg}
											style={{
												overflow: "hidden",
												resizeMode: "stretch",
												paddingBottom: 10,
												borderRadius: 15,
											}}
										>
											<TouchableOpacity
												style={styles.links}
												onPress={() => Linking.openURL(innerData.website)}
											>
												<Text style={styles.resourceTitle}>
													{innerData.name}
												</Text>
												<Text style={styles.descText}>
													{innerData.description}
												</Text>
											</TouchableOpacity>
										</ImageBackground>
									</View>
								)}
							/>
						</View>
					);
				}}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "blue",
	},
	header: {
		color: "#003C98",
		alignSelf: "center",
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 12,
		marginTop: "10%",
		position: "absolute",
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
		// paddingBottom: 20,
		paddingTop: 10,
	},
	cards: {
		backgroundColor: "white",
		// paddingBottom: 10,
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
		// borderWidth: 1,
		// borderColor: "#56E9CE",
		// borderRadius: 50,
	},
	title: {
		color: "#000",
		alignSelf: "flex-start",
		padding: 10,
		paddingLeft: 20,
		fontSize: 16,
		color: "#003C98",
	},
	resourceTitle: {
		color: "white",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 6,
	},
	descText: {
		color: "white",
		fontSize: 14,
		marginBottom: 4,
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
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "14%",
	},
});

export default YouthServicesScreen;
