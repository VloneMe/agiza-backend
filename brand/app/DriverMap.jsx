import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import ImagePath from "./../constant/ImagePath";
import { getCurrentLocation, locationPermission } from "./../helper/helperFunction";
import { useRouter } from 'expo-router';

const DriverMap = () => {
  const [state, setState] = useState({
    pickupCords: {
      latitude: -6.8226625,
      longitude: 39.30244649999999,
    },
    dropoffCords: null,
  });

  const { pickupCords, dropoffCords } = state;

  const mapRef = useRef(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const getLiveLocation = async () => {
      const locPermissionDenied = await locationPermission();
      if (!locPermissionDenied) {
        const { latitude, longitude } = await getCurrentLocation();
        setState((prevState) => ({
          ...prevState,
          pickupCords: {
            latitude,
            longitude,
          },
        }));
      }
    };

    getLiveLocation();
  }, []);

  const fetchValues = (data) => {
    setState((prevState) => ({
      ...prevState,
      dropoffCords: {
        latitude: data.dropoffCords.latitude,
        longitude: data.dropoffCords.longitude,
      },
    }));
    console.log("Data===>", data);
  };

  const onPressLocation = () => {
    router.push('/Destination');
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...pickupCords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapRef}
        >
          <Marker 
            coordinate={pickupCords} 
            pinColor="green" 
            image={ImagePath.icCurLoc}
          />
          {dropoffCords && (
            <Marker 
              coordinate={dropoffCords} 
              pinColor="red" 
              image={ImagePath.icGreenMarker}
            />
          )}
          {dropoffCords && (
            <MapViewDirections 
              origin={pickupCords}
              destination={dropoffCords}
              apikey='AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw'
              strokeWidth={3}
              strokeColor="hotpink"
              onReady={result => {
                if (mapRef.current) {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 30,
                      left: 30,
                      top: 100,
                      bottom: 300,
                    },
                    animated: true,
                  });
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                } else {
                  console.log('MapView reference is not available');
                }
              }}
              onError={(errorMessage) => {
                console.log('GOT AN ERROR', errorMessage);
              }}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 16
  },
});

export default DriverMap;



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { useSearchParams } from 'expo-router';

// const DriverMap = () => {
//   const [params] = useSearchParams();
//   const parcelData = JSON.parse(params.parcel);

//   const [driverLocation, setDriverLocation] = useState(null);
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert('Permission to access location was denied');
//           return;
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         setDriverLocation(location.coords);

//         const driverCoords = {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         };

//         const pickUpCoords = {
//           latitude: parseFloat(parcelData.pickUpLocation.split(',')[0]),
//           longitude: parseFloat(parcelData.pickUpLocation.split(',')[1]),
//         };

//         const destinationCoords = {
//           latitude: parseFloat(parcelData.destinationLocation.split(',')[0]),
//           longitude: parseFloat(parcelData.destinationLocation.split(',')[1]),
//         };

//         setRouteCoordinates([driverCoords, pickUpCoords, destinationCoords]);
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Error fetching location data');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (!driverLocation) {
//     return <Text>Location not available</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: driverLocation.latitude,
//           longitude: driverLocation.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker coordinate={driverLocation} title="Driver Location" />
//         <Marker
//           coordinate={{
//             latitude: parseFloat(parcelData.pickUpLocation.split(',')[0]),
//             longitude: parseFloat(parcelData.pickUpLocation.split(',')[1]),
//           }}
//           title="Pick Up Location"
//         />
//         <Marker
//           coordinate={{
//             latitude: parseFloat(parcelData.destinationLocation.split(',')[0]),
//             longitude: parseFloat(parcelData.destinationLocation.split(',')[1]),
//           }}
//           title="Destination Location"
//         />
//         <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default DriverMap;

