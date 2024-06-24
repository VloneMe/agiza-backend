// screens/ClientMap.js
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import ImagePath from "./../constant/ImagePath";
import { useNavigation, useRoute } from '@react-navigation/native';

const ClientMap = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();

  const [state, setState] = useState({
    pickupCords: {
      latitude: -6.8226625,
      longitude: 39.30244649999999,
      latitudeDelta: 0.3924108008642557,
      longitudeDelta: 0.18297526985406876,
    },
    dropoffCords: {
      latitude: -6.6173653,
      longitude: 39.1235548,
      latitudeDelta: 0.3924108008642557,
      longitudeDelta: 0.18297526985406876,
    },
  });

  const { pickupCords, dropoffCords } = state;

  const setCoordinates = (data) => {
    setState((prevState) => ({
      ...prevState,
      pickupCords: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
        latitudeDelta: 0.3924108008642557,
        longitudeDelta: 0.18297526985406876,
      },
      dropoffCords: {
        latitude: data.dropoffCords.latitude,
        longitude: data.dropoffCords.longitude,
        latitudeDelta: 0.3924108008642557,
        longitudeDelta: 0.18297526985406876,
      },
    }));
  };

  useEffect(() => {
    if (route.params?.pickupCords && route.params?.dropoffCords) {
      setCoordinates(route.params);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={pickupCords}
          ref={mapRef}
        >
          <Marker 
            coordinate={pickupCords} 
            pinColor="green" 
            image={ImagePath.icCurLoc}
          />
          <Marker 
            coordinate={dropoffCords} 
            pinColor="red" 
            image={ImagePath.icGreenMarker}
          />
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
        </MapView>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where are you going..?</Text>
        <TouchableOpacity 
          style={styles.inputStyle} 
          onPress={() => navigation.navigate('Destination', { setCoordinates })}
        >
          <Text>Choose your location</Text>
        </TouchableOpacity>
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
    marginTop: 16,
  },
});

export default ClientMap;






// import React, { useRef, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import ImagePath from "./../constant/ImagePath";
// import { useRouter } from 'expo-router';

// const ClientMap = () => {
//   const mapRef = useRef(null);

//   const [state, setState] = useState({
//     pickupCords: {
//       latitude: -6.8226625,
//       longitude: 39.30244649999999,
//       latitudeDelta: 0.3924108008642557,
//       longitudeDelta: 0.18297526985406876,
//     },
//     dropoffCords: {
//       latitude: -6.6173653,
//       longitude: 39.1235548,
//       latitudeDelta: 0.3924108008642557,
//       longitudeDelta: 0.18297526985406876,
//     },
//   });

//   const { pickupCords, dropoffCords } = state;

//   const onPressLocation = () => {
//     {getCordinates: fetchValues}
//   };

//   const fetchValues = (data) => {
//     setState({
//       startingCords: {
//         latitude: data.pickupCords.latitude,
//         longitude: data.pickupCords.longitude,
//       },
//       destinationCords: {
//         latitude: data.dropoffCords.latitude,
//         longitude: data.dropoffCords.longitude,
//       }
//     });
//     console.log("Data===>", data);
//   }

//   const router = useRouter(); // Initialize the router

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1 }}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           style={StyleSheet.absoluteFill}
//           initialRegion={pickupCords}
//           ref={mapRef}
//         >
//           <Marker 
//             coordinate={pickupCords} 
//             pinColor="green" 
//             image={ImagePath.icCurLoc}
//           />
//           <Marker 
//             coordinate={dropoffCords} 
//             pinColor="red" 
//             image={ImagePath.icGreenMarker}
//           />
//           <MapViewDirections 
//             origin={pickupCords}
//             destination={dropoffCords}
//             apikey='AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw'
//             strokeWidth={3}
//             strokeColor="hotpink"
//             onReady={result => {
//               if (mapRef.current) {
//                 mapRef.current.fitToCoordinates(result.coordinates, {
//                   edgePadding: {
//                     right: 30,
//                     left: 30,
//                     top: 100,
//                     bottom: 300,
//                   },
//                   animated: true,
//                 });
//                 console.log(`Distance: ${result.distance} km`);
//                 console.log(`Duration: ${result.duration} min.`);
//               } else {
//                 console.log('MapView reference is not available');
//               }
//             }}
//             onError={(errorMessage) => {
//               console.log('GOT AN ERROR', errorMessage);
//             }}
//           />
//         </MapView>
//       </View>
//       <View style={styles.bottomCard}>
//         <Text>Where are you going..?</Text>
//         <TouchableOpacity style={styles.inputStyle} onPress={(onPressLocation) => router.push('/Destination')}>
//           <Text>Choose your location</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bottomCard: {
//     backgroundColor: 'white',
//     width: '100%',
//     padding: 30,
//     borderTopEndRadius: 24,
//     borderTopStartRadius: 24,
//   },
//   inputStyle: {
//     backgroundColor: 'white',
//     borderRadius: 4,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//     marginTop: 16
//   },
// });

// export default ClientMap;
