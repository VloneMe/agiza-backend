import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { creatNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'; 


import Welcome from './../app/Welcome'; 
import Profile from './../app/Profile'; 
import Details from './../app/Details';

import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';




const Tab = createBottomTabNavigator();
const stack = creatNativeStackNavigator();



const HomeStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
      <Stack.Screen name="Profile" component={Profile} options={({route})=>({title: route.params?.title,})} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
};

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#AD40AF'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow'
      }}
    >
      <Tab.Screen 
        name="home2"
        component={HomeStack}
        options={({route})=>({
          tabBarStyle:{
            display: getTabBarVisibility(route),
            backgroundColor: '#AD40AF',
          },
          tabBarIcon: ({color,size})=>(
            <Ionicons  name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen 
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({color,size})=>(
            <Ionicons  name="person-add-outline" color={color} size={size} />
          ),
        }}
      /><Tab.Screen 
        name="details"
        component={Details}
        options={{
          tabBarIcon: ({color,size})=>(
            <Ionicons  name="git-pull-request-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};

const getTabBarVisibility = route =>{
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  if( routeName == 'Profile'){
    return 'none';
  }return 'flex';
}

export default BottomTabsNavigator;
