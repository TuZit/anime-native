/* eslint-disable react/no-unstable-nested-components */
import Home from '@/screens/Home';
import Profile from '@/screens/Profile';
import Search from '@/screens/Search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/solid';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName='bottom-bar'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='home' component={Home} />
      <Stack.Screen name='search' component={Search} />
      <Stack.Screen name='profile' component={Profile} />

      <Stack.Screen name='bottom-bar' component={BottomStack} />
    </Stack.Navigator>
  );
}

// function AuthStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName='login'
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
// }

function BottomStack() {
  return (
    <BottomTab.Navigator
      initialRouteName='home'
      screenOptions={() => ({
        // tabBarShowLabel: false,
        tabBarHideOnKeyboard: false,
        headerShown: false,
        tabBarStyle: {
          height: 50,
          position: 'absolute',
          bottom: 4,
          left: 16,
          right: 16,
          borderRadius: 25,
          fontSize: 20,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom: 3,
          marginTop: 3,
        },
        tabBarActiveTintColor: 'black',
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}
    >
      <BottomTab.Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return <HomeIcon size={22} fill={focused ? 'black' : '#DEC9AB'} />;
          },
          title: 'Home',
        }}
      />
      <BottomTab.Screen
        name='search'
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return <MagnifyingGlassIcon size={22} fill={focused ? 'black' : '#DEC9AB'} />;
          },
          title: 'Search',
        }}
      />
      <BottomTab.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return <UserIcon size={22} fill={focused ? 'black' : '#DEC9AB'} />;
          },
          title: 'Profile',
        }}
      />
    </BottomTab.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

export default AppNavigation;
