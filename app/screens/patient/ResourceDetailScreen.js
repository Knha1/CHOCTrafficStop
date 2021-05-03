import React from "react";
import {
	ImageBackground,
	Linking,
	SimpleSurvey,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	TouchableOpacity,
	Icon,
	TouchableHighlight,
	Image,
} from "react-native";
import backArrowWhite from "../../assets/backArrowWhite.png";

import colors from "../../config/colors";
import bg from "../../assets/background.png";

function ResourceDetailScreen({ navigation }) {
	return (
		<View style={styles.container}>
			{/* <Text style={styles.topText}>Resource Details</Text> */}
			<Image style={styles.backArrow} source = {backArrowWhite}></Image>
			<View style={styles.bottomContainer}>
				
				<View>
					<Text style={styles.text}>Getting Enough Sleep</Text>
					<Text style={styles.text3}>SLEEP</Text>
					<Text style={styles.text2}>
						Description: Tips for getting enough sleep
					</Text>
					<Text style={styles.text2}>Organization: CHOC</Text>
					<Text style={styles.text2}>Availability: 24/7; Online Resource</Text>
					<Text style={styles.text2}>Phone Number: 714-997-3000</Text>
					<Text style={styles.text2}>Address: n/a</Text>
					<Text style={styles.text2} onPress={() => Linking.openURL('https://kidshealth.org/CHOC/en/teens/how-much-sleep.html')}>Website: https://kidshealth.org/CHOC/en/teens/how-much-sleep.html</Text>
					<Text style={styles.text4}>Resource Name provides tips for sleeping better at night...
					Nulla ultrices sed commodo in id arcu iaculis in urna. Euismod proin massa sed scelerisque nisi,
					tristique nisl sem cras. Sed arcu erat nullam in in phasellus sem arcu. Dui purus, malesuada dis
					elit aenean pulvinar arcu.{"\n"}{"\n"}

					Sed eget rhoncus laoreet ullamcorper suspendisse viverra tincidunt. Tortor diam id a dui aliquet
					a vulputate tellus. Est, massa tristique nunc egestas urna commodo fames duis. Aliquam curabitur 
					congue vel lectus ornare risus lectus. Tortor, sed sed dictum sed tellus amet. Dictum massa elementum 
					sagittis iaculis proin.</Text>
				</View>
			</View>
		</View>
	);
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0066BB",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 0,
		paddingTop: 100,
	},
	backArrow: {
		height: 34,
		width:34,
		alignSelf: 'flex-start',
		left: 30,
		bottom: 25
	},
	skipToResultsText: {
		color: "#CAEDFF",
		fontSize: 14,
		position: "absolute",
		top: 96,
		paddingBottom: 100,
	},
	rectangle: {
		height: 4,
		width: 320,
		borderRadius: 10,
		position: "absolute",
		top: 80,
		backgroundColor: "#FFF",
	},
	topText: {
		fontSize: 20,
		color: "#FFF",
		bottom: 40,
		alignSelf: "center",
		textAlign: "center",
		alignItems: "center",
	},
	text: {
		color: "#003C98",
		top: 34,
		left: 40,
		fontWeight: "bold",
		fontSize: 24,
	},
	button: {
		top: 55,
		height: 45,
		margin: 3,
		width: 280,
		borderRadius: 64,
		alignSelf: "center",
		backgroundColor: "#F8F8F8",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#D6D6D6",
		borderWidth: 1,
	},
	bottomContainer: {
		flex: 1,
		alignSelf: "stretch",
		backgroundColor: "#fff",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
	},
	buttonText: {
		color: "#000",
		alignSelf: "center",
	},
	text2: {
		color: "black",
		top: 50,
		left: 40,
		fontSize: 14,
		width: 300
	},
	text3: {
		fontSize: 16,
		color: 'black',
		top: 30,
		left: 40
	},
	text4: {
		fontSize: 14,
		width: 320,
		left: 40,
		top: 70
	}
});

export default ResourceDetailScreen;
