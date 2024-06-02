// import { StyleSheet, Text, View } from 'react-native'
// import * as React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Layout from './Layout'
// import Login from './Login'
// import Signup from './Signup'
// import Welcome from './Welcome'
// import Request from './Request'
// import Destination from './Destination'

// const Home = createNativeStackNavigator();

// export function HomeStack()  {
//   return (
//     <Home.Navigator>
//       <Home.Screen name="Layout" component={Layout} options={{headerShown:false}} />
//       <Home.Screen name="Login" component={Login} options={{headerShown:false}} />
//       <Home.Screen name="Signup" component={Signup} options={{headerShown:false}} />
//       <Home.Screen name="Welcome" component={Welcome} options={{headerShown:false}} />
//       <Home.Screen name="Request" component={Request} options={{headerShown:false}} />
//       <Home.Screen name="Destination" component={Destination} options={{headerShown:false}} />
//     </Home.Navigator>
//   )
// }

// export default HomeStack

// const styles = StyleSheet.create({})






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
    <Welcome />
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1
  }
  
  
  });