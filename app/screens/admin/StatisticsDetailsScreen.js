import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, ImageBackground, TouchableOpacity} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";
import bg from "../../assets/background.png";

function StatisticsDetailsScreen({ navigation }) {
	return (
        <View style={styles.container}>
			<ImageBackground
				source={bg}
				style={{
					overflow: "hidden",
					resizeMode: "stretch",
					height: "100%",
				}}
			>

				<View style={[
						styles.base,
						{ height: "70%", padding: 20, alignItems: "center"},
					]}>
				<Text style = {{marginTop: "1%", fontSize: 16, alignSelf: "flex-start", textAlign: "left", marginLeft: "8%", color: "#797979", fontWeight: 'bold'}}>Details</Text>
				<Text style = {styles.textTitle}>Resource Name</Text>
				{/* <View
					style={{
						borderBottomColor: 'white',
						borderBottomWidth: 1,
						marginBottom: 15
					}}
					/> */}
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
 					<View style={{flex: 1, height: 1, backgroundColor: '#D2D2D2', marginHorizontal: '5%'}}/>
				</View>
				<Text style={styles.textDetails}> Most Viewed: 35 times </Text>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
 					<View style={{flex: 1, height: 1, backgroundColor: '#D2D2D2', marginHorizontal: '5%'}}/>
				</View>
				<Text style={styles.textDetails}> Least Viewed: 12 times </Text>   
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
 					<View style={{flex: 1, height: 1, backgroundColor: '#D2D2D2', marginHorizontal: '5%'}}/>
				</View>
				<Text style={styles.textDetails}> Current views for today: 14 times </Text>   
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
 					<View style={{flex: 1, height: 1, backgroundColor: '#D2D2D2', marginHorizontal: '5%'}}/>
				</View>
				<Text style={styles.textDetails}> Total times accessed: 264 times </Text>   
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
 					<View style={{flex: 1, height: 1, backgroundColor: '#D2D2D2', marginHorizontal: '5%'}}/>
				</View>

				{/* <View style={styles.buttonSpacing}> */}
				{/* <Button
				title="View Resource ->"
				color = "blue"
				onPress={() =>
					navigation.navigate('View Resource')
				}
				/> */}

				<TouchableOpacity
						onPress={() => navigation.navigate('View Resource')}
						style={{
							alignSelf: "center",
							alignItems: "center",
							backgroundColor: "#0E4B9D",
							width: "50%",
							padding: 10,
							borderRadius: 20,
							position: "absolute",
							bottom: "5%",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 4,
						}}
					>
						<Text style={{ color: "white" }}>View Resource</Text>
					</TouchableOpacity>
				</View>
			
				{/* </View> */}
		</ImageBackground>
       </View>
    );
    
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: colors.bg,
		// alignItems: "center",
		// justifyContent: "center",
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
		marginTop: "20%",
		backgroundColor: "#F1F2F2",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
	},
	textTitle: {
		marginTop: "2%",
		fontSize: 26,
		alignSelf: "flex-start",
		textAlign: "left",
		marginLeft: "8%",
		marginBottom: "5%",
		color: "#003C98",
		fontWeight: 'bold'
	},
	textDetails:{
		marginVertical: '5%',
		fontSize: 18,
		alignSelf: "flex-start",
		textAlign: "left",
		marginLeft: "8%",
		marginBottom: "5%",
		color: "#292929",
	},
});

export default StatisticsDetailsScreen;