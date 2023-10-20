import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import Contact from '../screens/Contact';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor: '#f0f',
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor: '#f0f',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
