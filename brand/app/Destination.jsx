import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AddressPickup from './../components/AdressPickup';
import CustomButton from '../components/CustomButton';

const Destination = () => {
  const router = useRouter();

  const [state, setState] = useState({
    pickupCords: {},
    dropoffCords: {},
  });

  const { pickupCords, dropoffCords } = state;

  const checkValid = () => {
    if (Object.keys(pickupCords).length === 0) {
      showError("Please enter pickup location");
      return false;
    }
    if (Object.keys(dropoffCords).length === 0) {
      showError("Please enter destination location");
      return false;
    }
    return true;
  };

  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      router.push({
        pathname: '/ClientMap',
        params: {
          pickupCords: state.pickupCords,
          dropoffCords: state.dropoffCords,
        },
      });
    }
  };

  const fetchAddressCords = (lat, lng) => {
    setState((prevState) => ({
      ...prevState,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    }));
  };

  const fetchDestinationCords = (lat, lng) => {
    setState((prevState) => ({
      ...prevState,
      dropoffCords: {
        latitude: lat,
        longitude: lng,
      },
    }));
  };

  console.log("Pickup cords: ", state.pickupCords);
  console.log("Dropoff cords: ", state.dropoffCords);

  return (
    <View style={styles.container}>
      <ScrollView 
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: 'white', flex: 1, padding: 24 }}
      >
        <AddressPickup 
          placeholderText="Enter Pickup location"
          fetchAddress={fetchAddressCords}
        />
        <AddressPickup 
          placeholderText="Enter Destination location"
          fetchAddress={fetchDestinationCords}
        />
        <CustomButton 
          btnTxt="Done"
          onPress={onDone}
          btnStyle={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Destination;




// screens/Destination.js
// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import AddressPickup from './../components/AdressPickup';
// import CustomButton from '../components/CustomButton';
// import PropTypes from 'prop-types';

// const Destination = ({ route }) => {
//   const navigation = useNavigation();
//   const [coordinates, setCoordinates] = useState({
//     pickupCords: {},
//     dropoffCords: {},
//   });

//   const onDone = () => {
//     if (route.params?.setCoordinates) {
//       route.params.setCoordinates({
//         pickupCords: coordinates.pickupCords,
//         dropoffCords: coordinates.dropoffCords,
//       });
//     }
//     navigation.navigate('ClientMap');
//   };

//   const fetchCords = (type, lat, lng) => {
//     setCoordinates((prevState) => ({
//       ...prevState,
//       [type]: { latitude: lat, longitude: lng },
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         style={styles.scrollView}
//       >
//         <AddressPickup
//           placeholderText="Enter Pickup location"
//           fetchAddress={(lat, lng) => fetchCords('pickupCords', lat, lng)}
//         />
//         <AddressPickup
//           placeholderText="Enter Destination location"
//           fetchAddress={(lat, lng) => fetchCords('dropoffCords', lat, lng)}
//         />
//         <CustomButton
//           btnTxt="Done"
//           onPress={onDone}
//           btnStyle={styles.button}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// Destination.propTypes = {
//   route: PropTypes.shape({
//     params: PropTypes.shape({
//       setCoordinates: PropTypes.func,
//     }),
//   }).isRequired,
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollView: {
//     flex: 1,
//     padding: 24,
//   },
//   button: {
//     marginTop: 24,
//   },
// });

// export default Destination;

