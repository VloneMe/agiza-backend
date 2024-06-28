

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Colors } from '../components/global/styles';
import { useRouter } from 'expo-router';
import { userDataHook } from './../hook/userDataHook';

const EditProfile = ({ route }) => {
  const { profile } = route.params;
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [role, setRole] = useState(profile.role);
  const { userData } = userDataHook();
  const router = useRouter();

  const saveProfile = () => {
    axios.put(`http://192.168.81.127:4000/api/users/${userData.id}`, {
      username,
      email,
      phone,
      role,
    })
    .then(() => {
      router.push('ProfileScreen');
    })
    .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
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
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <Button title="Save" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default EditProfile;



// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { Colors } from '../components/global/styles';
// import { useRouter, useRoute } from 'expo-router';

// const EditProfile = () => {
//   const router = useRouter();
//   const route = useRoute();
//   const { profile } = route.params;

//   const [username, setUsername] = useState(profile.username);
//   const [email, setEmail] = useState(profile.email);
//   const [phone, setPhone] = useState(profile.phone);
//   const [role, setRole] = useState(profile.role);

//   const saveProfile = () => {
//     axios.put(`http://192.168.62.127:4000/api/users/${profile.id}`, {
//       username,
//       email,
//       phone,
//       role,
//     })
//     .then(() => {
//       router.push('/ProfileScreen');
//     })
//     .catch(error => console.error('Error updating profile:', error));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Edit Profile</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Role"
//         value={role}
//         onChangeText={setRole}
//       />
//       <Button title="Save" onPress={saveProfile} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
// });

// export default EditProfile;



