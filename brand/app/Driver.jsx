import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw';

const Driver = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [cost, setCost] = useState(null);
    const [loading, setLoading] = useState(true);

    const { pickuplocation, deliverylocation } = route.params;

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
                const costValue = distanceValue * 2000;

                setDistance(distanceText);
                setDuration(element.duration.text);
                setCost(costValue);
            } else {
                Alert.alert('Error', 'Unable to calculate distance');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
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
                <Text>Delivery Location: {deliverylocation}</Text>
                {loading ? (
                    <Text>Calculating distance...</Text>
                ) : (
                    <>
                        <Text>Distance: {distance}</Text>
                        <Text>Duration: {duration}</Text>
                        <Text>Cost: {cost} Tsh</Text>
                    </>
                )}
                <Button title="Accept" onPress={() => Alert.alert('Accepted')} />
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
});

export default Driver;






// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import * as Location from 'expo-location';

// const Driver = () => {
//     const route = useRoute();
//     const navigation = useNavigation();
//     const [location, setLocation] = React.useState(null);

//     React.useEffect(() => {
//         (async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Permission to access location was denied');
//                 return;
//             }

//             let location = await Location.getCurrentPositionAsync({});
//             setLocation(location);
//         })();
//     }, []);

//     if (!location) {
//         return <Text>Loading...</Text>;
//     }

//     const { pickuplocation, fullName, deliverylocation, PhoneNumber, Detail, Inside } = route.params;

//     const handleAccept = () => {
//         // Implement the logic to calculate time, distance, and cost
//         // For example, using Google Maps Distance Matrix API or similar
//         // Then navigate to the next screen or update the state
//     };

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
//                 <Text>Receiver's Name: {fullName}</Text>
//                 <Text>Delivery Location: {deliverylocation}</Text>
//                 <Text>Phone Number: {PhoneNumber}</Text>
//                 <Text>Parcel Details: {Detail}</Text>
//                 <Text>What's Inside: {Inside}</Text>
//                 <Button title="Accept" onPress={handleAccept} />
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



// import React from 'react';
// import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
// import { useRouter } from 'expo-router';

// const Driver = () => {

//   const router = useRouter();

//   // Hardcoded list of parcels for testing purposes
//   const parcels = [
//     {
//       id: '1',
//       name: 'Joel Mdudu',
//       phoneNumber: '0657909090',
//       pickUpLocation: '-6.795750,39.190710', // Example coordinates kibo complex Tegeta
//       destinationLocation: '-6.181240,35.748161' // Example coordinates Madale 
//     },
//     {
//       id: '2',
//       name: 'Ally Khamis',
//       phoneNumber: '987654321',
//       pickUpLocation: '-26.041389,28.155149', // Example coordinates Mliman city 
//       destinationLocation: '-6.775980,39.237650' // Example coordinates kijitonyama 
//     },
//   ];

//   const handleAccept = (parcel) => {
//     router.push({
//       pathname: '/DriverMap',
//       params: { parcel: JSON.stringify(parcel) }, // Pass parcel as a string
//     });
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.parcelContainer}>
//       <Text style={styles.userDetails}>Name: {item.name}</Text>
//       <Text style={styles.userDetails}>Phone Number: {item.phoneNumber}</Text>
//       <Text style={styles.userDetails}>Pick Up Location: {item.pickUpLocation}</Text>
//       <Text style={styles.userDetails}>Destination Location: {item.destinationLocation}</Text>
//       <Button title="Accept" onPress={() => handleAccept(item)} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Driver Notification Page</Text>
//       <FlatList
//         data={parcels}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   parcelContainer: {
//     marginBottom: 20,
//     padding: 15,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//   },
//   userDetails: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default Driver;






// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// const Driver = ({ navigation }) => {
//   const [parcel, setParcel] = useState(null);

//   useEffect(() => {
  
//     axios.get('http://192.168.81.127:4000/api/parcels')
//       .then(response => {
//         setParcel(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleAccept = () => {
//     navigation.navigate('DriverMapPage', { parcel });
//   };

