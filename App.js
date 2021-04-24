import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// import { registerRootComponent } from 'expo';
// import { StatusBar } from 'expo-status-bar';
import * as React from "react";
// import { StyleSheet, Text, View, Image, TouchableOpacity, Button, SafeAreaView} from 'react-native';
// import logo from './app/assets/test_logo.png';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { createStackNavigator } from "@react-navigation/stack";
// import WelcomeScreen from "./app/assets/screens/placeholder";
import LoginScreen from "./app/screens/LoginScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
// import RegisterScreen from './app/screens/RegisterScreen';
// import ForgotPasswordScreen from './app/screens/ForgotPasswordScreen';
import ResourceListScreen from "./app/screens/ResourceListScreen";
import HomeScreen from "./app/screens/HomeScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import { Settings } from "react-native";
import ResourceRecommendedScreen from "./app/screens/ResourceRecommendedScreen";
import SurveyCategoriesScreen from "./app/screens/SurveyCategoriesScreen";
import YesNoQuestionScreen from "./app/screens/YesNoQuestionScreen";
import { firebase } from "./app/firebase/config";
import { LogBox } from "react-native"; // REMOVE THIS -- ONLY FOR DEBUG

const Stack = createStackNavigator();

export default function App() {
	LogBox.ignoreLogs(["Setting a timer"]); // REMOVE THIS -- ONLY FOR DEBUG
	// Get resources from DB, declare as global
	global.resources = null;
	firebase
		.database()
		.ref()
		.child("resource")
		.get()
		.then((snapshot) => {
			if (snapshot.exists()) {
				var tempResources = [];

				snapshot.forEach((child) => {
					// Ignore the num_resources variable, store the rest of the resource
					if (!Number.isInteger(child.val())) {
						tempResources.push({
							resource_id: child.val().resource_id,
							name: child.val().address,
							description: child.val().description,
							category: child.val().category,
							organization: child.val().organization,
							address: child.val().address,
							phone_num: child.val().phone_num,
							availability: child.val().availability,
							website: child.val().website,
						});
					}
				});

				global.resources = tempResources;
			} else {
				console.log("'resource' data retrieval from DB was unsuccessful.");
			}
		})
		.catch((err) => console.log(err));

	// Get questions from DB, declare as global
	global.questions = null;
	firebase
		.database()
		.ref()
		.child("question")
		.get()
		.then((snapshot) => {
			if (snapshot.exists()) {
				var tempQuestions = [];

				snapshot.forEach((child) => {
					// Ignore the num_questions variable, store the rest of the resource
					if (!Number.isInteger(child.val())) {
						tempQuestions.push({
							category: child.val().category,
							order: child.val().order,
							question_id: child.val().question_id,
							text: child.val().text,
							type: child.val().type,
							answer_choices: child.val().answer_choices,
						});
					}
				});

				global.questions = tempQuestions;
			} else {
				console.log("'question' data retrieval from DB was unsuccessful.");
			}
		})
		.catch((err) => console.log(err));

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Welcome"
					component={WelcomeScreen}
					options={{ title: "Welcome" }}
				/>

				<Stack.Screen name="Login" component={LoginScreen} />

				{/* <Stack.Screen 
      name="Register" 
      component={RegisterScreen} /> */}

				{/* <Stack.Screen 
      name="Forgot Password" 
      component={ForgotPasswordScreen} /> */}

				<Stack.Screen name="Resource List" component={ResourceListScreen} />

				<Stack.Screen name="Home" component={HomeScreen} />

				<Stack.Screen name="Settings" component={SettingsScreen} />

				<Stack.Screen
					name="Recommended"
					component={ResourceRecommendedScreen}
				/>

				<Stack.Screen
					name="Survey Categories"
					component={SurveyCategoriesScreen}
				/>

				<Stack.Screen name="YesNo Question" component={YesNoQuestionScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
