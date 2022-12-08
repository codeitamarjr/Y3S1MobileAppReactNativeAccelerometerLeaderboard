import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0pjf1zsggqY7V_WtIbHHXeoH2jx-X8Qk",
    authDomain: "accelerometer-leaderboard.firebaseapp.com",
    projectId: "accelerometer-leaderboard",
    storageBucket: "accelerometer-leaderboard.appspot.com",
    messagingSenderId: "855377774417",
    appId: "1:855377774417:web:3547d789507d6521b4f570"
};


const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
const storage = getStorage(firebaseApp);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
