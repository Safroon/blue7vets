import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Text, TextInput, Card } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC_1L9O8cUB-6aBhMUcKuYO6lXmQDKTp-4'; // ← Replace with your Google Maps API key

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

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [locationName, setLocationName] = useState('Fetching location...');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocationName(data.results[0].formatted_address);
      } else {
        setLocationName('Location not found');
      }
    } catch (error) {
      setLocationName('Unable to fetch location');
      console.warn(error);
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLocationName('Permission denied');
      Alert.alert(
        'Permission needed',
        'Location permission is required for location detection',
      );
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getLocationName(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
        setLocationName('Location unavailable');
        Alert.alert('Error', 'Could not get location: ' + error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const renderPetServiceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() =>
        navigation.navigate('Book Appointment', { service: item.title })
      }
    >
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
          <Text style={styles.locationText}>{locationName}</Text>
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
