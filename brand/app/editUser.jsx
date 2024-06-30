import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EditUser = () => {
  const { user } = useLocalSearchParams();
  const userData = JSON.parse(user);
  const [formData, setFormData] = useState(userData);
  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);  // Debugging log

    axios.put(`http://192.168.62.127:4000/api/users/${formData._id}`, formData)
      .then(response => {
        console.log('Response:', response.data);  // Debugging log
        Alert.alert('Success', 'User details updated successfully.');
        router.back();
      })
      .catch(error => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        Alert.alert('Error', 'Failed to update user details.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={formData.role}
        onChangeText={(value) => handleChange('role', value)}
      />
      {formData.role === 'courier' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Plate Number"
            value={formData.plateNumber}
            onChangeText={(value) => handleChange('plateNumber', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle Name"
            value={formData.vehicleName}
            onChangeText={(value) => handleChange('vehicleName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle Color"
            value={formData.vehicleColor}
            onChangeText={(value) => handleChange('vehicleColor', value)}
          />
        </>
      )}
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    padding: 10,
  },
});

export default EditUser;





// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { useRouter, useLocalSearchParams } from 'expo-router';

// const EditUser = () => {
//   const { user } = useLocalSearchParams();
//   const userData = JSON.parse(user);
//   const [formData, setFormData] = useState(userData);
//   const router = useRouter();

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     axios.put(`http://192.168.62.127:4000/api/users/${formData._id}`, formData)
//       .then(response => {
//         Alert.alert('Success', 'User details updated successfully.');
//         router.back();
//       })
//       .catch(error => {
//         console.error('API Error:', error.response ? error.response.data : error.message);
//         Alert.alert('Error', 'Failed to update user details.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Edit User</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={formData.username}
//         onChangeText={(value) => handleChange('username', value)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={formData.email}
//         onChangeText={(value) => handleChange('email', value)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChangeText={(value) => handleChange('phone', value)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Role"
//         value={formData.role}
//         onChangeText={(value) => handleChange('role', value)}
//       />
//       {formData.role === 'courier' && (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="Plate Number"
//             value={formData.plateNumber}
//             onChangeText={(value) => handleChange('plateNumber', value)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Vehicle Name"
//             value={formData.vehicleName}
//             onChangeText={(value) => handleChange('vehicleName', value)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Vehicle Color"
//             value={formData.vehicleColor}
//             onChangeText={(value) => handleChange('vehicleColor', value)}
//           />
//         </>
//       )}
//       <Button title="Save" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
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
//     padding: 10,
//   },
// });

// export default EditUser;

