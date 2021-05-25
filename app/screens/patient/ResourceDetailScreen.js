import React, { useEffect, useState } from "react";
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
	ActivityIndicator,
} from "react-native";
import backArrowWhite from "../../assets/backArrowWhite.png";

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import { readData } from "../../utils/DataHandler";

function ResourceDetailScreen({ route, navigation }) {
	var resource = route.params;
	const resource_id = resource["resource_id"];
	// State variable to show loading screen if resource details aren't loaded yet
	const [isLoading, setLoading] = useState(true);
	// State variable to store data for resource details
	const [data, setData] = useState([]);

	useEffect(() => {
		readData("resources")
			.then((resources) => {
				var resources = JSON.parse(resources);

				// Index of resource is resource_id - 1
				var current_resource = resources[resource_id - 1];

				// Set value to 'N/A' if detail isn't supplied
				for (var key in current_resource) {
					if (current_resource[key] == "") {
						current_resource[key] = "N/A";
					}
				}

				setData(current_resource);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [isLoading]);

	return (
		<View style={styles.container}>
			<Text style={styles.topText}>Resource Details</Text>
			<Image
						style={styles.backArrow}
						source={backArrowWhite}
						onPress={() => navigation.navigate("Resource List")}
						// TODO: Check if navigating back works
			></Image>
					
			{isLoading ? (
				// If still loading
				<ActivityIndicator size="small" color="#0000ff" />
			) : (
				// If done loading
				
				<View style={styles.bottomContainer}>
					
					
						<View>
						<Text style={styles.categoryText}>{data["category"]}</Text>
							<Text style={styles.text}>{data["name"]}</Text>
							
							<Text style={styles.infoText}>
								Organization: {data["organization"]}
							</Text>
							<Text style={styles.infoText}>
								Availability: {data["availability"]}
							</Text>
							<Text style={styles.infoText}>
								Phone Number: {data["phone_num"]}
							</Text>
							<Text style={styles.infoText}>Address: {data["address"]}</Text>
							<Text
								style={styles.infoText}
								onPress={() => {
									Linking.openURL(data["website"]);
									// TODO: Check if URL opening works
								}}
							>
								Website: {data["website"]}
							</Text>
							<Text style={styles.descriptionText}>{data["description"]}</Text>
						</View>
					</View>
				 
			)}
		</View>
	);
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0066BB",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 130,
		
	},
	backArrow: {
		height: 34,
		width: 34,
		alignSelf: "flex-start",
		left: 30,
		top: '12%',
		position: 'absolute'
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
		fontSize: 22,
		color: "white",
		top: '12%',
		alignSelf: "center",
		position: "absolute"
	},
	text: {
		color: "#003C98",
		top: 0,
		left: 40,
		width: 300,
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
		height: '100%',
		alignSelf:"stretch",
		backgroundColor: "white",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		paddingTop: 35
		},
	buttonText: {
		color: "#000",
		alignSelf: "center",
	},
	infoText: {
		color: "black",
		top: 20,
		marginTop: 5,
		left: 40,
		fontSize: 16,
		width: 300,
	},
	categoryText: {
		fontSize: 16,
		color: "black",
		left: 40,
	},
	descriptionText: {
		fontSize: 16,
		width: 300,
		left: 40,
		top: 60,
	},
});

export default ResourceDetailScreen;













// return (
// 	<SafeAreaView style={styles.container}>
// 		<Image style={styles.backArrow} source={backArrowWhite}></Image>
// 		<View style={styles.bottomContainer} contentContainerStyle={styles.contentContainer}>
// 		<KeyboardAvoidingView
// 			behavior="height"
// 			style={{flex: 1}}
// 			enabled={true}>
				
		
			
// 				<Text style={styles.text}>Edit Resource</Text>

// 				<Text style = {styles.text3}>Title</Text>
// 				<TextInput
// 					style={styles.input}
// 					defaultValue = "Getting Enough Sleep"
// 				/>

// 				<Text style = {styles.text3}>Tags</Text>
// 				<TextInput
// 					style={styles.input}
// 					defaultValue = "SLEEP"
// 				/>

// 				<Text style = {styles.text3}>Organization</Text>
// 				<TextInput
// 					style={styles.input}
// 					defaultValue = "CHOC"
// 				/>

// 				<Text style = {styles.text3}>Availability</Text>
// 				<TextInput
// 					style={styles.input}
// 					defaultValue = "24/7; Online Resource"
// 				/>

// 				<Text style = {styles.text3}>Phone Number</Text>
// 				<TextInput
// 					style={styles.input}
// 					defaultValue = "714-997-3000"
// 				/>

// 				<Text style = {styles.text3}>Address</Text>
// 				<TextInput
// 					style={styles.input}
// 					defaultValue = "https://kidshealth.org/CHOC/en/teens/how-much-sleep.html"
// 				/>
				
// 				<Text style = {styles.text3}>Description</Text>
// 				<TextInput
// 					style={styles.input}
// 					defaultValue = "Tips for sleeping better at night."
// 				/>
				
// 		</KeyboardAvoidingView>
		
		
		
// 		<View style={{position:"absolute", bottom: '15%'}}>
// 			<TouchableOpacity
// 					onPress={() => navigation.navigate("Statistics Details")}
// 					style={styles.cancelButton}>
// 					<Text style={{color: '#0E4B9D'}}>Cancel</Text>
// 			</TouchableOpacity>
// 			<TouchableOpacity
// 					onPress={() => navigation.navigate("Statistics Details")}
// 					style={styles.saveButton}>
// 					<Text style={{color: 'white'}}>Save Changes</Text>
// 			</TouchableOpacity>
// 		</View>
// 		</View>
// 	</SafeAreaView>
// );
// }

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// backgroundColor: "#0066BB",
// alignItems: "center",
// justifyContent: "flex-start",
// paddingTop: 100,
// },
// contentContainer: {
// justifyContent: 'flex-end',
// //height: '90%',
// },
// input: {
// height: 30,
// width: '80%',
// left: 40,
// top: 36,
// fontSize: 18
// },
// backArrow: {
// height: 34,
// width: 34,
// alignSelf: "flex-start",
// left: 30,
// bottom: 25,
// },
// text: {
// color: "#003C98",
// top: 34,
// left: 40,
// fontWeight: "bold",
// fontSize: 24,
// },
// bottomContainer: {
// flex: 1,
// height: '100%',
// alignSelf:"stretch",
// backgroundColor: "white",
// borderTopRightRadius: 30,
// borderTopLeftRadius: 30,
// },
// buttonText: {
// color: "#000",
// alignSelf: "center",
// },
// text2: {
// color: "black",
// top: 50,
// left: 40,
// fontSize: 14,
// width: 300,
// marginTop: 5
// },
// text3: {
// fontSize: 16,
// color: "black",
// top: 38,
// left: 40,
// fontWeight: 'bold'
// },
// cancelButton: {
// position: 'absolute',
// margin: 3,
// //top: '95%',
// //bottom: 0,
// left: 40,
// alignItems: "center",
// justifyContent: "center",
// backgroundColor: "white",
// borderColor: "#0E4B9D",
// borderRadius: 30,
// borderWidth: 2,
// height: 45,
// width: 129
// },
// saveButton: {
// position: 'absolute',
// margin: 3,
// left: 180,
// //top: '95%',
// alignItems: "center",
// justifyContent: "center",
// backgroundColor: "#0E4B9D",
// borderRadius: 30,
// height: 45,
// width: 168
// }
// });

