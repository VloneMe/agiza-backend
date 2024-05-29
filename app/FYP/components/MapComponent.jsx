import { Text, StyleSheet, View } from 'react-native'
import { mapStyle } from '../components/global/mapStyle';
import React, { Component } from 'react'

export default class MapComponent extends Component {
  render() {
    return (
      <View>
         <MapView 
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              customMapStyle={mapStyle}
              >
            </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    map: {
        height:"100%",
         width:"100%"
        },
})