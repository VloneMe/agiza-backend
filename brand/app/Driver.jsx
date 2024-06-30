import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw';

const Driver = () => {
    const [location, setLocation] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            fetchPackages();
        })();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://192.168.62.127:4000/api/packages');
            if (response.status === 200) {
                setPackages(response.data);
            } else {
                Alert.alert('Error', 'Unable to fetch packages');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderPackageItem = ({ item }) => (
        <View style={styles.packageItem}>
            <Text>Recipient Name: {item.fullName}</Text>
            <Text>Phone Number: {item.PhoneNumber}</Text>
            <Text>Pickup Location: {item.pickuplocation}</Text>
            <Text>Delivery Location: {item.deliverylocation}</Text>
            <Text>Ride Type: {item.rideType}</Text>
            <Text>Cost: {item.cost} TZS</Text>
            <Button title="Accept" onPress={() => Alert.alert('Accepted')} />
        </View>
    );

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {location && (
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
            )}
            <View style={styles.packageListContainer}>
                <FlatList
                    data={packages}
                    renderItem={renderPackageItem}
                    keyExtractor={(item) => item._id} // Ensure each item has a unique key
                    contentContainerStyle={styles.packageList}
                />
            </View>
        </View>
    );
};

const { height } = Dimensions.get('window');
const mapHeight = height / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: mapHeight,
    },
    packageListContainer: {
        flex: 1,
    },
    packageList: {
        padding: 20,
    },
    packageItem: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
});

export default Driver;
