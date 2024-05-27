import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

// screens
import login from './Login';
import Signup from './Signup';
import Welcome from './Welcome';
import Layout from './Layout';
import Home from './(tabs)/Home';
import Login from './Login';

// react navigation stack
// import RootStack from './../navigators/RootStack';




export default function App() {
  return (
    <Login />
  );
}