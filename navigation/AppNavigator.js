import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../src/screens/Login';
import Register from '../src/screens/PetOwnerRegister';
import PetDetails from '../src/screens/PetDetailsRegister';
import AboutUs from '../src/screens/AboutUs';
import ContactUs from '../src/screens/ContactUs';
import PetProfile from '../src/screens/PetProfile';
import BookAppointment from '../src/screens/BookAppointment';
import HomeScreen from '../src/screens/HomeScreen'; // Optional landing screen

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PetDetails" component={PetDetails} />
      <Stack.Screen name="About Us" component={AboutUs} />
      <Stack.Screen name="Contact Us" component={ContactUs} />
      <Stack.Screen name="Pet Profile" component={PetProfile} />
      <Stack.Screen name="Book Appointment" component={BookAppointment} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
