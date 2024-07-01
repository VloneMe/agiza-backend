import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../components/global/styles';
import { useRouter } from 'expo-router';
import { Line, PageLogo } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { userDataHook } from './../hook/userDataHook';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userData } = userDataHook();
  const router = useRouter();

  useEffect(() => {
    if (userData && userData.id) {
      // Fetch profile data
      axios.get(`http://192.168.58.127:4000/api/users/${userData.id}`)
        .then(response => {
          setProfile(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [userData]);

  const deleteProfile = () => {
    if (userData && userData.id) {
      axios.delete(`http://192.168.58.127:4000/api/users/${userData.id}`)
        .then(() => setProfile(null))
        .catch(error => console.error(error));
    }
    router.push('Login');
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.blue} />;
  }

  return (
    <View>
      <View style={styles.home}>
        <Text style={styles.text1}>Thank you for choosing aGIZA</Text>
        <View style={styles.view1}>
          <View style={styles.view8}>
            <Text style={styles.text2}>Welcome {userData ? userData.username : 'User'} to your profile</Text>
          </View>
        </View>
      </View>
      <View style={styles.home1}>
        <PageLogo resizeMode="cover" source={require("../assets/blankProfilePic.jpg")} />
        <Text>......</Text>
        <Text style={styles.header}>INFORMATION</Text>
        <View style={styles.container}>
          {profile ? (
            <View>
              <Text style={styles.details}>Name: {profile.username}</Text>
              <Text style={styles.details}>Email: {profile.email}</Text>
              <Text style={styles.details}>Phone Number: {profile.phone}</Text>
              <Text style={styles.details}>Role: {profile.role}</Text>
              <Button title="Edit Profile" onPress={() => router.push({ pathname: 'EditProfile', params: { profile } })} />
                <Line />
              <Button title="Delete Profile" onPress={deleteProfile} />
            </View>
          ) : (
            <Text>No profile data available</Text>
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
  container: {
    alignItems: 'center',
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
// import { userDataHook } from './../hook/userDataHook';

// const ProfileScreen = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { userData } = userDataHook();
//   const router = useRouter();

//   useEffect(() => {
//     if (userData && userData.id) {
//       // Fetch profile data
//       axios.get(`http://192.168.62.127:4000/api/users/${userData.id}`)
//         .then(response => {
//           setProfile(response.data);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error(error);
//           setLoading(false);
//         });
//     }
//   }, [userData]);

//   const deleteProfile = () => {
//     if (userData && userData.id) {
//       axios.delete(`http://192.168.62.127:4000/api/users/${userData.id}`)
//         .then(() => setProfile(null))
//         .catch(error => console.error(error));
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color={Colors.blue} />;
//   }

//   return (
//     <View>
//       <View style={styles.home}>
//         <Text style={styles.text1}>Thank you for choosing aGIZA</Text>
//         <View style={styles.view1}>
//           <View style={styles.view8}>
//             <Text style={styles.text2}>Welcome {userData ? userData.username : 'User'} to your profile</Text>
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
//               <Button title="Edit Profile" onPress={() => router.push('EditProfile', { profile })} />
//               <Button title="Delete Profile" onPress={deleteProfile} />
//             </View>
//           ) : (
//             <Text>No profile data available</Text>
//           )}
//         </View>
//       </View>
//       <StatusBar
//         style="dark"
//         backgroundColor="#2058c0"
//         translucent={true}
//       />
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
