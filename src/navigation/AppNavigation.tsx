import AnimeDetail from '@/screens/Anime/AnimeDetail';
import Profile from '@/screens/Anime/ProducerProfile';
import Home from '@/screens/Home';
import Search from '@/screens/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomStack from './BottomStack';
import ListAnimeWithGenre from '@/screens/Anime/ListAnimeWithGenre';

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name='anime-detail' component={AnimeDetail} />
      <Stack.Screen name='category' component={ListAnimeWithGenre} />

      <Stack.Screen name='bottom-bar' component={BottomStack} />
    </Stack.Navigator>
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
