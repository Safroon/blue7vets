import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import PetProfile from '../screens/PetProfile';
import BookAppointment from '../screens/BookAppointment';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="About Us" component={AboutUs} />
      <Stack.Screen name="Contact Us" component={ContactUs} />
      <Stack.Screen name="Pet Profile" component={PetProfile} />
      <Stack.Screen name="Book Appointment" component={BookAppointment} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
