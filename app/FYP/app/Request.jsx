import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Colors, parameters } from '../components/global/styles';
import MapComponent from '../components/MapComponent';

export default function Request() {
  return (
    <View>
      <MapComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: parameters.statusBarHeight,
  }
})