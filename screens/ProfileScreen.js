import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { firebaseApp } from '../firebaseConfig';
import {
    getAuth,
} from "firebase/auth";

/* Get a reference to the database service */
const auth = getAuth(firebaseApp);

/* Update Profile */


const ProfileScreen = () => {

    /* Set State: Name, Course and Year */
    const [name, setName] = React.useState('')
    const [course, setCourse] = React.useState('')
    const [year, setYear] = React.useState('')

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
            <TouchableOpacity
                onPress={() => { }}
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