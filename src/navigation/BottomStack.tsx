/* eslint-disable react/no-unstable-nested-components */
import Profile from '@/screens/Anime/ProducerProfile';
import Home from '@/screens/Home';
import Search from '@/screens/Search';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/solid';

const BottomTab = createBottomTabNavigator();

type BottomStackProps = {
  navigation: BottomTabNavigationProp<{}>;
};

const BottomStack: React.FC<BottomStackProps> = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='home'
      screenOptions={() => ({
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
          tabBarIcon: ({ focused }) => <HomeIcon size={22} fill={focused ? 'black' : '#DEC9AB'} />,
          title: 'Home',
        }}
      />
      <BottomTab.Screen
        name='search'
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <MagnifyingGlassIcon size={22} fill={focused ? 'black' : '#DEC9AB'} />
          ),
          title: 'Search',
        }}
      />
      <BottomTab.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <UserIcon size={22} fill={focused ? 'black' : '#DEC9AB'} />,
          title: 'Profile',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomStack;
