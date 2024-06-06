import { View, Text, StyleSheet } from 'react-native'
import * as React from 'react'
// react navigation
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { OrigincontextProvider } from '../context/context';


// screens
import Login from './Login';
import Signup from './Signup';
import Welcome from './Welcome';
import Layout from './Layout';
import Request from './Request';
import Destination from './Destination';

// react navigation stack
// import RootStack from './../navigators/RootStack';




export default function App() {
  return (
<Login />
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1
  }
  
  
  });