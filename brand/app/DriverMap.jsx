import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

// import { GOOGLE_API_KEY } from './config'; // Import your secure API key
const GOOGLE_API_KEY = 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw';

const DriverMap = () => {
    const route = useRoute();
    const { packageDetails, currentLocation } = route.params;
    const [pickupCoords, setPickupCoords] = useState(null);
    const [deliveryCoords, setDeliveryCoords] = useState(null);
    const [driverRoute, setDriverRoute] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const geocodeLocation = async (location) => {
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`);
                if (response.data.status === 'OK') {
                    const { lat, lng } = response.data.results[0].geometry.location;
                    return { latitude: lat, longitude: lng };
                } else {
                    Alert.alert('Error', 'Unable to geocode location');
                    return null;
                }
            } catch (error) {
                Alert.alert('Error', error.message);
                return null;
            }
        };

        const fetchLocations = async () => {
            const pickupLocation = await geocodeLocation(packageDetails.pickuplocation);
            const deliveryLocation = await geocodeLocation(packageDetails.deliverylocation);
            if (pickupLocation && deliveryLocation) {
                setPickupCoords(pickupLocation);
                setDeliveryCoords(deliveryLocation);

                const getRoute = async () => {
                    try {
                        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&destination=${deliveryLocation.latitude},${deliveryLocation.longitude}&waypoints=${pickupLocation.latitude},${pickupLocation.longitude}&key=${GOOGLE_API_KEY}`);
                        if (response.data.status === 'OK') {
                            const points = response.data.routes[0].overview_polyline.points;
                            const steps = decode(points);
                            setDriverRoute(steps);
                        } else {
                            Alert.alert('Error', 'Unable to get route');
                        }
                    } catch (error) {
                        Alert.alert('Error', error.message);
                    } finally {
                        setIsLoading(false); // Set loading to false after fetching route
                    }
                };

                getRoute();
            }
        };

        fetchLocations();
    }, []);

    const decode = (t, e = 5) => {
        let d = [],
            n, o, u, l = 0,
            r = 0,
            h = 0,
            i = 0,
            a = 0;
        while (l < t.length) {
            n = 1;
            o = 0;
            while (true) {
                u = t.charCodeAt(l++) - 63 - 1;
                o += u << i;
                i += 5;
                if (u < 0x1f) break;
            }
            r += (o & 1 ? ~(o >> 1) : o >> 1);
            n = 1;
            o = 0;
            i = 0;
            while (true) {
                u = t.charCodeAt(l++) - 63 - 1;
                o += u << i;
                i += 5;
                if (u < 0x1f) break;
            }
            h += (o & 1 ? ~(o >> 1) : o >> 1);
            d.push([r / e, h / e]);
        }
        return d.map(point => {
            return {
                latitude: point[0],
                longitude: point[1]
            };
        });
    };

    if (isLoading || !pickupCoords || !deliveryCoords) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={currentLocation.coords}
                    title="Driver Location"
                />
                <Marker
                    coordinate={pickupCoords}
                    title="Pickup Location"
                />
                <Marker
                    coordinate={deliveryCoords}
                    title="Delivery Location"
                />
                <Polyline
                    coordinates={driverRoute}
                    strokeColor="hotpink"
                    strokeWidth={6}
                />
            </MapView>
            <View style={styles.detailsContainer}>
                <Text>Recipient Name: {packageDetails.fullName}</Text>
                <Text>Phone Number: {packageDetails.PhoneNumber}</Text>
                <Text>Pickup Location: {packageDetails.pickuplocation}</Text>
                <Text>Delivery Location: {packageDetails.deliverylocation}</Text>
                <Text>Ride Type: {packageDetails.rideType}</Text>
                <Text>Cost: {packageDetails.cost} TZS</Text>
            </View>
        </View>
    );
};

