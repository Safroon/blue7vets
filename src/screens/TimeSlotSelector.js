import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const timeSlots = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

const TimeSlotSelector = ({ selectedSlot, onSelectSlot }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time Slot</Text>
      <RadioButton.Group onValueChange={onSelectSlot} value={selectedSlot}>
        {timeSlots.map((slot, index) => (
          <RadioButton.Item
            key={index}
            label={slot}
            value={slot}
            labelStyle={styles.label}
            uncheckedColor="#254080"
          />
        ))}
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { color: '#254080', marginBottom: 8, fontWeight: '600' },
  label: { color: '#254080' },
});

export default TimeSlotSelector;
