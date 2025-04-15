import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock location data
const MOCK_LOCATIONS = [
  {
    id: 'current',
    name: 'San Francisco',
    state: 'CA',
    country: 'US',
    distance: 0,
    isCurrent: true
  },
  {
    id: 'loc1',
    name: 'San Francisco',
    state: 'CA',
    country: 'US',
    distance: 0.8,
    isCurrent: false
  },
  {
    id: 'loc2',
    name: 'Los Angeles',
    state: 'CA',
    country: 'US',
    distance: 48,
    isCurrent: false
  },
  {
    id: 'loc3',
    name: 'San Diego',
    state: 'CA',
    country: 'US',
    distance: 84,
    isCurrent: false
  }
];

export default function SelectLocationScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Format distance for display
  const formatDistance = (distance: number) => {
    if (distance === 0) return '';
    if (distance < 1) return `${Math.round(distance * 1000)}m`;
    return `${Math.round(distance)}km`;
  };

  // Handle location selection
  const handleLocationSelect = (location: any) => {
    // Store the selected location data
    const locationData = {
      locationName: location.name,
      countryCode: location.country,
      state: location.state,
      vicinity: `${location.name}, ${location.state}`
    };

    // Navigate to date selection screen with location data
    router.push({
      pathname: '/select-date',
      params: {
        locationName: location.name,
        countryCode: location.country,
        state: location.state,
        vicinity: `${location.name}, ${location.state}`,
        returnTo: 'meeting-summary'
      }
    });
  };

  // Filter locations based on search query
  const filteredLocations = MOCK_LOCATIONS.filter(location => 
    searchQuery.length === 0 || 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header with search */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.48)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
            placeholderTextColor="rgba(255, 255, 255, 0.48)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.48)" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
      {/* Locations list */}
      <ScrollView style={styles.locationsContainer}>
        {filteredLocations.map(location => (
          <TouchableOpacity
            key={location.id}
            style={styles.locationItem}
            onPress={() => handleLocationSelect(location)}
          >
            {location.isCurrent && (
              <View style={styles.currentLocationIcon}>
                <Ionicons name="location" size={24} color="#FF3B30" />
              </View>
            )}
            
            <View style={[styles.locationInfo, location.isCurrent ? {} : styles.locationInfoPadding]}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationDetails}>
                {location.state}, {location.country} 
                {location.isCurrent ? ' • Current location' : ` • ${formatDistance(location.distance)}`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#FFFFFF',
    paddingHorizontal: 8,
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    paddingHorizontal: 8,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  locationsContainer: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  currentLocationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationInfoPadding: {
    paddingLeft: 36,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationDetails: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
  }
});
