import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  RadioButton,
  Card,
  Divider,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeSlotSelector from './TimeSlotSelector';

// Helper component: Header with gradient-like solid background and white text
const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text variant="headlineMedium" style={styles.headerText}>
      {title}
    </Text>
  </View>
);

// Helper component: DateTime Selector block
const DateTimeSelector = ({
  date,
  showDatePicker,
  setShowDatePicker,
  showTimePicker,
  setShowTimePicker,
  onDateChange,
  onTimeChange,
  onNext,
  selectedTimeSlot,
  setSelectedTimeSlot,
}) => (
  <View>
    <Button
      mode="outlined"
      onPress={() => setShowDatePicker(true)}
      style={styles.pickerBtn}
      textColor="#254080"
      outlineColor="#254080"
    >
      Select Date: {date.toDateString()}
    </Button>
    {showDatePicker && (
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
        onChange={onDateChange}
      />
    )}
    <Button
      mode="outlined"
      onPress={() => setShowTimePicker(true)}
      style={styles.pickerBtn}
      textColor="#254080"
      outlineColor="#254080"
    >
      Select Time:{' '}
      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </Button>
    {showTimePicker && (
      // TimeSlotSelector
      <TimeSlotSelector
        selectedSlot={selectedTimeSlot}
        onSelectSlot={setSelectedTimeSlot}
      />
    )}
    <Button
      mode="contained"
      onPress={onNext}
      style={styles.nextBtn}
      buttonColor="#254080"
      textColor="#fff"
    >
      Next
    </Button>
  </View>
);

// Helper component: Address selector with radio list and add new address toggle/input
const AddressSelector = ({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  addingNewAddress,
  setAddingNewAddress,
  newAddress,
  setNewAddress,
  newLatitude,
  setNewLatitude,
  newLongitude,
  setNewLongitude,
  additionalDetails,
  setAdditionalDetails,
  onSubmit,
}) => (
  <View>
    <Text variant="titleMedium" style={styles.subtitle}>
      Choose Address
    </Text>
    {!addingNewAddress && addresses.length > 0 && (
      <RadioButton.Group
        onValueChange={setSelectedAddressId}
        value={selectedAddressId}
      >
        {addresses.map(addr => (
          <RadioButton.Item
            key={addr.id}
            label={addr.label}
            value={addr.id}
            labelStyle={{ color: '#254080' }}
            uncheckedColor="#254080"
          />
        ))}
      </RadioButton.Group>
    )}
    <Button
      mode="text"
      onPress={() => {
        setAddingNewAddress(!addingNewAddress);
        if (!addingNewAddress) setSelectedAddressId(null);
      }}
      textColor="#254080"
      style={styles.addAddressBtn}
    >
      {addingNewAddress ? 'Cancel Adding New Address' : 'Add New Address'}
    </Button>
    {addingNewAddress && (
      <>
        <TextInput
          label="New Address"
          mode="outlined"
          value={newAddress}
          onChangeText={setNewAddress}
          style={styles.input}
          multiline
        />
        <TextInput
          label="Latitude"
          mode="outlined"
          value={newLatitude}
          onChangeText={setNewLatitude}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Longitude"
          mode="outlined"
          value={newLongitude}
          onChangeText={setNewLongitude}
          keyboardType="numeric"
          style={styles.input}
        />
      </>
    )}
    <TextInput
      label="Additional Details"
      mode="outlined"
      value={additionalDetails}
      onChangeText={setAdditionalDetails}
      style={styles.input}
      multiline
      numberOfLines={3}
      placeholder="Any other instructions or information"
    />
    <Button
      mode="contained"
      onPress={onSubmit}
      style={styles.submitBtn}
      buttonColor="#254080"
      textColor="#fff"
    >
      Schedule Appointment
    </Button>
  </View>
);

const BookAppointment = ({ navigation, route }) => {
  const { service = 'Appointment' } = route.params || {};

  const [step, setStep] = useState(1);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Simulate fetched addresses
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Adding new address controls
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newLatitude, setNewLatitude] = useState('');
  const [newLongitude, setNewLongitude] = useState('');

  const [additionalDetails, setAdditionalDetails] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  useEffect(() => {
    setAddresses([
      { id: '1', label: 'Home - 123 Street, Mumbai' },
      { id: '2', label: 'Work - 456 Avenue, Mumbai' },
    ]);
    setSelectedAddressId('1');
  }, []);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const validateAndSubmit = () => {
    if (step === 1) {
      // Before moving to step 2, ensure a time slot is selected
      if (!selectedTimeSlot) {
        Alert.alert('Validation', 'Please select a time slot');
        return; // Stop here, don't proceed to step 2
      }
      setStep(2); // Proceed to address/details step
      return;
    }

    // Step 2 validations
    if (!selectedAddressId && addingNewAddress) {
      if (!newAddress) {
        Alert.alert('Validation', 'Please enter your new address');
        return;
      }
      if (!newLatitude || !newLongitude) {
        Alert.alert('Validation', 'Please set latitude and longitude');
        return;
      }
    }

    // Additional details are optional

    // All validations passed, proceed to submit
    Alert.alert('Success', 'Your appointment has been scheduled!');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title={`${service} Appointment`} />

      {step === 1 && (
        <DateTimeSelector
          date={date}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          showTimePicker={showTimePicker}
          setShowTimePicker={setShowTimePicker}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
          onNext={validateAndSubmit}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          //  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
        />
      )}

      {step === 2 && (
        <AddressSelector
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
          addingNewAddress={addingNewAddress}
          setAddingNewAddress={setAddingNewAddress}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          newLatitude={newLatitude}
          setNewLatitude={setNewLatitude}
          newLongitude={newLongitude}
          setNewLongitude={setNewLongitude}
          additionalDetails={additionalDetails}
          setAdditionalDetails={setAdditionalDetails}
          onSubmit={validateAndSubmit}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  headerContainer: {
    backgroundColor: '#254080',
    paddingVertical: 24,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1.1,
  },
  pickerBtn: {
    marginBottom: 16,
  },
  nextBtn: {
    marginTop: 15,
    borderRadius: 24,
    paddingVertical: 8,
  },
  subtitle: {
    fontWeight: '600',
    marginBottom: 14,
    color: '#254080',
  },
  addAddressBtn: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  submitBtn: {
    marginTop: 20,
    borderRadius: 24,
    paddingVertical: 10,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
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
});

export default BookAppointment;
