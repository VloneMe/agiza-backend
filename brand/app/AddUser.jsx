import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (username && email && phone && password && role && plateNumber && vehicleName && vehicleColor) {
      axios.post('http://192.168.62.127:4000/api/users/register', {
        username,
        email,
        phone,
        password,
        role,
        plateNumber,
        vehicleName,
        vehicleColor,
      })
        .then(() => {
          Alert.alert('Success', 'User added successfully');
          router.back();
        })
        .catch(error => {
          console.error('API Error:', error.response ? error.response.data : error.message);
          Alert.alert('Error', 'Failed to add user');
        });
    } else {
      Alert.alert('Error', 'All fields are required');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New User</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        style={styles.input}
        placeholder="Plate Number"
        value={plateNumber}
        onChangeText={setPlateNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Name"
        value={vehicleName}
        onChangeText={setVehicleName}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Color"
        value={vehicleColor}
        onChangeText={setVehicleColor}
      />
      <Button title="Add User" onPress={handleSubmit} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddUser;
