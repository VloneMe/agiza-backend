import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState, useRef, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'

let locationOfInterest = [
  {
      title: "First",
      location: {
        latitude: -6.771181090185626,
        longitude: 39.23994289711118,
      },
      description: "My first marker"
    
  }, 
  {
      title: "Second",
      location: {
        latitude: -6.772346702012774,
        longitude: 39.24027716740966,
      },
      description: "My Second marker"
    
  },
]


export default function Driver (){
  
const [count, setCount] = useState(0);
const [draggableMarkerCoodrd, setDraggableMarkerCoodrd] = useState({latitude: -6.780, longitude: 39.284});

  const mapRef = React.useRef(null);
  const onRegionChange = (region) => {
    console.log(region);
  };

const showLocationsOfInterest = () => {
  return locationOfInterest.map((item, index) => {
    return (
      <Marker
        key={index}
        coordinate={item.location}
        title={item.title}
        description={item.description}
      />
    )
  })
};

const takeSnapshotAndShare = async () => {
  const snapshot = await mapRef.current.takeSnapshot({ width: 300, height: 300, format: 'base64' });
  const url = FileSystem.documentDirectory + 'snapshot.png';
  await FileSystem.writeAsStringAsync(url, snapshot, { encoding: FileSystem.EncodingType.Base64 });
  await shareAsync(url);
};

  return (
    <View styles={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -6.780508589077584,
          longitude: 39.28488766774535,
          latitudeDelta: 0.3924108008642557,
          longitudeDelta: 0.18297526985406876,
        }}
      >
        {showLocationsOfInterest()}
        <Marker 
          draggable
          pinColor='green'
          coordinate={draggableMarkerCoodrd}
          onDragEnd={(e) => setDraggableMarkerCoodrd(e.nativeEvent.coordinate)}
          title={"Drag me"}
          description={"I'm draggable"}
        />
        <Marker
          pinColor='Yellow'
          coordinate={{latitude: -6.980, longitude: 39.484}}
        >
          <Callout>
            <Text>Count: {count}</Text>
            <Button title="Increment" onPress={() => setCount(count + 1)} />
            {/* <Button title="Take snap and share" onPress={takeSnapshotAndShare} /> */}
          </Callout>
        </Marker>
        <Text styles={styles.MapOverlay} > Hellow </Text>
      </MapView>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  MapOverlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 5,
    borderWidth: 2,
    left: "25%",
    width: "50%",
    textAlign: 'center',
  }
});