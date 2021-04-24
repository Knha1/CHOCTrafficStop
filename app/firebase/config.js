import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyC29djTZvnlqEBPQb3zrh4SBlpNYfg68-s",
	authDomain: "connecteen-proto.firebaseapp.com",
	databaseURL: "https://connecteen-proto-default-rtdb.firebaseio.com",
	projectId: "connecteen-proto",
	storageBucket: "connecteen-proto.appspot.com",
	messagingSenderId: "1071525962124",
	appId: "1:1071525962124:web:192d1ff264f1ead9cab6a9",
	measurementId: "G-ZMQ5D14CYZ",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };
