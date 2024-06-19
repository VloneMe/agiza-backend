import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data
    axios.get('https://your-api-endpoint.com/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteProfile = () => {
    axios.delete('https://your-api-endpoint.com/profile')
      .then(() => setProfile(null))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <View>
          <Text>Name: {profile.name}</Text>
          <Text>Email: {profile.email}</Text>
          <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile', { profile })} />
          <Button title="Delete Profile" onPress={deleteProfile} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
