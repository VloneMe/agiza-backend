import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const EditProfileScreen = ({ route, navigation }) => {
  const { profile } = route.params;

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const handleSubmit = (values) => {
    axios.put('https://your-api-endpoint.com/profile', values)
      .then(() => navigation.goBack())
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: profile.name, email: profile.email }}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Name"
              style={styles.input}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
              style={styles.input}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
  },
  button2: {
    height: 40,
    width: 150,
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  buttonText: {
    color: 'white',
  },
});

export default EditProfileScreen;






// // screens/EditProfileScreen.js
// import React from 'react';
// import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { TextInput } from 'react-native-gesture-handler';

// const EditProfileScreen = ({ route, navigation }) => {
//   const { profile } = route.params;

//   const ProfileSchema = Yup.object().shape({
//     name: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//   });

//   const handleSubmit = (values) => {
//     axios.put('https://your-api-endpoint.com/profile', values)
//       .then(() => navigation.goBack())
//       .catch(error => console.error(error));
//   };

//   return (
//     <View style={styles.container}>
//       <Formik
//         initialValues={{ name: profile.name, email: profile.email }}
//         validationSchema={ProfileSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//           <View>
//             <TextInput
//               onChangeText={handleChange('name')}
//               onBlur={handleBlur('name')}
//               value={values.name}
//               placeholder="Name"
//               style={styles.input}
//             />
//             {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
//             <TextInput
//               onChangeText={handleChange('email')}
//               onBlur={handleBlur('email')}
//               value={values.email}
//               placeholder="Email"
//               style={styles.input}
//             />
//             {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>Save Changes</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     width: 300,
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   button2: {
//     height: 40,
//     width: 150,
//     backgroundColor: 'black',
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 0,
//   },
//   buttonText: {
//     color: 'white',
//   },
// });

// export default EditProfileScreen;
