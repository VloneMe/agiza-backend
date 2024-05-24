import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import login from './Login';
import Login from './Login';



export default function App() {
  return (
    <Login />
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