//   if (!parcel) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Name: {parcel.name}</Text>
//       <Text>Phone Number: {parcel.phoneNumber}</Text>
//       <Text>Pick Up Location: {parcel.pickUpLocation}</Text>
//       <Text>Destination Location: {parcel.destinationLocation}</Text>
//       <Button title="Accept" onPress={handleAccept} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Driver;





// // import { View, Text, StyleSheet, Button } from 'react-native'
// // import React, { useState, useRef, useContext } from 'react'
// // import { StatusBar } from 'expo-status-bar'
// // import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
// // import * as FileSystem from 'expo-file-system'
// // import { shareAsync } from 'expo-sharing'

// // let locationOfInterest = [
// //   {
// //       title: "First",
// //       location: {
// //         latitude: -6.771181090185626,
// //         longitude: 39.23994289711118,
// //       },
// //       description: "My first marker"
    
// //   }, 
// //   {
// //       title: "Second",
// //       location: {
// //         latitude: -6.772346702012774,
// //         longitude: 39.24027716740966,
// //       },
// //       description: "My Second marker"
    
// //   },
// // ]


// // export default function Driver (){
  
// // // const [count, setCount] = useState(0);
// // const [draggableMarkerCoodrd, setDraggableMarkerCoodrd] = useState({latitude: -6.780, longitude: 39.284});

// //   const mapRef = React.useRef(null);
// //   const onRegionChange = (region) => {
// //     console.log(region);
// //   };

// // const showLocationsOfInterest = () => {
// //   return locationOfInterest.map((item, index) => {
// //     return (
// //       <Marker
// //         key={index}
// //         coordinate={item.location}
// //         title={item.title}
// //         description={item.description}
// //       />
// //     )
// //   })
// // };

// // const takeSnapshotAndShare = async () => {
// //   const snapshot = await mapRef.current.takeSnapshot({ width: 300, height: 300, format: 'base64' });
// //   const url = FileSystem.documentDirectory + 'snapshot.png';
// //   await FileSystem.writeAsStringAsync(url, snapshot, { encoding: FileSystem.EncodingType.Base64 });
// //   await shareAsync(url);
// // };

// //   return (
// //     <View styles={styles.container}>
// //       <MapView
// //         provider={PROVIDER_GOOGLE}
// //         ref={mapRef}
// //         style={styles.map}
// //         onRegionChange={onRegionChange}
// //         initialRegion={{
// //           latitude: -6.780508589077584,
// //           longitude: 39.28488766774535,
// //           latitudeDelta: 0.3924108008642557,
// //           longitudeDelta: 0.18297526985406876,
// //         }}
// //       >
// //         {showLocationsOfInterest()}
// //         <Marker 
// //           draggable
// //           pinColor='green'
// //           coordinate={draggableMarkerCoodrd}
// //           onDragEnd={(e) => setDraggableMarkerCoodrd(e.nativeEvent.coordinate)}
// //           title={"Drag me"}
// //           description={"I'm draggable"}
// //         />
// //         <Marker
// //           pinColor='Yellow'
// //           coordinate={{latitude: -6.980, longitude: 39.484}}
// //         >
// //           <Callout>
// //             {/* <Text>Count: {count}</Text>////////////// */}
// //             {/* <Button title="Take snap and share" onPress={takeSnapshotAndShare} /> */}
// //           </Callout>
// //         </Marker>
// //         <Text styles={styles.MapOverlay} > Hellow </Text>
// //       </MapView>
// //       <StatusBar style="auto" />
// //     </View>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   map: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   MapOverlay: {
// //     position: 'absolute',
// //     bottom: 50,
// //     backgroundColor: '#ffffff',
// //     padding: 16,
// //     borderRadius: 5,
// //     borderWidth: 2,
// //     left: "25%",
// //     width: "50%",
// //     textAlign: 'center',
// //   }
// // });