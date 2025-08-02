import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
  }, [user]);

  if (!user) return null; // optional: avoid rendering while redirecting

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-3xl font-bold text-blue-700 mb-4">
        👋 Hello! Welcome to BlueSeven Vets 🐾
      </Text>

      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1661503280224-a86d7ad2a574?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        className="w-full h-48 rounded-xl mb-6"
        resizeMode="cover"
      />

      <TouchableOpacity
        className="bg-blue-600 py-4 px-6 rounded-2xl mb-4"
        onPress={() => navigation.navigate('Book Appointment')}
      >
        <Text className="text-white text-lg text-center font-semibold">
          📅 Book Appointment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-600 py-4 px-6 rounded-2xl mb-4"
        onPress={() => alert('Shop screen is not available yet')}
      >
        <Text className="text-white text-lg text-center font-semibold">
          🛒 Shop Pet Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-yellow-500 py-4 px-6 rounded-2xl mb-4"
        onPress={() => navigation.navigate('Pet Profile')}
      >
        <Text className="text-white text-lg text-center font-semibold">
          🐶 View My Pets
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-500 py-4 px-6 rounded-2xl"
        onPress={() => navigation.navigate('Login')}
      >
        <Text className="text-white text-lg text-center font-semibold">
          🚪 Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;
