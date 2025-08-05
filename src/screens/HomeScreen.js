import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Card, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const petServices = [
  { id: '1', title: 'Vaccination', icon: 'needle' },
  { id: '2', title: 'Grooming', icon: 'dog-side' },
  { id: '3', title: 'Blood Test', icon: 'blood-bag' },
  { id: '4', title: 'Health Checkup', icon: 'stethoscope' },
  { id: '5', title: 'Dental Care', icon: 'tooth' },
];

const clinicSpecialties = [
  { id: '1', title: 'Advanced Surgery', icon: 'hospital-box' },
  { id: '2', title: '24/7 Emergency Care', icon: 'hospital-building' },
  { id: '3', title: 'Award-Winning OT', icon: 'award' },
  { id: '4', title: 'Pet Pharmacy', icon: 'pill' },
  { id: '5', title: 'Diagnostic Lab', icon: 'flask' },
];

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const userLocation = 'Borivali West, Mumbai'; // Static for now, replace with geolocation backend

  const renderPetServiceCard = ({ item }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <Icon name={item.icon} size={32} color="#254080" />
      <Text style={styles.serviceTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderClinicSpecialtyCard = ({ item }) => (
    <Card style={styles.specialtyCard}>
      <Card.Content style={styles.specialtyContent}>
        <Icon name={item.icon} size={28} color="#205ecb" />
        <Text style={styles.specialtyTitle}>{item.title}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Location Header */}
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.greetingText}>
          Good Morning
        </Text>
        <View style={styles.locationRow}>
          <Icon name="map-marker" size={20} color="#254080" />
          <Text style={styles.locationText}>{userLocation}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search services or pets"
        value={searchText}
        onChangeText={setSearchText}
        mode="outlined"
        style={styles.searchBar}
        left={<TextInput.Icon name="magnify" />}
      />

      {/* Pet Services */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Pet Services
        </Text>
        <FlatList
          horizontal
          data={petServices}
          renderItem={renderPetServiceCard}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>

      {/* Clinic Specialties */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Our Clinic Services
        </Text>
        <FlatList
          horizontal
          data={clinicSpecialties}
          renderItem={renderClinicSpecialtyCard}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f7fa',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 20,
  },
  greetingText: {
    color: '#254080',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 6,
    color: '#254080',
    fontWeight: '500',
  },
  searchBar: {
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#254080',
    marginBottom: 12,
    fontWeight: '600',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    width: 120,
  },
  serviceTitle: {
    marginTop: 8,
    color: '#254080',
    fontWeight: '600',
    textAlign: 'center',
  },
  specialtyCard: {
    backgroundColor: '#e8f0fe',
    borderRadius: 12,
    marginRight: 15,
    width: 160,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  specialtyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialtyTitle: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#205ecb',
    fontSize: 14,
  },
});

export default HomeScreen;
