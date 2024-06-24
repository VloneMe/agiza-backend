import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import ImagePath from "./../constant/ImagePath";
import { getCurrentLocation, locationPermission } from "./../helper/helperFunction";
import { useRouter } from 'expo-router';

const ClientMap = () => {
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
      <View style={styles.bottomCard}>
        <Text>Where are you going..?</Text>
        <TouchableOpacity style={styles.inputStyle} onPress={onPressLocation}>
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
    marginTop: 16
  },
});

export default ClientMap;