const { height } = Dimensions.get('window');
const mapHeight = height / 1.2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: mapHeight,
    },
    detailsContainer: {
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DriverMap;





// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import { useRoute } from '@react-navigation/native';
// import axios from 'axios';

// const GOOGLE_API_KEY = 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw';

// const DriverMap = () => {
//     const route = useRoute();
//     const { packageDetails, currentLocation } = route.params;
//     const [driverLocation, setDriverLocation] = useState(currentLocation.coords);
//     const [pickupCoords, setPickupCoords] = useState(null);
//     const [deliveryCoords, setDeliveryCoords] = useState(null);
//     const [driverRoute, setDriverRoute] = useState([]);

//     const mapRef = useRef(null);
//     const driverMarkerRef = useRef(null);

//     useEffect(() => {
//         const geocodeLocation = async (location) => {
//             try {
//                 const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`);
//                 if (response.data.status === 'OK') {
//                     const { lat, lng } = response.data.results[0].geometry.location;
//                     return { latitude: lat, longitude: lng };
//                 } else {
//                     Alert.alert('Error', 'Unable to geocode location');
//                     return null;
//                 }
//             } catch (error) {
//                 Alert.alert('Error', error.message);
//                 return null;
//             }
//         };

//         const fetchLocations = async () => {
//             const pickupLocation = await geocodeLocation(packageDetails.pickuplocation);
//             const deliveryLocation = await geocodeLocation(packageDetails.deliverylocation);
//             if (pickupLocation && deliveryLocation) {
//                 setPickupCoords(pickupLocation);
//                 setDeliveryCoords(deliveryLocation);

//                 const getRoute = async () => {
//                     try {
//                         const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${driverLocation.latitude},${driverLocation.longitude}&destination=${deliveryLocation.latitude},${deliveryLocation.longitude}&waypoints=${pickupLocation.latitude},${pickupLocation.longitude}&key=${GOOGLE_API_KEY}`);
//                         if (response.data.status === 'OK') {
//                             const points = response.data.routes[0].overview_polyline.points;
//                             const steps = decode(points);
//                             setDriverRoute(steps);
//                         } else {
//                             Alert.alert('Error', 'Unable to get route');
//                         }
//                     } catch (error) {
//                         Alert.alert('Error', error.message);
//                     }
//                 };

//                 getRoute();
//             }
//         };

//         fetchLocations();
//     }, []);

//     const decode = (t, e = 5) => {
//         let d = [],
//             n, o, u, l = 0,
//             r = 0,
//             h = 0,
//             i = 0,
//             a = 0;
//         while (l < t.length) {
//             n = 1;
//             o = 0;
//             while (true) {
//                 u = t.charCodeAt(l++) - 63 - 1;
//                 o += u << i;
//                 i += 5;
//                 if (u < 0x1f) break;
//             }
//             r += (o & 1 ? ~(o >> 1) : o >> 1);
//             n = 1;
//             o = 0;
//             i = 0;
//             while (true) {
//                 u = t.charCodeAt(l++) - 63 - 1;
//                 o += u << i;
//                 i += 5;
//                 if (u < 0x1f) break;
//             }
//             h += (o & 1 ? ~(o >> 1) : o >> 1);
//             d.push([r / e, h / e]);
//         }
//         return d.map(point => {
//             return {
//                 latitude: point[0],
//                 longitude: point[1]
//             };
//         });
//     };

//     const animateDriverMarker = (route) => {
//         let index = 0;
//         const intervalId = setInterval(() => {
//             if (index >= route.length - 1) {
//                 clearInterval(intervalId);
//                 return;
//             }
//             setDriverLocation(route[index]);
//             index += 1;
//         }, 1000);
//     };

//     useEffect(() => {
//         if (driverRoute.length > 0) {
//             animateDriverMarker(driverRoute);
//         }
//     }, [driverRoute]);

//     if (!pickupCoords || !deliveryCoords) {
//         return <Text>Loading...</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <MapView
//                 ref={mapRef}
//                 style={styles.map}
//                 initialRegion={{
//                     latitude: currentLocation.coords.latitude,
//                     longitude: currentLocation.coords.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//             >
//                 <Marker
//                     ref={driverMarkerRef}
//                     coordinate={driverLocation}
//                     title="Driver Location"
//                 />
//                 <Marker
//                     coordinate={pickupCoords}
//                     title="Pickup Location"
//                 />
//                 <Marker
//                     coordinate={deliveryCoords}
//                     title="Delivery Location"
//                 />
//                 <Polyline
//                     coordinates={driverRoute}
//                     strokeColor="hotpink"
//                     strokeWidth={6}
//                 />
//             </MapView>
//             <View style={styles.detailsContainer}>
//                 <Text>Recipient Name: {packageDetails.fullName}</Text>
//                 <Text>Phone Number: {packageDetails.PhoneNumber}</Text>
//                 <Text>Pickup Location: {packageDetails.pickuplocation}</Text>
//                 <Text>Delivery Location: {packageDetails.deliverylocation}</Text>
//                 <Text>Ride Type: {packageDetails.rideType}</Text>
//                 <Text>Cost: {packageDetails.cost} TZS</Text>
//             </View>
//         </View>
//     );
// };

// const { height } = Dimensions.get('window');
// const mapHeight = height / 1.2;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         height: mapHeight,
//     },
//     detailsContainer: {
//         padding: 20,
//     },
// });

// export default DriverMap;

