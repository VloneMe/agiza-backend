import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import MapView, { Marker } from 'react-native-maps'

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

  return (
    <View styles={styles.container}>
      <MapView
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
        <Marker></Marker>
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
});