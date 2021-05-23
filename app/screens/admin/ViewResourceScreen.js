import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, ImageBackground, TouchableOpacity} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";
import bg from "../../assets/background.png";
//===========================================================================
// IGNORE THIS WHOLE PAGE. DID IT ON ACCIDENT WHEN I WASN'T SUPPOSED TO. -KIM
//===========================================================================
function ViewResourceScreen({ navigation }) {
	return (
        <View style={styles.container}>
		<ImageBackground source={bg} style={{overflow: "hidden",resizeMode: "stretch",height: "100%", width: "100%"}}>
		<View style={[styles.base,{ height: "70%", padding: 20, alignItems: "center"}]}>

		
        <Text style = {styles.textTitle}>Example Resource Name</Text>
        <Text style = {styles.textLight}>[LOCATION]: Example Location, Orange County, CA </Text>
        <Text style = {styles.textLight}>[HOURS]: Mon - Fri (7:00am - 10:00pm)</Text>      
        <Text style = {styles.textLight}>[PHONE]: (555) 555-5555 </Text>
        <Text style = {styles.textLight}>[WEBSITE]: examplewebsite.com </Text>

        <Text style = {styles.textBody}>[DESCRIPTION]: Food Resource is an organization dedicated to providing food...Nulla ultrices sed commodo in id arcu iaculis in urna. Euismod proin massa sed scelerisque nisi, tristique nisl sem cras. Sed arcu erat nullam in in phasellus sem arcu. Dui purus, malesuada dis elit aenean pulvinar arcu. 
Sed eget rhoncus laoreet ullamcorper suspendisse viverra tincidunt. Tortor diam id a dui aliquet a vulputate tellus. Est, massa tristique nunc egestas urna commodo fames duis. Aliquam curabitur congue vel lectus ornare risus lectus. Tortor, sed sed dictum sed tellus amet. Dictum massa elementum sagittis iaculis proin. </Text>

		<TouchableOpacity
						onPress={() => navigation.navigate('Admin Home')}
						style={{
							alignSelf: "center",
							alignItems: "center",
							backgroundColor: "#A32E2E",
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
						<Text style={{ color: "white" }}>Delete Resource</Text>
					</TouchableOpacity>
        </View>
		</ImageBackground>
       </View>
    );
    
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	textLight:{
		marginTop: "2%",
		fontSize: 14,
		alignSelf: "flex-start",
		textAlign: "left",
		marginLeft: "8%",
		color: "#797979",
		marginBottom: "1%"
	},
	textBody:{
		marginTop: "10%",
		fontSize: 16,
		alignSelf: "flex-start",
		textAlign: "left",
		marginLeft: "8%",
		color: "black"
	},
	textDetails:{
		marginVertical: '4%',
		fontSize: 18,
		alignSelf: "flex-start",
		textAlign: "left",
		marginLeft: "8%",
		marginBottom: "5%",
		color: "#292929",
	},
});

export default ViewResourceScreen;