import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";

/* App's Firebase configuration */
const firebaseApp = initializeApp({
    apiKey: "AIzaSyA0pjf1zsggqY7V_WtIbHHXeoH2jx-X8Qk",
    authDomain: "accelerometer-leaderboard.firebaseapp.com",
    projectId: "accelerometer-leaderboard",
    storageBucket: "accelerometer-leaderboard.appspot.com",
    messagingSenderId: "855377774417",
    appId: "1:855377774417:web:3547d789507d6521b4f570"
});

/* Get a reference to the database service */
const auth = getAuth(firebaseApp);

const HomeScreen = () => {

    /* Navigation */
    const naviation = useNavigation();

    /* Sign Out */
    const signOut = async () => {
        try {
            await auth.signOut();
            naviation.navigate('Login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <Text>UID: {auth.currentUser?.uid}</Text>
            <TouchableOpacity
                onPress={signOut}
                style={styles.button}
            >
                <Text style={styles.buttonText} >Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
})