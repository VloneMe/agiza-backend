import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Colors } from '../components/global/styles';
import { StatusBar } from 'expo-status-bar';

const PackagesScreen = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch all packages data
    axios.get('http://192.168.62.127:4000/api/packages')
      .then(response => {
        setPackages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        Alert.alert('Error', 'Failed to load packages data.');
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.packageContainer}>
      <Text style={styles.packageDetails}>Package ID: {item._id}</Text>
      <Text style={styles.packageDetails}>Reciver Name: {item.fullName}</Text>
      <Text style={styles.packageDetails}>Reciver Phone Numbr: {item.PhoneNumber}</Text>
      <Text style={styles.packageDetails}>Pick-up Location: {item.pickuplocation}</Text>
      <Text style={styles.packageDetails}>Delivery Location: {item.deliverylocation}</Text>
      <Text style={styles.packageDetails}>Package Description: {item.Detail}</Text>
      <Text style={styles.packageDetails}>Inside of the Package: {item.Inside}</Text>
      <Text style={styles.packageDetails}>Ride Type: {item.rideType}</Text>
      <Text style={styles.packageDetails}>Package Cost: {item.cost}</Text>
      <Text style={styles.packageDetails}>Status: {item.status}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deletePackage(item._id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const deletePackage = (packageId) => {
    Alert.alert(
      'Delete Package',
      'Are you sure you want to delete this package?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://192.168.62.127:4000/api/packages/${packageId}`)
              .then(response => {
                setPackages(packages.filter(packageItem => packageItem._id !== packageId));
                Alert.alert('Success', 'Package deleted successfully.');
              })
              .catch(error => {
                console.error('API Error:', error.response ? error.response.data : error.message);
                Alert.alert('Error', 'Failed to delete package.');
              });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Packages</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.blue} />
      ) : (
        <FlatList
          data={packages}
          renderItem={renderItem}
          keyExtractor={item => item._id ? item._id.toString() : Math.random().toString()}
        />
      )}
      <StatusBar style="dark" backgroundColor="#2058c0" translucent={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  packageContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  packageDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default PackagesScreen;
