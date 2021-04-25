import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";

function ViewResourceScreen({ navigation }) {
	return (
        <View style={{padding: 10}}>
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Example Resource Name</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <View style ={{marginTop: 10, margin:5}}>

        <Text> [LOCATION]: Example Location, Orange County, CA </Text>

        <View style ={{marginTop: 10, margin:5}}></View>

        <Text> [HOURS]: Mon - Fri (7:00am - 10:00pm)</Text>      

        <View style ={{marginTop: 10, margin:5}}></View>

        <Text> [PHONE]: (555) 555-5555 </Text>

        <View style ={{marginTop: 10, margin:5}}></View>

        <Text> [WEBSITE]: examplewebsite.com </Text>

        <View style ={{marginTop: 10, margin:5}}></View>

        <Text> [DESCRIPTION]: Food Resource is an organization dedicated to providing food...Nulla ultrices sed commodo in id arcu iaculis in urna. Euismod proin massa sed scelerisque nisi, tristique nisl sem cras. Sed arcu erat nullam in in phasellus sem arcu. Dui purus, malesuada dis elit aenean pulvinar arcu. 
Sed eget rhoncus laoreet ullamcorper suspendisse viverra tincidunt. Tortor diam id a dui aliquet a vulputate tellus. Est, massa tristique nunc egestas urna commodo fames duis. Aliquam curabitur congue vel lectus ornare risus lectus. Tortor, sed sed dictum sed tellus amet. Dictum massa elementum sagittis iaculis proin. </Text>

        <View style ={{marginTop: 10, margin:5}}/>
        
        <Button
          title="Delete Resource"
		  color = "red"
          onPress={() =>
            navigation.navigate('Admin Home')
          }
        />
        </View>
       </View>
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
});

export default ViewResourceScreen;