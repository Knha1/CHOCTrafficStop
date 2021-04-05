import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';
// import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../config/colors";

function SurveyCategoriesScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
      
        <View style={{padding: 10}}>


        <Text style = {{paddingTop: 10, fontSize:20 , alignSelf: 'center', padding: 20}}>What do you need today?</Text>
        <View
        style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        />
        
        <View style={styles.buttonSpacing}>
          <Button
            title="Safety and Security"
            onPress={() =>
              navigation.navigate('YesNo Question')
            }
          />
        </View>
        <View style={styles.buttonSpacing}>
        <Button
          title="Relationships and Support"
          onPress={() =>
            navigation.navigate('YesNo Question')
          }
        />
        </View>

        <View style={styles.buttonSpacing}>
        <Button
          title="Mental Health"
          onPress={() =>
            navigation.navigate('YesNo Question')
          }
        />
        </View>

        <View style={styles.buttonSpacing}>
        <Button
          title="Physical Health and Wellbeing"
          onPress={() =>
            navigation.navigate('YesNo Question')
          }
        />
        </View>

        <View style={styles.buttonSpacing}>
        <Button
          title="Community"
          onPress={() =>
            navigation.navigate('YesNo Question')
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

export default SurveyCategoriesScreen;