import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const Driver = () => {

  const router = useRouter();

  // Hardcoded list of parcels for testing purposes
  const parcels = [
    {
      id: '1',
      name: 'Joel Mdudu',
      phoneNumber: '0657909090',
      pickUpLocation: '-6.795750,39.190710', // Example coordinates kibo complex Tegeta
      destinationLocation: '-6.181240,35.748161' // Example coordinates Madale 
    },
    {
      id: '2',
      name: 'Ally Khamis',
      phoneNumber: '987654321',
      pickUpLocation: '-26.041389,28.155149', // Example coordinates Mliman city 
      destinationLocation: '-6.775980,39.237650' // Example coordinates kijitonyama 
    },
  ];

  const handleAccept = (parcel) => {
    router.push({
      pathname: '/DriverMap',
      params: { parcel: JSON.stringify(parcel) }, // Pass parcel as a string
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.parcelContainer}>
      <Text style={styles.userDetails}>Name: {item.name}</Text>
      <Text style={styles.userDetails}>Phone Number: {item.phoneNumber}</Text>
      <Text style={styles.userDetails}>Pick Up Location: {item.pickUpLocation}</Text>
      <Text style={styles.userDetails}>Destination Location: {item.destinationLocation}</Text>
      <Button title="Accept" onPress={() => handleAccept(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Driver Notification Page</Text>
      <FlatList
        data={parcels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  parcelContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  userDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Driver;






// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// const Driver = ({ navigation }) => {
//   const [parcel, setParcel] = useState(null);

//   useEffect(() => {
  
//     axios.get('http://192.168.81.127:4000/api/parcels')
//       .then(response => {
//         setParcel(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleAccept = () => {
//     navigation.navigate('DriverMapPage', { parcel });
//   };

//   if (!parcel) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Name: {parcel.name}</Text>
//       <Text>Phone Number: {parcel.phoneNumber}</Text>
//       <Text>Pick Up Location: {parcel.pickUpLocation}</Text>
//       <Text>Destination Location: {parcel.destinationLocation}</Text>
//       <Button title="Accept" onPress={handleAccept} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Driver;





// // import { View, Text, StyleSheet, Button } from 'react-native'
// // import React, { useState, useRef, useContext } from 'react'
// // import { StatusBar } from 'expo-status-bar'
// // import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
// // import * as FileSystem from 'expo-file-system'
// // import { shareAsync } from 'expo-sharing'

// // let locationOfInterest = [
// //   {
// //       title: "First",
// //       location: {
// //         latitude: -6.771181090185626,
// //         longitude: 39.23994289711118,
// //       },
// //       description: "My first marker"
    
// //   }, 
// //   {
// //       title: "Second",
// //       location: {
// //         latitude: -6.772346702012774,
// //         longitude: 39.24027716740966,
// //       },
// //       description: "My Second marker"
    
// //   },
// // ]


// // export default function Driver (){
  
// // // const [count, setCount] = useState(0);
// // const [draggableMarkerCoodrd, setDraggableMarkerCoodrd] = useState({latitude: -6.780, longitude: 39.284});

// //   const mapRef = React.useRef(null);
// //   const onRegionChange = (region) => {
// //     console.log(region);
// //   };

// // const showLocationsOfInterest = () => {
// //   return locationOfInterest.map((item, index) => {
// //     return (
// //       <Marker
// //         key={index}
// //         coordinate={item.location}
// //         title={item.title}
// //         description={item.description}
// //       />
// //     )
// //   })
// // };

// // const takeSnapshotAndShare = async () => {
// //   const snapshot = await mapRef.current.takeSnapshot({ width: 300, height: 300, format: 'base64' });
// //   const url = FileSystem.documentDirectory + 'snapshot.png';
// //   await FileSystem.writeAsStringAsync(url, snapshot, { encoding: FileSystem.EncodingType.Base64 });
// //   await shareAsync(url);
// // };

// //   return (
// //     <View styles={styles.container}>
// //       <MapView
// //         provider={PROVIDER_GOOGLE}
// //         ref={mapRef}
// //         style={styles.map}
// //         onRegionChange={onRegionChange}
// //         initialRegion={{
// //           latitude: -6.780508589077584,
// //           longitude: 39.28488766774535,
// //           latitudeDelta: 0.3924108008642557,
// //           longitudeDelta: 0.18297526985406876,
// //         }}
// //       >
// //         {showLocationsOfInterest()}
// //         <Marker 
// //           draggable
// //           pinColor='green'
// //           coordinate={draggableMarkerCoodrd}
// //           onDragEnd={(e) => setDraggableMarkerCoodrd(e.nativeEvent.coordinate)}
// //           title={"Drag me"}
// //           description={"I'm draggable"}
// //         />
// //         <Marker
// //           pinColor='Yellow'
// //           coordinate={{latitude: -6.980, longitude: 39.484}}
// //         >
// //           <Callout>
// //             {/* <Text>Count: {count}</Text>////////////// */}
// //             {/* <Button title="Take snap and share" onPress={takeSnapshotAndShare} /> */}
// //           </Callout>
// //         </Marker>
// //         <Text styles={styles.MapOverlay} > Hellow </Text>
// //       </MapView>
// //       <StatusBar style="auto" />
// //     </View>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   map: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   MapOverlay: {
// //     position: 'absolute',
// //     bottom: 50,
// //     backgroundColor: '#ffffff',
// //     padding: 16,
// //     borderRadius: 5,
// //     borderWidth: 2,
// //     left: "25%",
// //     width: "50%",
// //     textAlign: 'center',
// //   }
// // });