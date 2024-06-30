import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Colors } from '../components/global/styles';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch all users data
    axios.get('http://192.168.62.127:4000/api/users')
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
    router.push({ pathname: 'EditUser', params: { user: JSON.stringify(user) } });
  };

  const addUser = () => {
    router.push({ pathname: 'AddUser' });
  };

  const deleteUser = (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://192.168.62.127:4000/api/users/${userId}`)
              .then(response => {
                setUsers(users.filter(user => user._id !== userId));
                Alert.alert('Success', 'User deleted successfully.');
              })
              .catch(error => {
                console.error('API Error:', error.response ? error.response.data : error.message);
                Alert.alert('Error', 'Failed to delete user.');
              });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userDetails}>Name: {item.username}</Text>
      <Text style={styles.userDetails}>Email: {item.email}</Text>
      <Text style={styles.userDetails}>Phone Number: {item.phone}</Text>
      <Text style={styles.userDetails}>Role: {item.role}</Text>
      {item.role === 'courier' && (
        <>
          <Text style={styles.userDetails}>Plate Number: {item.plateNumber}</Text>
          <Text style={styles.userDetails}>Vehicle Name: {item.vehicleName}</Text>
          <Text style={styles.userDetails}>Vehicle Color: {item.vehicleColor}</Text>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => editUser(item)} />
        <Button title="Delete" color="red" onPress={() => deleteUser(item._id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>User Management</Text>
        <TouchableOpacity onPress={addUser} style={styles.addButton}>
          <Icon name="plus-circle" size={30} color={Colors.blue} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.blue} />
      ) : (
        <FlatList
          data={users}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AdminScreen;




// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { useRouter } from 'expo-router';
// import { Colors } from '../components/global/styles';
// import { StatusBar } from 'expo-status-bar';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const AdminScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter(); 

//   useEffect(() => {
//     // Fetch all users data
//     axios.get('http://192.168.62.127:4000/api/users')
//       .then(response => {
//         setUsers(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('API Error:', error.response ? error.response.data : error.message);
//         Alert.alert('Error', 'Failed to load users data.');
//         setLoading(false);
//       });
//   }, []);

//   const editUser = (user) => {
//     router.push({ pathname: 'editUser', params: { user: JSON.stringify(user) } });
//   };

//   const addUser = () => {
//     router.push({ pathname: 'AddUser' });
//   };

//   const deleteUser = (userId) => {
//     Alert.alert(
//       'Delete User',
//       'Are you sure you want to delete this user?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             axios.delete(`http://192.168.62.127:4000/api/users/${userId}`)
//               .then(response => {
//                 setUsers(users.filter(user => user._id !== userId));
//                 Alert.alert('Success', 'User deleted successfully.');
//               })
//               .catch(error => {
//                 console.error('API Error:', error.response ? error.response.data : error.message);
//                 Alert.alert('Error', 'Failed to delete user.');
//               });
//           },
//         },
//       ]
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.userContainer}>
//       <Text style={styles.userDetails}>Name: {item.username}</Text>
//       <Text style={styles.userDetails}>Email: {item.email}</Text>
//       <Text style={styles.userDetails}>Phone Number: {item.phone}</Text>
//       <Text style={styles.userDetails}>Role: {item.role}</Text>
//       {item.role === 'courier' && (
//         <>
//           <Text style={styles.userDetails}>Plate Number: {item.plateNumber}</Text>
//           <Text style={styles.userDetails}>Vehicle Name: {item.vehicleName}</Text>
//           <Text style={styles.userDetails}>Vehicle Color: {item.vehicleColor}</Text>
//         </>
//       )}
//       <View style={styles.buttonContainer}>
//         <Button title="Edit" onPress={() => editUser(item)} />
//         <Button title="Delete" color="red" onPress={() => deleteUser(item._id)} />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>User Management</Text>
//         <TouchableOpacity onPress={addUser} style={styles.addButton}>
//           <Icon name="plus-circle" size={30} color={Colors.blue} />
//         </TouchableOpacity>
//       </View>
//       {loading ? (
//         <ActivityIndicator size="large" color={Colors.blue} />
//       ) : (
//         <FlatList
//           data={users}
//           renderItem={renderItem}
//           keyExtractor={item => item._id ? item._id.toString() : Math.random().toString()}
//         />
//       )}
//       <StatusBar style="dark" backgroundColor="#2058c0" translucent={true} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   addButton: {
//     marginBottom: 20,
//   },
//   userContainer: {
//     marginBottom: 20,
//     padding: 15,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//   },
//   userDetails: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
// });

// export default AdminScreen;
