import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	Modal,
	ImageBackground,
	TouchableOpacity,
	Image,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import back from "../../assets/backArrowWhite.png";
// import PureChart from 'react-native-pure-chart';

function StatisticsHomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={bg}
				style={{
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%",
					width: "100%",
				}}
			>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={back} style={styles.backButton}></Image>
				</TouchableOpacity>
				{/* <Text style={{
						marginTop: "11%",
						fontSize: 20,
						alignSelf: "center",
						color: "white",
						position: 'absolute',
					}}
				>
					Resources Accessed
				</Text> */}

				{/* <Text style = {{paddingTop: 10, fontSize:15 , alignSelf: 'center', padding: 40}}>Statistics Wheel here :-)</Text> */}
				<View style={{ alignItems: "center" }}>
					{/* <PureChart  data={[
					{
					value: 50,
					label: 'resource1',
					color: '#56E9CE',
					}, {
					value: 40,
					label: 'resource2',
					color: '#9B3DE5'
					}, {
					value: 25,
					label: 'resource3',
					color: '#2641CE'
					}
				
				]} type='pie' /> */}
				</View>

				<View style={styles.base}>
					<Text
						style={{
							marginTop: "10%",
							fontSize: 24,
							alignSelf: "flex-start",
							textAlign: "left",
							marginLeft: "10%",
							color: "#003C98",
							fontWeight: "bold",
						}}
					>
						Top 3 Resources Accessed
					</Text>
					<Text
						style={{
							marginLeft: "10%",
							fontSize: 16,
							marginBottom: 15,
							color: "#888888",
						}}
					>
						From DATE-DATE
					</Text>
					<Text style={styles.resourceText}>Resource 1</Text>
					<Text style={styles.resourceText}>Resource 2</Text>
					<Text style={styles.resourceText}>Resource 3</Text>

					<View
						style={{
							flexDirection: "row",
							position: "absolute",
							bottom: 30,
							left: 40,
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("Export Data")}
							style={{
								backgroundColor: "#DFDFDF",
								alignSelf: "center",
								borderRadius: 64,
								padding: 15,
								marginHorizontal: 10,
							}}
						>
							<Text style={[styles.buttonText, { color: "#003C98" }]}>
								Export Data
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Statistics List")}
							style={{
								backgroundColor: "#0E4B9D",
								alignSelf: "center",
								borderRadius: 64,
								padding: 15,
								marginHorizontal: 10,
							}}
						>
							<Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
								More Details
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: colors.bg,
		// alignItems: "center",
		flexDirection: "row",
	},
	buttonSpacing: {
		margin: 5,
	},
	emergencyChoice: {
		flexDirection: "row",
	},
	base: {
		// marginTop: "1%",
		backgroundColor: "#F1F2F2",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
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
	resourceText: {
		marginTop: "2%",
		marginHorizontal: "12%",
		textAlign: "left",
		borderRadius: 6,
		backgroundColor: "#F9F9F9",
		padding: 8,
		width: "76%",
	},
	buttonText: {
		fontSize: 16,
		textAlign: "center",
		minWidth: "30%",
	},
});

export default StatisticsHomeScreen;
