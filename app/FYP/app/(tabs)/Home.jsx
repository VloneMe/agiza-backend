import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'


const TabIcon = ( icon, color, name, focused ) => {
  return (
    <View className="items-center justfy-center gap-2">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text  className={`text-xs ${focused ? 'text-blue-500' : 'text-gray-500'}`} style={{ color: color }} >
        {name}
      </Text>
    </View>
  )

}
const Home = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShownLabel: false,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }
        }}
      >
        <Tabs.Screen 
          name="home"
          options={{ 
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="profile"
          options={{ 
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name="profile"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="request"
          options={{ 
            title: 'Request',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.plus}
                color={color}
                name="request"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default Home