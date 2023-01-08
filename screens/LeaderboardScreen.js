import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firebaseApp, firestore } from '../firebaseConfig';
import {
    getAuth,
} from "firebase/auth";
import { collection, getDocs, getDoc, doc, getFirestore, Firestore } from "firebase/firestore";

/* Get a reference to the database service */
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

/* The ScoreData array to store the user id and movement score */
const ScoreData = [];

/* Get all the accelerometer_data array from ALL users */
const getAccelerometerData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            /* Calculate the movement score( Σ(Σ|x| + Σ|y| + Σ|z|)/n ), n is the total number of data points */
            let movement_score = 0;
            let total_x = 0;
            let total_y = 0;
            let total_z = 0;
            let total_data_points = 0;
            doc.data().accelerometer_data.forEach((data) => {
                total_x += Math.abs(data.x);
                total_y += Math.abs(data.y);
                total_z += Math.abs(data.z);
                total_data_points += 1;
            });
            movement_score = (total_x + total_y + total_z) / total_data_points;
            /* if the movement score is 0 or more than 1000, set it to NaN */
            if (movement_score <= 0 || movement_score > 1000) {
                movement_score = NaN;
            }
            /* Push the the user id and movement score to ScoreData */
            ScoreData.push({
                user_id: doc.id,
                movement_score: movement_score,
            });
        });

    } catch (error) {
        console.log(error);
    }
    /* Console log the ScoreData before sorting */
    console.log(ScoreData);
    /* Sort the ScoreData by movement_score DESC */
    const Sorted = ScoreData.sort((a, b) => b.movement_score - a.movement_score);
    /* Console log the ScoreData array */
    console.log(Sorted);
}

/* Get the accelerometer_data array from ALL users */
getAccelerometerData();

/* Function getName(user_id) with from the Users collection */
function getName(user_id) {
    try {
        const docRef = doc(db, "Users", user_id)
        getDoc(docRef)
            .then(docSnap => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data().name);
                    return docSnap.data().name;
                } else {
                    console.log("No such document Name!");
                }
            }
            );
    } catch (error) {
        console.log("Error getting Name document:", error);
    }
}

/* Show a box for each user */
const LeaderboardScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leader Board</Text>
            {ScoreData.map((data) => (
                /* Show Student ID and Movement Score in a box */
                <View style={styles.box} key={data.user_id}>
                    {/*
                    <Text style={styles.text}>Name: {
                        /* TODO: wait for the return of getName(data.user_id) before showing the name 
                        getName(data.user_id)
                    }</Text>
                    /*/}
                    <Text style={styles.text}>Student ID: {data.user_id}</Text>
                    <Text style={styles.text}>Movement Score: {data.movement_score}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    box: {
        width: 300,
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
    },
});

export default LeaderboardScreen;




