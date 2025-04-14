import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationData {
  name: string;
  region: string;
  country: string;
  distance: string;
}

interface LocationSearchModalProps {
  visible: boolean;
  searchQuery: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onSelectLocation: (location: LocationData) => void;
}

// Mock data for demonstration
const mockLocations: LocationData[] = [
  { name: 'Los Angeles', region: 'California', country: 'United States', distance: '0 km' },
  { name: 'London', region: 'England', country: 'United Kingdom', distance: '8,750 km' },
  { name: 'New York', region: 'New York', country: 'United States', distance: '3,940 km' },
  { name: 'Paris', region: 'Île-de-France', country: 'France', distance: '9,105 km' },
  { name: 'Tokyo', region: 'Tokyo', country: 'Japan', distance: '8,817 km' },
];

export default function LocationSearchModal({
  visible,
  searchQuery,
  onChangeText,
  onClose,
  onSelectLocation,
}: LocationSearchModalProps) {
  const filteredLocations = mockLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Location</Text>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.48)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search locations..."
              placeholderTextColor="rgba(255, 255, 255, 0.48)"
              value={searchQuery}
              onChangeText={onChangeText}
              autoFocus={true}
            />
          </View>

          {/* Results */}
          <ScrollView style={styles.resultsContainer}>
            {filteredLocations.map((location, index) => (
              <TouchableOpacity
                key={index}
                style={styles.locationItem}
                onPress={() => onSelectLocation(location)}
              >
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationDetails}>
                    {location.region}, {location.country}
                  </Text>
                </View>
                <Text style={styles.distance}>{location.distance}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 40, // To offset the close button and center the title
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#FFFFFF',
  },
  resultsContainer: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationDetails: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  distance: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 16,
  },
}); 