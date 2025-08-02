import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/loginStyles';
import { login } from '../store/actions/authActions';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, user } = useSelector(state => state.auth);
  const auth = useSelector(state => state.auth);
  console.log('🧠 Auth State from Redux:', auth);

  useEffect(() => {
    if (user) {
      navigation.navigate('Home'); // ✅ Redirect after successful login
    }
  }, [user]);

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    dispatch(login({ phone, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BlueSeven Vets 🐾</Text>

      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
