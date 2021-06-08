# CHOCTrafficStop

# App Description

To help bridge the gap between inpatient care and outpatient services to assist youth in recovery and preventing re-entry into "the life" of trafficking. The app should look discrete, similar to a wellness app so the patient would not feel endangered from their abusers, while giving them access to specific resrources based on their survey questions.

# Set Up

1. In the project directory, run `npm install` to install all project directories
2. Make sure Expo CLI is installed -- this project uses Expo SDK 40
3. Start the project by running `expo start` (run `npm start` if `expo start` fails)
4. A webpage should open up with the Expo console
5. On an Android phone, install the Expo Go app and scan the QR code to view the live code
6. For an Android emulator, click on "Run on Android device/emulator"
7. To publish the app demo to expo.io for viewing on the Expo Go app without running the Expo console, press on "Publish or republish project" and follow the steps in the command prompt/terminal

# File Structure / Breakdown

NOTE: Only key files/folders are noted here

```
CHOCTrafficStop/
├─ .expo-shared/			# Expo CLI generated folder
├─ .vscode/				# VS Code generated folder
├─ app/
│  ├─ assets/				# All image assets for the app
│  ├─ config/
│  │  ├─ colors.js			# Unused common CSS file
│  ├─ firebase/
│  │  ├─ config.js			# Firebase setup w/ access credentials
│  ├─ screens/
│  │  ├─ admin/				# All screens for admin-side
│  │  ├─ patient/			# All screens for patient-side
│  │  ├─ unused/			# Unused screens
│  ├─ utils/
│  │  ├─ DataHandler.js			# Utility functions for storing local data
App.js					# Main file; grabs DB data and inits screens
freshDatabase.json			# JSON to load into a fresh Firebase RTDB
package.json				# Project dependencies
rawQuestionData.tsv			# Raw question data from spreadsheet
rawResourceData.tsv			# Raw resource data from spreadsheet
```

`freshDatabase.json` has a set of default admin credentials (User: `CHOCAdmin`, Pass: `trafficstop`) and 2 registration codes (`GUEST`, `CHOC1`)

# Last Updated

June 7, 2021

## UCI Capstone Project Team

**Winter-Spring 2021**

- Kyle Phan (Backend)
- Minhduc Cao (Backend)
- Angela Martin (UI)
- Kimberly Ha (UI)
- Justin Nan (Backend)
