import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, View, Button, Alert, Image, TouchableOpacity} from 'react-native';
// import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../config/colors";
import safetySecurity from "../assets/SafetySecurityIcon.png";
import relationshipsSupport from "../assets/RelationshipSupportIcon.png";
import mentalHealth from "../assets/MentalHealthIcon.png";
import physical from "../assets/PhysicalHealthWellbeingIcon.png";
import community from "../assets/CommunityIcon.png";
import bg from "../assets/background.png";


function SurveyCategoriesScreen ({navigation}) {
    const [text, setText] = useState('')
    
    return (
      
        <View style={styles.base}>
        <ImageBackground source = {bg} style={{borderTopRightRadius: 60, borderTopLeftRadius: 60, overflow: 'hidden', resizeMode: "stretch"}}>
          <Text style = {{paddingTop: 10, fontSize:22 , alignSelf: 'center', padding: 20, color: '#F1F2F2'}}>What resources do you need?</Text>
          <Text style = {{paddingTop: 10, fontSize:14 , alignSelf: 'left', padding: 20, color: '#F1F2F2'}}>Please select one of the following survey categories that best describes the kind of resources you are looking for.</Text>
          <Text style = {{paddingTop: 10, fontSize:14 , alignSelf: 'left', padding: 20, color: '#F1F2F2', textDecorationLine: "underline"}}>Or, you can see your past resources here.</Text>

          
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('YesNo Question')} style={styles.card}>
              <Image source={safetySecurity} style={styles.icon}/>
              <Text style={{alignSelf: 'center', textAlign: 'center'}}>Safety and Security</Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={() => navigation.navigate('YesNo Question')} style={styles.card}>
              <Image source={relationshipsSupport} style={styles.icon}/>
              <Text style={{alignSelf: 'center', textAlign: 'center'}}>Relationships and Support</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => navigation.navigate('YesNo Question')} style={styles.card}>
              <Image source={mentalHealth} style={styles.icon}/>
              <Text style={{alignSelf: 'center', textAlign: 'center'}}>Mental Health</Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={() => navigation.navigate('YesNo Question')} style={styles.card}>
              <Image source={physical} style={styles.icon}/>
              <Text style={{alignSelf: 'center', textAlign: 'center'}}>Physical Health and Wellbeing</Text>
            </TouchableOpacity>
          
          
            <TouchableOpacity onPress={() => navigation.navigate('YesNo Question')} style={[styles.card, {flexDirection: "column"}]}>
              <Image source={community} style={styles.icon}/>
              <Text style={{alignSelf: 'center', textAlign: 'center'}}>Community</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
  title:{

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
  card:{
    backgroundColor: '#F1F2F2',
    width: "48%", 
    height: "30%", 
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 2,
    padding: 25,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  cardText:{
    color: '#F1F2F2'
  },
  base: {
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    height: "100%"
    //backgroundColor: `#0E4C9C`,

  },
  icon: {
    resizeMode: "contain",
    width: 100,
    height: 75,
    alignSelf: 'center'
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  }
});

export default SurveyCategoriesScreen;