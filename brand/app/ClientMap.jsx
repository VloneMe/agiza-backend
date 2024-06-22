import React, { Component, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const ClientMap = () => {

  const [state, setState] = useState({
    pickupCords: {
      latitude: -6.792354,
      longitude: 39.208328,
      // latitudeDelta: 0.3924108008642557,
      // longitudeDelta: 0.18297526985406876,
    },
    dropoffCords: {
      latitude: 31.159260,
      longitude: 31.129660,
      // latitudeDelta: 0.3924108008642557,
      // longitudeDelta: 0.18297526985406876,
    },
    }
  )

  const mapRef = useRef();

  const { pickupCords, dropoffCords } = state;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}
      >
        <Marker coordinate={pickupCords} pinColor="green" />
        <Marker coordinate={dropoffCords} pinColor="red" />
        <MapViewDirections 
          origin={pickupCords}
          destination={dropoffCords}
          apikey='AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw'
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                left: 30,
                top: 100,
                bottom: 300
              }
            });
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ClientMap;