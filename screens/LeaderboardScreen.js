import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firebaseApp, firestore } from '../firebaseConfig';
import {
    getAuth,
} from "firebase/auth";
import { collection, getDocs, doc, getFirestore, Firestore } from "firebase/firestore";

/* Get a reference to the database service */
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

/* The accelerometer_data array from ALL users */
const accelerometer_data = [];
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
            }
            );
            movement_score = (total_x + total_y + total_z) / total_data_points;
            /* Push the the user id and movement score to the accelerometer_data array */
            ScoreData.push({
                user_id: doc.id,
                movement_score: movement_score,
            });
        });
        /* Console.log the user id and movement score */
        console.log(ScoreData);
    } catch (error) {
        console.log(error);
    }
}

/* Sort the ScoreData by movement_score and return the top 10 */
const getTop10Users = () => {
    /* Sort the ScoreData by movement_score */
    ScoreData.sort((a, b) => (a.movement_score > b.movement_score) ? 1 : -1);
    /* Console.log to check if the ScoreData is sorted */
    console.log("Sorted ScoreData: ", ScoreData);
    /* Return the top 10 users */
    return ScoreData.slice(0, 10);
}

/* Show toaster with countdown in a while load the top 10 users */
const printTop10Users = () => {
    /* Get all the accelerometer_data array from ALL users */
    getAccelerometerData();
    /* Sort the accelerometer_data array by movement score and return the top 10 users */
    const top10Users = getTop10Users();
    /* For each user in the top 10 users, print a view with the user id and movement score */
    top10Users.forEach((user) => {
        return (
            <View>
                <Text> Test</Text>
                <Text>{user.user_id}</Text>
                <Text>{user.movement_score}</Text>
            </View>
        )
    }
    );
}


const LeaderboardScreen = () => {

    return (
        <View>
            <Text>Leaderboard Screen</Text>
            {/* Toaster loading the TOP 10 users screen */}
            {printTop10Users()}
        </View>
    )
}

export default LeaderboardScreen

const styles = StyleSheet.create({})