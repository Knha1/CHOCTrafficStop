import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../config/colors";

function StatisticsDetailsScreen({ navigation }) {
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

        <Text> Most Viewed: 35 times </Text>

        <View style ={{marginTop: 10, margin:5}}></View>

        <Text> Least Viewed: 12 times </Text>   

        <View style ={{marginTop: 10, margin:5}}></View>

        <Text> Current views for today: 14 times </Text>   

        <View style ={{marginTop: 10, margin:5}}></View>

        <Text> Total times accessed: 264 times </Text>   

        <View style ={{marginTop: 10, margin:5}}/>
        
		<View style={styles.buttonSpacing}>
		<Button
          title="View Resource ->"
		  color = "blue"
          onPress={() =>
            navigation.navigate('View Resource')
          }
        />
		</View>
	
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

export default StatisticsDetailsScreen;