import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import login from './screens/login';


export default function App() {
  return (
    <login />
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