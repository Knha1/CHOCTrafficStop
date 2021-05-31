import React, { useState } from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { readData } from "../../utils/DataHandler.js";
// ASSET IMPORTS
import safetySecurity from "../../assets/SafetySecurityIcon.png";
import relationshipsSupport from "../../assets/RelationshipSupportIcon.png";
import mentalHealth from "../../assets/MentalHealthIcon.png";
import physical from "../../assets/PhysicalHealthWellbeingIcon.png";
import community from "../../assets/CommunityIcon.png";
import bg from "../../assets/background.png";
import back from "../../assets/backArrowBlack.png";

/**
 * Displays a list of categories of surveys to take
 * @param {object} navigation - @react-navigation prop
 * @returns - screen components
 */
function SurveyCategoriesScreen({ navigation }) {
	const [text, setText] = useState("");

	return (
		<ScrollView style={[styles.container]}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image source={back} style={styles.backButton}></Image>
			</TouchableOpacity>

			<View
				style={[
					styles.base,
					{
						height: "100%",
						justifyContent: "space-evenly",
					},
				]}
			>
				<ImageBackground
					source={bg}
					style={{
						overflow: "hidden",
						resizeMode: "stretch",
						height: "100%",
						width: "100%",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
					}}
				>
					<Text
						style={{
							marginTop: "10%",
							fontSize: 22,
							alignSelf: "center",
							textAlign: "center",
							marginBottom: "1%",
							color: "#F1F2F2",
						}}
					>
						What resources do you need?
					</Text>
					<Text style={styles.subtext}>
						Please select one of the following survey categories that best
						describes the kind of resources you are looking for.
					</Text>
					<Text
						style={[
							styles.subtext,
							{
								textDecorationLine: "underline",
								marginBottom: "5%",
							},
						]}
						onPress={() => {
							// Load previous tags to direct user to previous survey results
							var filterTags = [];
							readData("previousTags")
								.then((value) => {
									filterTags = JSON.parse(value);
									console.log(filterTags);
								})
								.finally(() => {
									console.log("navigating");
									console.log(filterTags);
									navigation.navigate("Resource Results", {
										tags: filterTags,
										prevScreen: "home",
									});
								});
						}}
					>
						Or, you can see your past resources here.
					</Text>

					<View style={styles.row}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("YesNo Question", {
									category: "Safety & Security",
								})
							}
							style={[styles.card, { flexDirection: "column" }]}
						>
							<Image source={safetySecurity} style={styles.icon} />
							<Text style={{ alignSelf: "center", textAlign: "center" }}>
								Safety and Security
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() =>
								navigation.navigate("YesNo Question", {
									category: "Relationships & Support",
								})
							}
							style={styles.card}
						>
							<Image source={relationshipsSupport} style={styles.icon} />
							<Text style={{ alignSelf: "center", textAlign: "center" }}>
								Relationships and Support
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() =>
								navigation.navigate("YesNo Question", {
									category: "Mental Health",
								})
							}
							style={styles.card}
						>
							<Image source={mentalHealth} style={styles.icon} />
							<Text style={{ alignSelf: "center", textAlign: "center" }}>
								Mental Health
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() =>
								navigation.navigate("YesNo Question", {
									category: "Physical Health & Wellbeing",
								})
							}
							style={styles.card}
						>
							<Image source={physical} style={styles.icon} />
							<Text style={{ alignSelf: "center", textAlign: "center" }}>
								Physical Health and Wellbeing
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() =>
								navigation.navigate("YesNo Question", {
									category: "Community",
								})
							}
							style={[styles.card, { flexDirection: "column" }]}
						>
							<Image source={community} style={styles.icon} />
							<Text style={{ alignSelf: "center", textAlign: "center" }}>
								Community
							</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: "center",
		//justifyContent: "flex-start",
	},
	title: {},
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
	subtext: {
		fontSize: 14,
		alignSelf: "center",
		marginStart: 20,
		marginVertical: "2%",
		color: "#F1F2F2",
		width: "90%",
	},
	card: {
		backgroundColor: "#F1F2F2",
		width: "44%",
		height: "28%",
		alignSelf: "flex-start",
		marginBottom: 10,
		marginHorizontal: 2,
		padding: 25,
		borderRadius: 20,
	},
	cardText: {
		color: "#F1F2F2",
	},
	base: {
		// marginTop: "18%",
		//backgroundColor: '#F1F2F2',
		alignSelf: "stretch",
		// flex: 1,
	},
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: "flex-start",
		marginBottom: "2%",
		marginLeft: "4%",
		marginTop: "11%",
	},
	icon: {
		resizeMode: "contain",
		width: 100,
		height: 75,
		alignSelf: "center",
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		marginBottom: "30%",
	},
});

export default SurveyCategoriesScreen;
