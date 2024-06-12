import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getDistance } from 'geolib';

const ConfirmationScreen = ({ route, navigation }) => {
  // Provide default values for route and params
  const { name = '', pickupLocation = '', deliveryLocation = '', ride = '' } = route?.params || {};
  const [distance, setDistance] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      // Placeholder coordinates for example purposes
      const pickupCoords = { latitude: -6.7924, longitude: 39.2083 };
      const deliveryCoords = { latitude: -6.8163, longitude: 39.2805 };

      const dist = getDistance(pickupCoords, deliveryCoords) / 1000; // distance in km
      setDistance(dist);

      // Calculate amount (example rates)
      const ratePerKm = ride === 'Motorcycle' ? 500 : ride === 'Small Van' ? 1000 : 1500;
      setAmount(dist * ratePerKm);
    };

    calculateDistance();
  }, [ride]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirmation</Text>
      <Text style={styles.details}>Name: {name}</Text>
      <Text style={styles.details}>Pickup Location: {pickupLocation}</Text>
      <Text style={styles.details}>Delivery Location: {deliveryLocation}</Text>
      <Text style={styles.details}>Selected Ride: {ride}</Text>
      <Text style={styles.details}>Distance: {distance.toFixed(2)} km</Text>
      <Text style={styles.details}>Total Amount: {amount.toFixed(2)} TZS</Text>
      <Button title="Confirm" onPress={() => alert('Thank you for choosing aGIZA,, The ride is nearby to pick you parcel soon..! You will receive the SMS soon..!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ConfirmationScreen;
