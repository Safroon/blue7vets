// src/styles/commonStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  greetingText: {
    color: 'blue',
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
    borderRadius: 8,
    backgroundColor: '#EEF3F6',
    elevation: 3, // Android shadow
    shadowColor: '#fff', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: 12,
    fontSize: 16,
    height: 45,
    marginVertical: 10,
    borderWidth: 0, // avoid visible border
  },

  petServicesContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#1666F7',
    paddingVertical: 10,
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },
  serviceCard: {
    backgroundColor: '#EEF3F6',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 7,
    marginVertical: 9,
    paddingHorizontal: 15,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    flex: 1,
    minWidth: '45%',
    maxWidth: '45%',
  },
  serviceTitle: {
    color: '#254080',
    fontWeight: '600',
    textAlign: 'center',
  },
  specialtyCard: {
    flex: 1,
    marginHorizontal: 7,
    marginVertical: 4,
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#EEF3F6',
    elevation: 2,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 10,
    minWidth: '45%',
    maxWidth: '45%',
  },

  specialtyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#564741',
  },

  specialtyTitle: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 6,
    color: '#333',
  },
  specialtyIcon: {
    marginBottom: 4,
  },
  serviceImage: {
  width: 50,
  height: 50,
  marginBottom: 8,
},
});
