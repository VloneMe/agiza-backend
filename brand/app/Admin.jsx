import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Colors } from '../components/global/styles';
import { StatusBar } from 'expo-status-bar';

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    // Fetch all users data
    axios.get('http://192.168.81.127:4000/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        Alert.alert('Error', 'Failed to load users data.');
        setLoading(false);
      });
  }, []);

  const editUser = (user) => {
    router.push({ pathname: 'editUser', params: { user: JSON.stringify(user) } });
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userDetails}>Name: {item.username}</Text>
      <Text style={styles.userDetails}>Email: {item.email}</Text>
      <Text style={styles.userDetails}>Phone Number: {item.phone}</Text>
      <Text style={styles.userDetails}>Password: {item.password}</Text>
      <Text style={styles.userDetails}>Role: {item.role}</Text>
      <Button title="Edit" onPress={() => editUser(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Management</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.blue} />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
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
  userContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  userDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AdminScreen;

