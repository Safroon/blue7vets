import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PetOwnerRegister = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    if (!fullName || !address || !phone || !password) {
      // Use Snackbar for errors in the future
      alert('Please fill in all fields');
      return;
    }
    navigation.navigate('PetDetails', {
      ownerData: { fullName, address, phone, password },
    });
  };

  return (
    <View style={styles.container}>
      <Icon name="dog" size={48} color="#254080" style={styles.logoIcon} />
      <Text variant="headlineMedium" style={styles.title}>
        Pet Owner Registration
      </Text>
      <TextInput
        label="Full Name"
        mode="outlined"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        left={<TextInput.Icon name="account" />}
      />
      <TextInput
        label="Address"
        mode="outlined"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        left={<TextInput.Icon name="home" />}
      />
      <TextInput
        label="Phone Number"
        mode="outlined"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
        left={<TextInput.Icon name="phone" />}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
      />
      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next: Add Pets
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
  },
  logoIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#254080',
    letterSpacing: 1,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#254080',
  },
});

export default PetOwnerRegister;
