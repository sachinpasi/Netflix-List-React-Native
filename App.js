import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#0D0D0D',
            },
            title: 'NETFLIX',
            headerTitleStyle: {
              textAlign: 'center',
              color: '#E50914',
              fontSize: 35,
              fontFamily: 'BebasNeue-Regular',
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: '#0D0D0D',
            },
            title: 'NETFLIX',
            headerTitleStyle: {
              textAlign: 'center',
              marginEnd: 50,
              color: '#E50914',
              fontSize: 35,
              fontFamily: 'BebasNeue-Regular',
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: '#0D0D0D',
            },
            title: 'NETFLIX',
            headerTitleStyle: {
              textAlign: 'center',
              marginEnd: 50,
              color: '#E50914',
              fontSize: 35,
              fontFamily: 'BebasNeue-Regular',
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
