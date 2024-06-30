import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PageLogo } from '../components/styles';

const Confirm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { pickuplocation, fullName, deliverylocation, PhoneNumber, Detail, Inside, rideType, cost, distance, duration } = route.params;

  const handleConfirm = () => {
    Alert.alert(
      'Confirmation',
      'Thank you for choosing aGIZA. The ride is nearby to pick up your parcel soon! You will receive an SMS soon.',
      [
        { text: 'OK', onPress: () => navigation.navigate('Welcome') }
      ]
    );
  };

  return (
    <View>
      <View style={styles.home}>
        <Text style={styles.text1}>Thank you for choosing aGIZA</Text>
        <View style={styles.view1}>
          <View style={styles.view8}>
            <Text style={styles.text2}>Please confirm your order now</Text>
          </View>
        </View>
      </View>
      <View style={styles.home1}>
        <PageLogo resizeMode="cover" source={require('./../assets/end.png')} />
        <Text style={styles.header}>Confirmation</Text>
        <Text style={styles.details}>Full Name: {fullName}</Text>
        <Text style={styles.details}>Pickup Location: {pickuplocation}</Text>
        <Text style={styles.details}>Delivery Location: {deliverylocation}</Text>
        <Text style={styles.details}>Phone Number: {PhoneNumber}</Text>
        <Text style={styles.details}>Parcel Description: {Detail}</Text>
        <Text style={styles.details}>Parcel Contents: {Inside}</Text>
        <Text style={styles.details}>Selected Ride: {rideType}</Text>
        <Text style={styles.details}>Distance: {distance}</Text>
        <Text style={styles.details}>Duration: {duration}</Text>
        <Text style={styles.details}>Total Amount: {cost} TZS</Text>
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
      <StatusBar style="dark" backgroundColor="#2058c0" translucent={true} />
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
    backgroundColor: '#2058c0',
    paddingLeft: 20,
  },
  text1: {
    color: 'white',
    fontSize: 21,
    paddingBottom: 20,
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 20,
  },
  view1: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 30,
  },
  view8: {
    flex: 4,
    marginTop: -25,
  },
  text2: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 10,
    textAlign: 'center',
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Confirm;



// import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { PageLogo } from '../components/styles';

// const Confirm = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { pickuplocation, fullName, deliverylocation, PhoneNumber, Detail, Inside, rideType, cost, distance, duration } = route.params;

//   return (
//     <View>
//       <View style={styles.home}>
//         <Text style={styles.text1}>Thank you for choosing aGIZA</Text>
//         <View style={styles.view1}>
//           <View style={styles.view8}>
//             <Text style={styles.text2}>Please confirm your order now</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.home1}>
//         <PageLogo resizeMode="cover" source={require('./../assets/end.png')} />
//         <Text style={styles.header}>Confirmation</Text>
//         <Text style={styles.details}>Full Name: {fullName}</Text>
//         <Text style={styles.details}>Pickup Location: {pickuplocation}</Text>
//         <Text style={styles.details}>Delivery Location: {deliverylocation}</Text>
//         <Text style={styles.details}>Phone Number: {PhoneNumber}</Text>
//         <Text style={styles.details}>Parcel Description: {Detail}</Text>
//         <Text style={styles.details}>Parcel Contents: {Inside}</Text>
//         <Text style={styles.details}>Selected Ride: {rideType}</Text>
//         {/* <Text style={styles.details}>Distance: {distance}</Text>
//         <Text style={styles.details}>Duration: {duration}</Text> */}
//         <Text style={styles.details}>Total Amount: {cost} TZS</Text>
//         <Button title="Confirm" onPress={() => alert('Thank you for choosing aGIZA, The ride is nearby to pick up your parcel soon..! You will receive the SMS soon..!')} />
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
//     backgroundColor: '#2058c0',
//     paddingLeft: 20,
//   },
//   text1: {
//     color: 'white',
//     fontSize: 21,
//     paddingBottom: 20,
//     alignContent: 'center',
//     textAlign: 'center',
//     paddingTop: 20,
//   },
//   view1: {
//     flexDirection: 'row',
//     flex: 1,
//     paddingTop: 30,
//   },
//   view8: {
//     flex: 4,
//     marginTop: -25,
//   },
//   text2: {
//     color: 'white',
//     fontSize: 16,
//     paddingBottom: 10,
//     textAlign: 'center',
//   },
//   details: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });

// export default Confirm;

