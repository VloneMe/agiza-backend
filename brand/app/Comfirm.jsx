import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getDistance } from 'geolib';
import { Colors, parameters } from '../components/global/styles';
import { PageLogo } from '../components/styles';
import { useRouter, useSearchParams } from 'expo-router';

const Comfirm = () => {
  const router = useRouter();
  const { name = '', pickupLocation = '', deliveryLocation = '', ride = '' } = router?.params || {};

  const [distance, setDistance] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      // Placeholder coordinates for example purposes
      const pickupCoords = { latitude: -6.7924, longitude: 39.2083 };
      const deliveryCoords = { latitude: -6.8163, longitude: 39.2805 };

      const dist = getDistance(pickupCoords, deliveryCoords) / 1000; // distance in km
      setDistance(dist);

      // Calculate amount (example rates)
      const ratePerKm = ride === 'Motorcycle' ? 1000 : ride === 'Small Van' ? 6000 : 10000;
      setAmount(dist * ratePerKm);
    };

    calculateDistance();
  }, [ride]);

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
        <PageLogo resizeMode="cover" source={require("./../assets/end.png")} />
        <Text style={styles.header}>Confirmation</Text>
        <Text style={styles.details}>Name: {name}</Text>
        <Text style={styles.details}>Pickup Location: {pickupLocation}</Text>
        <Text style={styles.details}>Delivery Location: {deliveryLocation}</Text>
        <Text style={styles.details}>Selected Ride: {ride}</Text>
        <Text style={styles.details}>Distance: {distance.toFixed(2)} km</Text>
        <Text style={styles.details}>Total Amount: {amount.toFixed(2)} TZS</Text>
        <Button title="Confirm" onPress={() => alert('Thank you for choosing aGIZA, The ride is nearby to pick up your parcel soon..! You will receive the SMS soon..!')} />
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

export default Comfirm;





// import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { getDistance } from 'geolib';
// import { Colors, parameters } from '../components/global/styles';
// import { PageLogo } from '../components/styles';

// const ConfirmationScreen = ({ route, navigation }) => {
//   // Provide default values for route and params
//   const { name = '', pickupLocation = '', deliveryLocation = '', ride = '' } = route?.params || {};
//   const [distance, setDistance] = useState(0);
//   const [amount, setAmount] = useState(0);

//   useEffect(() => {
//     const calculateDistance = () => {
//       // Placeholder coordinates for example purposes
//       const pickupCoords = { latitude: -6.7924, longitude: 39.2083 };
//       const deliveryCoords = { latitude: -6.8163, longitude: 39.2805 };

//       const dist = getDistance(pickupCoords, deliveryCoords) / 1000; // distance in km
//       setDistance(dist);

//       // Calculate amount (example rates)
//       const ratePerKm = ride === 'Motorcycle' ? 500 : ride === 'Small Van' ? 1000 : 1500;
//       setAmount(dist * ratePerKm);
//     };

//     calculateDistance();
//   }, [ride]);

//   return (
//     <View>
//       <View style = {styles.home}>
//         <Text style={styles.text1}>Thank you for choosing aGIZA</Text>
//         <View style={styles.view1}>
//           <View style={styles.view8}>
//             <Text style={styles.text2}>Please confirm your order now</Text>
//           </View>
//         </View>
//       </View>
//       <View style = {styles.home1}>
//       <PageLogo resizeMode="cover" source={require("./../assets/end.png")} />
//         <Text style={styles.header}>Confirmation</Text>
//         <Text style={styles.details}>Name: {name}</Text>
//         <Text style={styles.details}>Pickup Location: {pickupLocation}</Text>
//         <Text style={styles.details}>Delivery Location: {deliveryLocation}</Text>
//         <Text style={styles.details}>Selected Ride: {ride}</Text>
//         <Text style={styles.details}>Distance: {distance.toFixed(2)} km</Text>
//         <Text style={styles.details}>Total Amount: {amount.toFixed(2)} TZS</Text>
//         <Button title="Confirm" onPress={() => alert('Thank you for choosing aGIZA,, The ride is nearby to pick you parcel soon..! You will receive the SMS soon..!')} />
//       </View>
//       <StatusBar 
//           style = "dark"
//           backgroundColor = "#2058c0"
//           translucent = {true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   home1: {
//     // flex: 1,
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
//   home:{
//     backgroundColor:Colors.blue,
//     paddingLeft:20,
//    },
//    text1:{
//     color:Colors.white,
//     fontSize:21,
//     paddingBottom:20,
//     alignContent:"center",
//     textAlign:"center",
//     paddingTop:20
//    },
//    view1:{
//     flexDirection:"row",
//     flex:1,
//     paddingTop:30
//    },
//    view8: {flex:4,
//     marginTop:-25
//   } ,
// carsAround: {
// width: 28,
// height: 14,

// }, 
// text2:{
//   color:Colors.white,
//   fontSize:16,
//    paddingBottom:10,
//    textAlign:"center"
//  },
//   details: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });

// export default ConfirmationScreen;
