import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { Colorsolors, title } from '../components/global/styles';
import Welcome from './Welcome';

const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name= "Welcome"
                component={Welcome}
                options={{
                    title: 'Welcome',
                    drawerIcon: ({focused, size}) => 
                        <Icon
                            name='home'
                            type='font-awesome'
                            color={ focused ? '#7cc' :Colors.grey2 }
                            size={size}
                        />,
                        headerShown: false
                }}
            />
        </Drawer.Navigator>
    )
}