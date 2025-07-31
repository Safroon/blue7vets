import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const PetDetailsRegister = ({ route, navigation }) => {
  const { ownerData } = route.params;

  const [pets, setPets] = useState([{ name: '', type: '', age: '' }]);

  const handleAddPet = () => {
    setPets([...pets, { name: '', type: '', age: '' }]);
  };

  const handleChangePet = (index, field, value) => {
    const updatedPets = [...pets];
    updatedPets[index][field] = value;
    setPets(updatedPets);
  };

  const handleRegister = async () => {
    // Validate pets
    for (let pet of pets) {
      if (!pet.name || !pet.type || !pet.age) {
        Alert.alert('Validation Error', 'Please fill all pet details');
        return;
      }
    }

    const payload = {
      ...ownerData,
      pets: pets.map(pet => ({
        name: pet.name,
        type: pet.type,
        age: parseInt(pet.age),
      })),
    };

    try {
      const res = await axios.post(
        'http://192.168.29.8:5000/api/auth/register',
        payload,
      );
      Alert.alert('Success', `Registered with Owner ID: ${res.data.ownerId}`);
      navigation.navigate('Login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Registration failed',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Pet Details</Text>

      <FlatList
        data={pets}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.petBox}>
            <Text style={styles.petTitle}>Pet {index + 1}</Text>
            <TextInput
              placeholder="Pet Name"
              style={styles.input}
              value={item.name}
              onChangeText={value => handleChangePet(index, 'name', value)}
            />
            <TextInput
              placeholder="Type (e.g. Dog, Cat)"
              style={styles.input}
              value={item.type}
              onChangeText={value => handleChangePet(index, 'type', value)}
            />
            <TextInput
              placeholder="Age"
              style={styles.input}
              value={item.age}
              onChangeText={value => handleChangePet(index, 'age', value)}
              keyboardType="numeric"
            />
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
        <Text style={styles.addButtonText}>+ Add Another Pet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
        <Text style={styles.submitButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetDetailsRegister;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  petBox: {
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  petTitle: { fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#6b7280',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold' },
});
