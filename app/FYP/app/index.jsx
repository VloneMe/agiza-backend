import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';


// screens
import login from './Login';
import Signup from './Signup';
import Welcome from './Welcome';
import Layout from './Layout';
import Home from './(tabs)/Home';
import Login from './Login';
import Request from './Request';

// react navigation stack
// import RootStack from './../navigators/RootStack';




export default function App() {
  return (
    <Request />
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1
  }
  
  
  });