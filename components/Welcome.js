import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Blue Seven Vets 🐾</Text>
      <Text style={styles.subtitle}>Your trusted vet clinic app.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006688' },
  subtitle: { fontSize: 16, marginTop: 10 },
});

export default Welcome;
