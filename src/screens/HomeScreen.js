import React, { useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, TextInput, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles/commonStyles';
import images from '../assets/images';

const petServices = [
  { id: "1", title: "Digital X-Rays",        image: images.digitalXray },
  { id: "2", title: "Fluoroscopy Unit",      image: images.fluoroscopy },
  { id: "3", title: "Cardiac Care",          image: images.cardiac },
  { id: "4", title: "Routine Check-Up",     image: images.checkup },
  { id: "5", title: "Expert Consultation",   image: images.consultation },
  { id: "6", title: "Ultrasound/Sonography", image: images.ultrasound },
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
  const userLocation = 'Borivali West, Mumbai';

  const renderPetServiceCard = ({ item }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <Image
        source={item.image}
        style={styles.serviceImage}
        resizeMode="contain"
      />
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
      <View
        style={[
          styles.header,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        {/* Left side */}
        <View>
          <Text variant="titleMedium" style={styles.greetingText}>
            Good Morning
          </Text>
          <View style={styles.locationRow}>
            <Icon name="map-marker" size={20} color="#254080" />
            <Text style={styles.locationText}>{userLocation}</Text>
          </View>
        </View>

        {/* Right side - User Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <FontAwesome5 name="user-circle" size={32} color="#254080" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search services or pets"
        value={searchText}
        onChangeText={setSearchText}
        mode="flat"
        style={styles.searchBar}
        underlineColor="transparent"
        theme={{
          roundness: 8,
          colors: { primary: '#254080', background: '#fff' },
        }}
        left={
          <TextInput.Icon
            icon={() => (
              <FontAwesome5 name="search" size={18} color="#254080" />
            )}
          />
        }
      />

      {/* Pet Services */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Pet Services
        </Text>
        <FlatList
          data={petServices}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.serviceCard}>
              <Image
                source={item.image}
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 8,
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.serviceTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Clinic Specialties */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Our Clinic Services
        </Text>
        <FlatList
          data={clinicSpecialties}
          renderItem={renderClinicSpecialtyCard}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
