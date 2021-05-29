import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, TextInput, ImageBackground, Image, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from "../../config/colors";
import bg from "../../assets/background.png";
import back from "../../assets/backArrowWhite.png";
import check from "../../assets/greenCheck.png";

function ExportDataScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	
	return (
		<View style={styles.container}>
			<ImageBackground source={bg} style={{overflow: "hidden",resizeMode: "stretch",height: "100%", width: "100%"}}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image source = {back} style = {styles.backButton}></Image>
			</TouchableOpacity>
				<View style={[styles.base]}>
					<Text style={{
							marginTop: "10%",
							fontSize: 24,
							alignSelf: "flex-start",
							textAlign: "left",
							marginLeft: "10%",
							marginBottom: "5%",
							color: "#003C98",
							fontWeight: 'bold'

						}}>
							Export Data 
					</Text>
					<Text style={styles.subheader}>File Name: </Text>
					<TextInput style={styles.baseText} placeholder = "Enter File Name" />
					<Text style={styles.subheader}>File Format: </Text>
					<DropDownPicker
						containerStyle={{marginHorizontal:"10%", height: "5%"}}
						itemStyle={{marginHorizontal: "10%", justifyContent: "flex-start"}}
						items={[
							{label: '.pdf', value: 'pdf'},
							{label: '.docx', value: 'docx'},
							{label: '.txt', value: 'txt'},
							{label: '.odt', value: 'odt'},
						]}
					/>

<View style={{flexDirection: "row", position: "absolute", bottom: 30, left: 40 }}>
						<TouchableOpacity onPress={() =>navigation.navigate('Statistics Home')} 
						style={{
							backgroundColor: "#DFDFDF",
							alignSelf: "center",
							borderRadius: 20,
							padding: 15,
							marginHorizontal: 10
						}}>
							<Text style={[styles.buttonText, {color: "#003C98"}]}>Cancel</Text>

						</TouchableOpacity>
						<TouchableOpacity onPress={() => setModalVisible(true)}
						style={{
							backgroundColor: "#0E4B9D",
							alignSelf: "center",
							borderRadius: 20,
							padding: 15,
							marginHorizontal: 10
						}}>
							<Text style={[styles.buttonText, {color: "#FFFFFF"}]}>Export Data</Text>
						</TouchableOpacity>

						<Modal
					animationType="none"
					visible={modalVisible}
					transparent={true}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View
						style={[styles.container,]}
					>
						<View style={[styles.popup, { flexDirection: "row"}]}>
							<Image source={check} style = {{resizeMode: "contain", width: 30, height: 30, marginRight: 10}}></Image>
							<Text
								style={{
									textAlign: "center",
									marginVertical: 10,
									color: "white",
									fontWeight: "bold",
									fontSize: 20,
									marginLeft: "2%"
								}}
							>
								Exported Data Successfully!
							</Text>
							
								<TouchableOpacity
									onPress={() => setModalVisible(!modalVisible)}
									style={{
										borderRadius: 20,
										padding: 10,
									}}
								>
									<Text style={{ color: "white", textAlign: "right", fontSize: 24, bottom: "75%", marginLeft: 10 }}>
										x
									</Text>
								</TouchableOpacity>
		
							
						</View>
					</View>
				</Modal>
					</View>
						


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
		// marginTop: "1%",
		backgroundColor: "#F1F2F2",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		alignSelf: "stretch",
		flex: 1,
	},
	backButton: {
		resizeMode: "contain",
		width: 34,
		height: 34,
		alignSelf: 'flex-start',
		marginBottom: '2%',
		marginLeft: '4%',
		marginTop: '11%'
	},
	baseText:{
		marginLeft: "10%",
		marginRight: "10%",
		marginBottom: "5%",
		height: "5%",
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#D1D1D1",
		backgroundColor: "white"
	},
	subheader:{
		marginLeft: "10%",
		marginBottom: "1%"
	},
	buttonText:{
		fontSize: 16,
		textAlign: "center",
		minWidth: "30%"
	},
	popup: {
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems:"center",
		padding: 10,
		borderRadius: 20,
		position: "absolute",
		bottom: '5%'
	}
});

export default ExportDataScreen;
