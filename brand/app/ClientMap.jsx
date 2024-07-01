import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw';

const ClientMap = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [cost, setCost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rideType, setRideType] = useState(null);

    const { pickuplocation, fullName, deliverylocation, PhoneNumber, Detail, Inside } = route.params;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            await calculateDistance(pickuplocation, deliverylocation);
        })();
    }, []);

    const getCoordinates = async (locationName) => {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${GOOGLE_API_KEY}`
        );

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } else {
            throw new Error('Unable to get location');
        }
    };

    const calculateDistance = async (pickup, delivery) => {
        try {
            const pickupCoords = await getCoordinates(pickup);
            const deliveryCoords = await getCoordinates(delivery);

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${pickupCoords.lat},${pickupCoords.lng}&destinations=${deliveryCoords.lat},${deliveryCoords.lng}&key=${GOOGLE_API_KEY}`
            );

            if (response.data.status === 'OK') {
                const element = response.data.rows[0].elements[0];
                const distanceText = element.distance.text;
                const distanceValue = parseFloat(distanceText.replace(' km', ''));

                setDistance(distanceText);
                setDuration(element.duration.text);
            } else {
                Alert.alert('Error', 'Unable to calculate distance');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRideSelection = async (rideType) => {
        setRideType(rideType);
        let cost = 0;
        if (rideType === 'bodaboda') {
            cost = parseFloat(distance.replace(' km', '')) * 2000;
        } else if (rideType === 'kirikuu') {
            cost = parseFloat(distance.replace(' km', '')) * 4000;
        }
        setCost(cost);
    
        // Send data to the database
        try {
            await axios.post('http://192.168.58.127:4000/api/packages', {
                pickuplocation: pickuplocation,
                deliverylocation: deliverylocation,
                fullName: fullName,
                PhoneNumber: PhoneNumber,
                Detail: Detail,
                Inside: Inside,
                rideType: rideType,
                cost: cost
            });
    
            // Navigate to the driver page
            navigation.navigate('Comfirm', {
                pickuplocation,
                fullName,
                deliverylocation,
                PhoneNumber,
                Detail,
                Inside,
                rideType: rideType,
                cost: cost,
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to create package');
        }
    };
   
    if (!location) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="Driver Location"
                />
            </MapView>
            <View style={styles.detailsContainer}>
                <Text>Pickup Location: {pickuplocation}</Text>
                <Text>Full Name: {fullName}</Text>
                <Text>Delivery Location: {deliverylocation}</Text>
                <Text>Phone Number: {PhoneNumber}</Text>
                <Text>Parcel Description: {Detail}</Text>
                <Text>Parcel Contents: {Inside}</Text>
                {loading ? (
                    <Text>Calculating distance...</Text>
                ) : (
                    <>
                        <Text>Distance: {distance}</Text>
                        <Text>Duration: {duration}</Text>
                        <Text>Cost: {cost ? `${cost} Tsh` : 'Select a ride type'}</Text>
                    </>
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => handleRideSelection('bodaboda')}>
                        <Text style={styles.buttonText}>Bodaboda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleRideSelection('kirikuu')}>
                        <Text style={styles.buttonText}>Kirikuu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    detailsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#f0ad4e',
        padding: 10,
        borderRadius: 5,
        width: '40%',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ClientMap;
