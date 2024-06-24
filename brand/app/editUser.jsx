import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const EditUserScreen = () => {
  const { user } = useLocalSearchParams();
  const userData = JSON.parse(user);  // Parse the JSON string to an object

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setPhone(userData.phone);
      setPassword(userData.password);
      setRole(userData.role);
    }
  }, [userData]);

  const updateUser = () => {
    axios.put(`http://192.168.81.127:4000/api/users/${userData.id}`, { username, email, phone, password, role })
      .then(() => {
        Alert.alert('Success', 'User information updated successfully.');
        router.back();
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to update user information.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={text => setRole(text)}
      />
      <Button title="Update" onPress={updateUser} />
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




// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';

// const EditUserScreen = () => {
//   const { user } = useLocalSearchParams();
//   const userData = JSON.parse(user);  // Parse the JSON string to an object

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');

//   const router = useRouter();

//   useEffect(() => {
//     if (userData) {
//       setUsername(userData.username);
//       setEmail(userData.email);
//       setPhone(userData.phone);
//       setPassword(userData.password);
//       setRole(userData.role);
//     }
//   }, [userData]);

//   const updateUser = () => {
//     axios.put(`http://192.168.81.127:4000/api/users/${userData.id}`, { username, email, phone, password, role })
//       .then(() => {
//         Alert.alert('Success', 'User information updated successfully.');
//         router.back();
//       })
//       .catch(error => {
//         console.error(error);
//         Alert.alert('Error', 'Failed to update user information.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Edit User</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
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
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Role"
//         value={role}
//         onChangeText={setRole}
//       />
//       <Button title="Update" onPress={updateUser} />
//       <StatusBar style="auto" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default EditUserScreen;






// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';

// const EditUserScreen = () => {
//   const { user } = useLocalSearchParams();
//   const [username, setUsername] = useState(user.username);
//   const [email, setEmail] = useState(user.email);
//   const [phone, setPhone] = useState(user.phone);
//   const [password, setPassword] = useState(user.password);
//   const [role, setRole] = useState(user.role);
//   const router = useRouter();

//   const updateUser = () => {
//     axios.put(`http://192.168.81.127:4000/api/users/${user.id}`, { username, email, phone, password, role })
//       .then(() => {
//         Alert.alert('Success', 'User information updated successfully.');
//         router.back();
//       })
//       .catch(error => {
//         console.error(error);
//         Alert.alert('Error', 'Failed to update user information.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Edit User</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
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
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Role"
//         value={role}
//         onChangeText={setRole}
//       />
//       <Button title="Update" onPress={updateUser} />
//       <StatusBar style="auto" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default EditUserScreen;





// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { useRouter, useSearchParams } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';

// const editUser = () => {
//   const { user } = useSearchParams();
//   const [username, setName] = useState(user.username);
//   const [email, setEmail] = useState(user.email);
//   const [phone, setphone] = useState(user.phone);
//   const [password, setpassword] = useState(user.password);
//   const [role, setRole] = useState(user.role);
//   const router = useRouter();

//   const updateUser = () => {
//     axios.put(`http://192.168.81.127:4000/api/users/${user.id}`, { username, email, phone, password, role })
//       .then(() => {
//         Alert.alert('Success', 'User information updated successfully.');
//         router.back();
//       })
//       .catch(error => {
//         console.error(error);
//         Alert.alert('Error', 'Failed to update user information.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Edit User</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={username}
//         onChangeText={setName}
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
//         onChangeText={setphone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setpassword}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Role"
//         value={role}
//         onChangeText={setRole}
//       />
//       <Button title="Update" onPress={updateUser} />
//       <StatusBar 
//         style="auto"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default editUser;
