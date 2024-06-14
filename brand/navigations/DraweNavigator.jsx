import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import Welcome from './../app/Welcome';
import Profile from './../app/Profile';
import Setting from './../app/Setting';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;




// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { HomeStack } from './StackNavigator';
// import {Icon} from 'react-native-elements';
// import {colors} from "./../components/global/styles";
// import { RoootNavigator } from './RootNavigator'

// const Drawer = createDrawerNavigator()

// export default function DrawerNavigator(){
//     return(
//         <Drawer.Navigator>
//              <Drawer.Screen 
//                  name = "RoootNavigator"
//                  component = {RoootNavigator}
//                  options ={{
//                      title:"Client",
//                      drawerIcon :({focussed,size})=><Icon type ="material-community" 
//                                                           name = "home" 
//                                                           color = {focussed?'#7cc':colors.grey2}
//                                                           size ={size}
//                                                           />,

//                  headerShown : false                                      
//                  }}

                
//              />
//         </Drawer.Navigator>
//     )
// }   