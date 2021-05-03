import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, ImageBackground, TouchableOpacity} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";
import bg from "../../assets/background.png";

function StatisticsHomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<ImageBackground source={bg}
				style={{
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%",
					width: "100%"
				}}>

				<Text style = {{marginTop: "5%", fontSize:20 , alignSelf: 'center', padding: 20, color: 'white', fontWeight: "bold"}}>Resources Accessed</Text>
				<Text style = {{paddingTop: 10, fontSize:15 , alignSelf: 'center', padding: 40}}>Statistics Wheel here :-)</Text>
				

				<View style={styles.base}>
					<Text style={{marginLeft: "10%", marginTop: "8%", fontSize:18, marginBottom:5, color: "#003C98"}}>Top 3 Resources Accessed</Text>
					<Text style={{marginLeft: "10%", fontSize:14, marginBottom:15, color: "#888888"}}>From DATE-DATE</Text>
					<Text style={styles.resourceText}>Resource 1</Text>
					<Text style={styles.resourceText}>Resource 2</Text>
					<Text style={styles.resourceText}>Resource 3</Text>


					<View style={{flexDirection: "row", position: "absolute", bottom: 30, left: 40 }}>
						<TouchableOpacity onPress={() =>navigation.navigate('Export Data')} 
						style={{
							backgroundColor: "#DFDFDF",
							alignSelf: "center",
							borderRadius: 20,
							padding: 15,
							marginHorizontal: 10
						}}>
							<Text style={[styles.buttonText, {color: "#003C98"}]}>Export Data</Text>

						</TouchableOpacity>
						<TouchableOpacity onPress={() =>navigation.navigate('View Resource')}
						style={{
							backgroundColor: "#0E4B9D",
							alignSelf: "center",
							borderRadius: 20,
							padding: 15,
							marginHorizontal: 10
						}}>
							<Text style={[styles.buttonText, {color: "#FFFFFF"}]}>More Details</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>

		</View>
    //     <View style={{padding: 10}}>
    //     <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Resources Accessed</Text>

    //     <View
    //     style={{
    //         borderBottomColor: 'grey',
    //         borderBottomWidth: 1,
    //         marginBottom: 15
    //     }}
    //     />

    //     <Text style = {{paddingTop: 10, fontSize:15 , alignSelf: 'center', padding: 40}}>Statistics Wheel here :-)</Text>

    //     <View style ={{marginTop: 10, margin:5}}>

    //     <Text style={{fontSize:15, marginBottom:5}}>Top 3 Resources Accessed</Text>
    //     <Text>From DATE-DATE</Text>
        
    //     <View style ={{marginTop: 10, margin:5}}></View>

    //     <Text>Resource 1</Text>
    //     <View style ={{marginTop: 10, margin:5}}></View>
    //     <Text>Resource 2</Text>
    //     <View style ={{marginTop: 10, margin:5}}></View>
    //     <Text>Resource 3</Text>
    //     <View style ={{marginTop: 10, margin:5}}></View>
        
	// 	<View style={styles.buttonSpacing}>
	// 	<Button
    //       title="Export Data"
	// 	  color = "blue"
    //       onPress={() =>
    //         navigation.navigate('Export Data')
    //       }
    //     />
	// 	</View>

    //       {/* need to add a new screen for this */}
    //     <View style={styles.buttonSpacing}>
	// 	<Button
    //       title="More Details"
	// 	  color = "blue"
    //       onPress={() =>
    //         navigation.navigate('View Resource')
    //       }
    //     />
	// 	</View>
	
    //     </View>
    //    </View>
    );
    
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg,
		alignItems: "center",
		justifyContent: "center",
	},
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
	base: {
		marginTop: "45%",
		backgroundColor: 'white',
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
	},
	resourceText:{
		marginTop: "2%",
		marginHorizontal: "12%",
		textAlign: "left",
		borderRadius: 6,
		backgroundColor: "#F9F9F9",
		padding: 8,
		width: "76%"
	},
	buttonText:{
		fontSize: 16,
		textAlign: "center",
		minWidth: "30%"
	}
});

export default StatisticsHomeScreen;