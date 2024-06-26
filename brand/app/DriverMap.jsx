import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { useSearchParams } from 'expo-router';

const DriverMap = () => {
  const [params] = useSearchParams();
  const parcelData = JSON.parse(params.parcel);

  const [driverLocation, setDriverLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setDriverLocation(location.coords);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${location.coords.latitude},${location.coords.longitude}&destination=${parcelData.destinationLocation}&waypoints=${parcelData.pickUpLocation}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const points = decode(response.data.routes[0].overview_polyline.points);
      setRouteCoordinates(points);
    })();
  }, []);

  if (!driverLocation) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={driverLocation} title="Driver Location" />
        <Marker
          coordinate={{
            latitude: parseFloat(parcelData.pickUpLocation.split(',')[0]),
            longitude: parseFloat(parcelData.pickUpLocation.split(',')[1]),
          }}
          title="Pick Up Location"
        />
        <Marker
          coordinate={{
            latitude: parseFloat(parcelData.destinationLocation.split(',')[0]),
            longitude: parseFloat(parcelData.destinationLocation.split(',')[1]),
          }}
          title="Destination Location"
        />
        <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const decode = (t, e) => {
  let points = [];
  for (let step = 0; step < t.length; ) {
    let lat = 0,
      lng = 0,
      dlat = 0,
      dlng = 0,
      c = 0;
    do {
      c = t.charCodeAt(step++) - 63;
      dlat |= (c & 0x1f) << (c - 1);
    } while (c >= 0x20);
    lat += ((dlat & 1) ? ~(dlat >> 1) : dlat >> 1);
    dlat = 0;
    do {
      c = t.charCodeAt(step++) - 63;
      dlng |= (c & 0x1f) << (c - 1);
    } while (c >= 0x20);
    lng += ((dlng & 1) ? ~(dlng >> 1) : dlng >> 1);
    points.push({ latitude: lat * 1e-5, longitude: lng * 1e-5 });
  }
  return points;
};

export default DriverMap;
