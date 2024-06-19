import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'


const UserLocation = () => {
    const [location, setLocation] = useState();

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Please grant location permissions to continue');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location:");
            console.log(currentLocation);
        };
        getPermissions();
    }, []);

    return (
        <View style={styles.container}>
            <Text>User Location</Text>
            <StatusBar style="auto" />
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
});