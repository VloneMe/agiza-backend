import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Import the screens
import Welcome from '../app/Welcome';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;




// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import DrawerNavigator from './DraweNavigator';

// export default function RoootNavigator(){
//     return(
//         <NavigationContainer>
//             <DrawerNavigator>
//                 <Drawer.Screen name="Welcome" component={Welcome} />
//             </DrawerNavigator>
//         </NavigationContainer>
//     )
// }