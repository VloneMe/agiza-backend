import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
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
import Admin from '../app/Admin'; 
import EditProfile from './../app/EditProfile';
import editUser from './../app/editUser';
import ClientMap from './../app/ClientMap';
import Driver from './../app/Driver';
import DriverMap from './../app/DriverMap';
import AddUser from '../app/AddUser';



const Stack = createStackNavigator();

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
                name ="Comfirm"
                component = {Comfirm}
                options ={{headerShown:false}}
            />
             <Home.Screen 
                name ="Profile"
                component = {Profile}
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="Admin"
                component = {Admin}
                options ={{headerShown:false}}
            />  
             <Home.Screen 
                name ="editUser"
                component = {editUser}
                options ={{headerShown:false}}
            />  
             <Home.Screen 
                name ="EditProfile"
                component = {EditProfile}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="ClientMap"
                component = {ClientMap}
                options ={{headerShown:false}}
            /> 
            {/* <Home.Screen 
                name ="AfterDestination"
                component = {AfterDestination}
                options ={{headerShown:false}}
            />  */}
            <Home.Screen 
                name ="Driver"
                component = {Driver}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="DriverMap"
                component = {DriverMap}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="AddUser"
                component = {AddUser}
                options ={{headerShown:false}}
            /> 
            <FlashMessage position="top" />
        </Home.Navigator>
    ) 
}