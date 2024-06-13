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
import Comfirm from './../app/Comfirm'


const Home = createNativeStackNavigator();

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
        </Home.Navigator>
    )
}