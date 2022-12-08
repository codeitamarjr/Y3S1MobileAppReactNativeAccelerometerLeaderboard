import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { firebaseApp, firestore } from '../firebaseConfig';
import {
    getAuth,
} from "firebase/auth";
import { collection, getDoc, doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
import { studentID } from './LoginScreen';

/* Get a reference to the database service */
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

/* Update Users Profile */
const updateProfile = async (name, course, year) => {
    try {
        await updateDoc(doc(db, "Firestore",
            /* studentID set on LoginScreen.js */
            "23952"
        ), {
            name: name,
            course: course,
            year: year,
        });
    } catch (error) {
        console.log(error);
    }
}


const ProfileScreen = () => {

    /* Set State: Name, Course and Year */
    const [name, setName] = React.useState('')
    const [course, setCourse] = React.useState('')
    const [year, setYear] = React.useState('')

    /* Get User Profile */
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const docRef = doc(db, "Firestore", "23952");
                getDoc(docRef).then((doc) => {
                    if (doc.exists()) {
                        setName(doc.data().name)
                        setCourse(doc.data().course)
                        setYear(doc.data().year)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
                // No user is signed in.
            }
        });
        return unsubscribe;
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TextInput
                placeholder='Name'
                placeholderTextColor='black'
                autoCorrect={false}
                value={name}
                onChangeText={(text) => { setName(text) }}
                style={styles.input}
            />
            <TextInput
                placeholder='Course'
                placeholderTextColor='black'
                autoCorrect={false}
                value={course}
                onChangeText={(text) => { setCourse(text) }}
                style={styles.input}
            />
            <TextInput
                placeholder='Year'
                placeholderTextColor='black'
                autoCorrect={false}
                value={year}
                onChangeText={(text) => { setYear(text) }}
                style={styles.input}
            />
            <TouchableOpacity
                onPress={() => updateProfile(name, course, year)}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        width: '60%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
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