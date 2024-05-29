import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class MapComponent extends Component {
  render() {
    return (
      <View>
         <MapView 
              ref={_map}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              customMapStyle={mapStyle}
              showsUserLocation={true}
              followsUserLocation={true}
              initialRegion={{...carsAround[0], latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
              // rotateEnabled={true}
              // zoomEnabled={true}
              // toolbarEnabled={true}
            >
            </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({})