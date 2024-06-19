import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import index from './../app/index';
import Login from './../app/Login';
import Signup from './../app/Signup';
import Welcome from './../app/Welcome';
import Request from './../app/Request';
import Destination from './../app/Destination';
import Details from './../app/Details';
import Selection from './../app/Selection';
import Comfirm from './../app/Comfirm';
import Profile from './../app/Profile';
import Setting from './../app/Setting';
import DrawerNavigator from './DraweNavigator'
import Driver from '../app/Driver'; 
import Bottomnavigator from './../navigations/Bottomnavigators'
import EditProfile from './../app/EditProfile';


// const Home = createNativeStackNavigator();
export function Home (){
    return <Bottomnavigator/>};

    export function HomeStack(){
    return(
        <Home.Navigator>
            <Home.Screen 
                name =""
                component = {index}
                options ={{headerShown:false}}
            />
            <Home.Screen 
                name ="Login"
                component = {Login}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="Signup"
                component = {Signup}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="Welcome"
                component = {Welcome}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="Request"
                component = {Request}
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="Destination"
                component = {Destination}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="Details"
                component = {Details}
                options ={{headerShown:false}}
            />
             <Home.Screen 
                name ="Selection"
                component = {Selection}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name =""
                component 
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="Comfirm"
                component = {Comfirm}
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="DrawerNavigator"
                component = {DrawerNavigator}
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="Profile"
                component = {Profile}
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="Setting"
                component = {Setting}
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="Driver"
                component = {Driver}
                options ={{headerShown:false}}
            />  
             <Home.Screen 
                name ="EditProfile"
                component = {EditProfile}
                options ={{headerShown:false}}
            /> 
        </Home.Navigator>
    ) 
}