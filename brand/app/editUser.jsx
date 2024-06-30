import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const EditUserScreen = () => {
  const { user } = useLocalSearchParams();
  const userData = JSON.parse(user);  // Parse the JSON string to an object

  const [username, setUsername] = useState(userData?.username || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(userData?.role || '');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setPhone(userData.phone);
      setRole(userData.role);
    }
  }, [userData]);

  const validateInputs = () => {
    if (!username || !email || !phone || !role) {
      Alert.alert('Validation Error', 'All fields except password are required.');
      return false;
    }
    return true;
  };

  const updateUser = () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    axios.put(`http://192.168.81.127:4000/api/users/${userData.id}`, { username, email, phone, password, role })
      .then(() => {
        Alert.alert('Success', 'User information updated successfully.');
        router.back();
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to update user information.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={username}
        onChangeText={setUsername}
        accessibilityLabel="Username"
        accessibilityHint="Enter the user's name"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        accessibilityLabel="Email"
        accessibilityHint="Enter the user's email"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        accessibilityLabel="Phone"
        accessibilityHint="Enter the user's phone number"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="Password"
        accessibilityHint="Enter a new password for the user"
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
        accessibilityLabel="Role"
        accessibilityHint="Enter the user's role"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Update" onPress={updateUser} />
      )}
      <StatusBar style="auto" />
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditUserScreen;
