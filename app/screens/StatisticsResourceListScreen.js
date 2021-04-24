import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../config/colors";

function StatisticsResourceListScreen({ navigation }) {
	return (
        <View style={{padding: 10}}>
        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>Resources</Text>

        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />

        <View style ={{marginTop: 10, margin:5}}>
        
		<View style={styles.buttonSpacing}>
		<Button
          title="Resource 1"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 2"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 3"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 4"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 5"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 6"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 7"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 8"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 9"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
          }
        />
		</View>

        <View style={styles.buttonSpacing}>
		<Button
          title="Resource 10"
		  color = "#8c8c8c"
          onPress={() =>
            navigation.navigate('Statistics Details')
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

export default StatisticsResourceListScreen;