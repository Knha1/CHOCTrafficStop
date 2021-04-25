import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";

function StatisticsHomeScreen({ navigation }) {
	return (
        <View style={{padding: 10}}>
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Resources Accessed</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <Text style = {{paddingTop: 10, fontSize:15 , alignSelf: 'center', padding: 40}}>Statistics Wheel here :-)</Text>

        <View style ={{marginTop: 10, margin:5}}>

        <Text style={{fontSize:15, marginBottom:5}}>Top 3 Resources Accessed</Text>
        <Text>From DATE-DATE</Text>
        
        <View style ={{marginTop: 10, margin:5}}></View>

        <Text>Resource 1</Text>
        <View style ={{marginTop: 10, margin:5}}></View>
        <Text>Resource 2</Text>
        <View style ={{marginTop: 10, margin:5}}></View>
        <Text>Resource 3</Text>
        <View style ={{marginTop: 10, margin:5}}></View>
        
		<View style={styles.buttonSpacing}>
		<Button
          title="Export Data"
		  color = "blue"
          onPress={() =>
            navigation.navigate('Export Data')
          }
        />
		</View>

          {/* need to add a new screen for this */}
        <View style={styles.buttonSpacing}>
		<Button
          title="More Details"
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

export default StatisticsHomeScreen;