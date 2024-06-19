import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Colors, parameters } from '../components/global/styles';
import { useRouter, useSearchParams } from 'expo-router';
import { PageLogo, StyledButton } from '../components/styles';
import { StatusBar } from 'expo-status-bar';


const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const router = useRouter(); 

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
    <View>
      <View style={styles.home}>
        <Text style={styles.text1}>Thank you for choosing aGIZA</Text>
        <View style={styles.view1}>
          <View style={styles.view8}>
            <Text style={styles.text2}>Welcome to your profile</Text>
          </View>
        </View>
      </View>
      <View style={styles.home1}>
        <PageLogo resizeMode="cover" source={require("./../assets/blankProfilePic.jpg")} />
        <Text>......</Text>
        <Text style={styles.header}>INFORMATION</Text>
        <View style={styles.container}>
        {profile ? (
          <View>
            <Text style={styles.details}>Name: {profile.name}</Text>
            <Text style={styles.details}>Email: {profile.email}</Text>
            <Text style={styles.details}>Role: {profile.role}</Text>
            <Button title="Edit Profile" onPress={() => router.push('EditProfile', { profile })} />
            <Button title="Delete Profile" onPress={deleteProfile} />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      </View>
      <StatusBar
        style="dark"
        backgroundColor="#2058c0"
        translucent={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  home1: {
    // flex: 1,
    marginTop: 90,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  home: {
    backgroundColor: Colors.blue,
    paddingLeft: 20,
  },
  text1: {
    color: Colors.white,
    fontSize: 21,
    paddingBottom: 20,
    alignContent: "center",
    textAlign: "center",
    paddingTop: 20,
  },
  view1: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 30,
  },
  view8: {
    flex: 4,
    marginTop: -25,
  },
  text2: {
    color: Colors.white,
    fontSize: 16,
    paddingBottom: 10,
    textAlign: "center",
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
