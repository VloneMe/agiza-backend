import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import login from './Login';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up app/FYP/app/index.jsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});