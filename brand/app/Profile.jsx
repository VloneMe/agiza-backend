import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { Colors } from '../components/global/styles';
import { useRouter } from 'expo-router';
import { PageLogo } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { userDataHook } from '../hook/userDataHook';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const { userData } = userDataHook();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Error', 'No token found, please login again');
        router.push('/Login');
        return;
      }

      if (!userData || !userData.id) {
        Alert.alert('Error', 'User data not available, please login again');
        router.push('/Login');
        return;
      }

      try {
        const response = await axios.get(`http://192.168.230.127:4000/api/users/${userData.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          Alert.alert('Error', 'You are not authorized to access this resource');
          router.push('/Login');
        }
      }
    };

    fetchProfile();
  }, [userData]);

  const deleteProfile = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      Alert.alert('Error', 'No token found, please login again');
      router.push('/Login');
      return;
    }

    if (!userData || !userData.id) {
      Alert.alert('Error', 'User data not available, please login again');
      router.push('/Login');
      return;
    }

    try {
      await axios.delete(`http://192.168.230.127:4000/api/users/${userData.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Alert.alert('Success', 'Profile deleted successfully');
      await AsyncStorage.removeItem('token');
      router.push('/Login');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        Alert.alert('Error', 'You are not authorized to delete this profile');
        router.push('/Login');
      }
    }
  };

  if (!profile) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <PageLogo resizeMode="cover" source={require("../assets/img1.png")} />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Name: {profile.name}</Text>
      <Text style={styles.subtitle}>Email: {profile.email}</Text>
      <Text style={styles.subtitle}>Role: {profile.role}</Text>
      <Button title="Delete Profile" onPress={deleteProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ProfileScreen;



// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { Colors } from '../components/global/styles';
// import { useRouter } from 'expo-router';
// import { PageLogo } from '../components/styles';
// import { StatusBar } from 'expo-status-bar';
// import { userDataHook } from '../hook/userDataHook';

// const ProfileScreen = () => {
//   const [profile, setProfile] = useState(null);
//   const { userData } = userDataHook();
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch profile data
//     axios.get('http://192.168.230.127:4000/api/users/') // Update the endpoint as needed
//       .then(response => setProfile(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   const deleteProfile = () => {
//     axios.delete('http://192.168.230.127:4000/api/users/profile') // Update the endpoint as needed
//       .then(() => setProfile(null))
//       .catch(error => console.error(error));
//   };

//   return (
//     <View>
//       <View style={styles.home}>
//         <Text style={styles.text1}>Thank you for choosing aGIZA</Text>
//         <View style={styles.view1}>
//           <View style={styles.view8}>
//             <Text style={styles.text2}>Welcome to your profile</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.home1}>
//         <PageLogo resizeMode="cover" source={require("../assets/blankProfilePic.jpg")} />
//         <Text>......</Text>
//         <Text style={styles.header}>INFORMATION</Text>
//         <View style={styles.container}>
//           {profile ? (
//             <View>
//               <Text style={styles.details}>Name: {profile.username}</Text>
//               <Text style={styles.details}>Email: {profile.email}</Text>
//               <Text style={styles.details}>Phone Number: {profile.phone}</Text>
//               <Text style={styles.details}>Role: {profile.role}</Text>
//               <Button title="Edit Profile" onPress={() => router.push({ pathname: 'EditProfile', params: { profile } })} />
//               <Button title="Delete Profile" onPress={deleteProfile} />
//             </View>
//           ) : (
//             <ActivityIndicator size="large" color={Colors.primary} />
//           )}
//         </View>
//       </View>
//       <StatusBar style="dark" backgroundColor="#2058c0" translucent={true} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   home1: {
//     marginTop: 90,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   home: {
//     backgroundColor: Colors.blue,
//     paddingLeft: 20,
//   },
//   text1: {
//     color: Colors.white,
//     fontSize: 21,
//     paddingBottom: 20,
//     alignContent: "center",
//     textAlign: "center",
//     paddingTop: 20,
//   },
//   view1: {
//     flexDirection: "row",
//     flex: 1,
//     paddingTop: 30,
//   },
//   view8: {
//     flex: 4,
//     marginTop: -25,
//   },
//   text2: {
//     color: Colors.white,
//     fontSize: 16,
//     paddingBottom: 10,
//     textAlign: "center",
//   },
//   details: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   container: {
//     alignItems: 'center',
//   },
// });

// export default ProfileScreen;

