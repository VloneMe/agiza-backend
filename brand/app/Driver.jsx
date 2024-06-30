import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList } from 'react-native';
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
            <Text>Recipient Name: {item.recipientName}</Text>
            <Text>Phone Number: {item.phoneNumber}</Text>
            <Text>Pickup Location: {item.pickupLocation}</Text>
            <Text>Delivery Location: {item.deliveryLocation}</Text>
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
            <FlatList
                data={packages}
                renderItem={renderPackageItem}
                keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
                contentContainerStyle={styles.packageList}
            />
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




// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import * as Location from 'expo-location';
// import axios from 'axios';

// const GOOGLE_API_KEY = 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw';

// const Driver = () => {
//     const route = useRoute();
//     const navigation = useNavigation();
//     const [location, setLocation] = useState(null);
//     const [distance, setDistance] = useState(null);
//     const [duration, setDuration] = useState(null);
//     const [cost, setCost] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const { pickuplocation, deliverylocation } = route.params;

//     useEffect(() => {
//         (async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 Alert.alert('Permission to access location was denied');
//                 return;
//             }

//             let location = await Location.getCurrentPositionAsync({});
//             setLocation(location);

//             await calculateDistance(pickuplocation, deliverylocation);
//         })();
//     }, []);

//     const getCoordinates = async (locationName) => {
//         const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${GOOGLE_API_KEY}`
//         );

//         if (response.data.status === 'OK') {
//             const { lat, lng } = response.data.results[0].geometry.location;
//             return { lat, lng };
//         } else {
//             throw new Error('Unable to get location');
//         }
//     };

//     const calculateDistance = async (pickup, delivery) => {
//         try {
//             const pickupCoords = await getCoordinates(pickup);
//             const deliveryCoords = await getCoordinates(delivery);

//             const response = await axios.get(
//                 `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${pickupCoords.lat},${pickupCoords.lng}&destinations=${deliveryCoords.lat},${deliveryCoords.lng}&key=${GOOGLE_API_KEY}`
//             );

//             if (response.data.status === 'OK') {
//                 const element = response.data.rows[0].elements[0];
//                 const distanceText = element.distance.text;
//                 const distanceValue = parseFloat(distanceText.replace(' km', ''));
//                 const costValue = distanceValue * 2000;

//                 setDistance(distanceText);
//                 setDuration(element.duration.text);
//                 setCost(costValue);
//             } else {
//                 Alert.alert('Error', 'Unable to calculate distance');
//             }
//         } catch (error) {
//             Alert.alert('Error', error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!location) {
//         return <Text>Loading...</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 initialRegion={{
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//             >
//                 <Marker
//                     coordinate={{
//                         latitude: location.coords.latitude,
//                         longitude: location.coords.longitude,
//                     }}
//                     title="Driver Location"
//                 />
//             </MapView>
//             <View style={styles.detailsContainer}>
//                 <Text>Pickup Location: {pickuplocation}</Text>
//                 <Text>Delivery Location: {deliverylocation}</Text>
//                 {loading ? (
//                     <Text>Calculating distance...</Text>
//                 ) : (
//                     <>
//                         <Text>Distance: {distance}</Text>
//                         <Text>Duration: {duration}</Text>
//                         <Text>Cost: {cost} Tsh</Text>
//                     </>
//                 )}
//                 <Button title="Accept" onPress={() => Alert.alert('Accepted')} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
//     detailsContainer: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         backgroundColor: 'white',
//         padding: 20,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//     },
// });

// export default Driver;
