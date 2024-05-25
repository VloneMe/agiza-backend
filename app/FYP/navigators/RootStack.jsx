import React from 'react';

import { Colors } from './../components/styles';
const { brand, darkLight, primary,tertiary } = Colors;

// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './../app/Login';
import Signup from './../app/Signup';
import Welcome from './../app/Welcome';

const Stack = createStackNavigator();
// const createNavigationContainer = NavigationContainer();

const RootStack = () => {
    return (
        <NavigationContainer 
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent'
                },
            headerTintColor: tertiary,
            headerTransparent: true,
            headerTitle: '',
            headerLeftContainerStyle: {
                paddingLeft: 20
            }
                }}
        >
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;