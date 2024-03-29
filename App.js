import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "./app/firebase/config";
import { storeData } from "./app/utils/DataHandler";
// SCREEN IMPORTS -- PATIENT
import HomeScreen from "./app/screens/patient/HomeScreen";
import LoginScreen from "./app/screens/patient/LoginScreen";
import ResourceDetailScreen from "./app/screens/patient/ResourceDetailScreen";
import ResourceListScreen from "./app/screens/patient/ResourceListScreen";
import ResourceResultsScreen from "./app/screens/patient/ResourceResultsScreen";
import SurveyCategoriesScreen from "./app/screens/patient/SurveyCategoriesScreen";
import WelcomeScreen from "./app/screens/patient/WelcomeScreen";
import QuestionScreen from "./app/screens/patient/QuestionScreen";
// SCREEN IMPORTS -- ADMIN
import AddResourceScreen from "./app/screens/admin/AddResourceScreen";
import AdminHomeScreen from "./app/screens/admin/AdminHomeScreen";
import AdminLoginScreen from "./app/screens/admin/AdminLoginScreen";
import AdminResourceListScreen from "./app/screens/admin/AdminResourceListScreen";
import EditResourceScreen from "./app/screens/admin/EditResourceScreen";
import ExportDataScreen from "./app/screens/admin/ExportDataScreen";
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
							tags: child.val().tags,
							email: child.val().email,
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
						var tags = {};
						for (var tagNum in child.val().tags) {
							tags[tagNum] = child.val().tags[tagNum];
						}

						tempQuestions.push({
							category: child.val().category,
							order: child.val().order,
							question_id: child.val().question_id,
							text: child.val().text,
							type: child.val().type,
							answer_choices: child.val().answer_choices,
							tags: tags,
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
				{/* PATIENT SCREENS  */}
				<Stack.Screen
					name="Welcome"
					component={WelcomeScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Question"
					component={QuestionScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Resource Details"
					component={ResourceDetailScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Resource List"
					component={ResourceListScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Resource Results"
					component={ResourceResultsScreen}
					options={{ headerShown: false }}
				/>

				{/* <Stack.Screen
					// CURRENTLY UNUSED
					name="Settings"
					component={SettingsScreen}
					options={{ headerShown: false }}
				/> */}

				<Stack.Screen
					name="Survey Categories"
					component={SurveyCategoriesScreen}
					options={{ headerShown: false }}
				/>

				{/* <Stack.Screen
					// CURRENTLY UNUSED
					name="Youth Support Services"
					component={YouthServicesScreen}
					options={{ headerShown: false }}
				/> */}

				{/* ADMIN SCREENS  */}
				<Stack.Screen
					name="Add Resource"
					component={AddResourceScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Admin Home"
					component={AdminHomeScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Admin Login"
					component={AdminLoginScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Admin Resource List"
					component={AdminResourceListScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Edit Resource"
					component={EditResourceScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Export Data"
					component={ExportDataScreen}
					options={{ headerShown: false }}
				/>

				{/* <Stack.Screen
					// CURRENTLY UNUSED
					name="Statistics Details"
					component={StatisticsDetailsScreen}
					options={{ headerShown: false }}
				/> */}

				<Stack.Screen
					name="Statistics Home"
					component={StatisticsHomeScreen}
					options={{ headerShown: false }}
				/>

				{/* <Stack.Screen
					// CURRENTLY UNUSED
					name="Statistics List"
					component={StatisticsResourceListScreen}
					options={{ headerShown: false }}
				/> */}

				{/* <Stack.Screen
					// CURRENTLY UNUSED
					name="View Resource"
					component={ViewResourceScreen}
					options={{ headerShown: false }}
				/> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
