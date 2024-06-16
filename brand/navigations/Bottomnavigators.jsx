import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { creatNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'; 


import Welcome from './../app/Welcome'; 
import Profile from './../app/Profile'; 
import Details from './../app/Details';

import { Ionicons } from '@expo/vector-icons';
import { Stack useRouter} from 'expo-router';




const Tab = createBottomTabNavigator();
const stack = creatNativeStackNavigator();

const router = useRouter(); // Initialize the router

const HomeStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
      <Stack.Screen name="Profile" component={Profile} options={router.push('Profile')}/>
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
};

const BottomTabsNavigator = () => {
  return ()
};

export default BottomTabsNavigator;
