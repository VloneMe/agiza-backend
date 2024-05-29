import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { colors } from '../components/global/styles';
import Welcome from './Welcome';

const Drawer = createDrawerNavigator()


expport default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name= "Welcome"
                component={Welcome}
            />
        </Drawer.Navigator>
    )
}