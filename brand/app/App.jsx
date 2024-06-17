import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { OriginContextProvider,DestinationContextProvider } from './../context/context'
import RoootNavigator from './../navigations/RootNavigator'
import { UserContextProvider } from '../context/UserContext'


const App = () => {
  return (
    <UserContextProvider>
      <DestinationContextProvider>
        <OriginContextProvider>
            <RoootNavigator />
        </OriginContextProvider>
      </DestinationContextProvider>
   </UserContextProvider>
   
  )
}

export default App

const styles = StyleSheet.create({

container:{
  flex:1
}


})




// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import { OrigincontextProvider, DestinationContextProvider } from './context/context';
// import index from './index';
// import Login from './Login';
// import Signup from './Signup';
// import Welcome1 from './Welcome';
// import Request from './Request';
// import Destination from './Destination';
// // import Destination from './app/Destination';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="index">
//         <Stack.Screen name="index" component={index} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="Welcome1" component={Welcome1} />
//         <Stack.Screen name="Request" component={Request} />
//         <Stack.Screen name="Destination" component={Destination} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;