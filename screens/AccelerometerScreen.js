import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Accelerometer } from 'expo-sensors';
import { firebaseApp, firestore } from '../firebaseConfig';
import { collection, getDoc, doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
import {
    getAuth,
} from "firebase/auth";

/* Get a reference to the database service */
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

/* Const accelerometer_data_array array to store the x,y and z data */
const accelerometer_data_array = [];

/* upload x,y and z from accelerometer_data_array array to accelerometer_data collection in Firestore */
const uploadAccelerometerData = async () => {
    try {
        await updateDoc(doc(db, "Users", "23952"), {
            /* upload the array object to the accelerometer_data collection in Firestore */
            accelerometer_data: accelerometer_data_array,
        });
    } catch (error) {
        console.log(error);
    }
}

const AccelerometerScreen = () => {
    /* Navigation */
    const navigation = useNavigation();

    /* State */
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    /* Functions */
    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            /* Add accelerometer listener */
            Accelerometer.addListener((accelerometerData) => {
                /* Set accelerometer data to state */
                setData(accelerometerData);

                /* Push x,y and z data to accelerometer_data_array array */
                accelerometer_data_array.push({
                    x: accelerometerData.x,
                    y: accelerometerData.y,
                    z: accelerometerData.z,
                });
                console.log(accelerometer_data_array.length);

                /* If accelerometer_data_array array is 1000, upload the data to Firestore */
                if (accelerometer_data_array.length == 1000) {
                    console.log("Accelerometer Data Uploaded");
                    uploadAccelerometerData();
                    /* Shows pop up message */
                    alert("Accelerometer Data Uploaded");
                    /* Navigate to Home Screen */
                    navigation.replace('Home');
                    /* Reset accelerometer_data_array array */
                    accelerometer_data_array.length = 0;
                    /* Stop accelerometer listener */
                    Accelerometer.removeAllListeners();
                }
            })
        );
    };

    /* Effects */
    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    /* On Mount */
    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {x}</Text>
            <Text style={styles.text}>y: {y}</Text>
            <Text style={styles.text}>z: {z}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AccelerometerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        height: 40,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    middleButton: {
        marginHorizontal: 5,
    },
})