import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Settings } from "react-native";
import { firebase } from "./app/firebase/config";
import { storeData } from "./app/utils/DataHandler";
// SCREEN IMPORTS -- PATIENT
import LoginScreen from "./app/screens/patient/LoginScreen";
import WelcomeScreen from "./app/screens/patient/WelcomeScreen";
import ResourceListScreen from "./app/screens/patient/ResourceListScreen";
import HomeScreen from "./app/screens/patient/HomeScreen";
import SettingsScreen from "./app/screens/patient/SettingsScreen";
import ResourceRecommendedScreen from "./app/screens/patient/ResourceRecommendedScreen";
import ResourceDetailScreen from "./app/screens/patient/ResourceDetailScreen";
import SurveyCategoriesScreen from "./app/screens/patient/SurveyCategoriesScreen";
import YesNoQuestionScreen from "./app/screens/patient/YesNoQuestionScreen";
import YouthServicesScreen from "./app/screens/patient/YouthServicesScreen";
// SCREEN IMPORTS -- ADMIN
import AdminHomeScreen from "./app/screens/admin/AdminHomeScreen";
import EditResourcesScreen from "./app/screens/admin/ExportDataScreen";
import ExportDataScreen from "./app/screens/admin/ExportDataScreen";
import ViewResourceScreen from "./app/screens/admin/ViewResourceScreen";
import StatisticsDetailsScreen from "./app/screens/admin/StatisticsDetailsScreen";
import AddResourceScreen from "./app/screens/admin/AddResourceScreen";
import StatisticsHomeScreen from "./app/screens/admin/StatisticsHomeScreen";

const Stack = createStackNavigator();

export default function App() {
	// Get resources from DB and store locally
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
							name: child.val().name,
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
				storeData("resources", tempResources);
			} else {
				console.log("'resource' data retrieval from DB was unsuccessful.");
			}
		})
		.catch((err) => console.log(err));

	// Get questions from DB and store locally
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
				storeData("questions", tempQuestions);
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
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Resource List"
					component={ResourceListScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Settings"
					component={SettingsScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Recommended"
					component={ResourceRecommendedScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Resource Details"
					component={ResourceDetailScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Survey Categories"
					component={SurveyCategoriesScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Admin Home"
					component={AdminHomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Export Data"
					component={ExportDataScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="View Resource"
					component={ViewResourceScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Statistics Details"
					component={StatisticsDetailsScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Statistics Home"
					component={StatisticsHomeScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Add Resource"
					component={AddResourceScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="YesNo Question"
					component={YesNoQuestionScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Youth Support Services"
					component={YouthServicesScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
