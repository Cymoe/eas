import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationSearchModal from '../../components/LocationSearchModal';

interface LocationData {
  name: string;
  region: string;
  country: string;
  distance: string;
}

export default function LocationScreen() {
  const [location, setLocation] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationFocus = () => {
    setIsSearchModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsSearchModalVisible(false);
    setSearchQuery('');
  };

  const handleSelectLocation = (selectedLocation: LocationData) => {
    setLocation(selectedLocation.name);
    setLocationData(selectedLocation);
    setIsLocationValid(true);
    setIsSearchModalVisible(false);
  };

  const clearLocation = () => {
    setLocation('');
    setLocationData(null);
    setIsLocationValid(false);
  };

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('userLocation', location);
      if (locationData) {
        await AsyncStorage.setItem('userLocationData', JSON.stringify(locationData));
      }
      router.push('/onboarding/pictures');
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle}>Registration</Text>
              <Text style={styles.stepIndicator}>1/8</Text>
            </View>
            <Text style={styles.headerSubtitle}>Email</Text>
          </View>
          <View style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: '25%' }]} />
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What's your location?</Text>
          <Text style={styles.subtitle}>Share your location to find nearby musicians and events</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <View style={styles.locationInputRow}>
            <View style={styles.flagContainer}>
              <Ionicons name="flag" size={32} color="#FFFFFF" />
            </View>
            
            <Pressable 
              style={styles.inputContainer}
              onPress={handleLocationFocus}
            >
              <Ionicons name="location-outline" size={16} color="rgba(255, 255, 255, 0.48)" />
              <Text 
                style={[
                  styles.inputText, 
                  !location && styles.placeholderText
                ]}
              >
                {location || "E.g. Los Angeles"}
              </Text>
              {location.length > 0 && (
                <TouchableOpacity onPress={clearLocation}>
                  <Ionicons name="close-circle" size={16} color="rgba(255, 255, 255, 0.48)" />
                </TouchableOpacity>
              )}
              {isLocationValid && (
                <Ionicons name="checkmark-circle" size={16} color="#64CD75" />
              )}
            </Pressable>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={12} color="#828282" />
            <Text style={styles.infoText}>
              Your location helps us connect you with local musicians and music events. 
              It will only be shown to other users at a city level.
            </Text>
          </View>
        </View>
      </View>
      
      {/* Footer */}
      <LinearGradient
        colors={['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 0.16)']}
        style={styles.footer}
      >
        <View style={styles.footerContent}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="chevron-back" size={27} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.continueButton,
              isLocationValid ? styles.continueButtonActive : {}
            ]}
            onPress={handleContinue}
            disabled={!isLocationValid}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tosContainer}>
          <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
          <Text style={styles.tosText}>By pressing "Continue" you agree with BandMate TOS.</Text>
        </View>
      </LinearGradient>

      {/* Location Search Modal */}
      <LocationSearchModal
        visible={isSearchModalVisible}
        searchQuery={searchQuery}
        onChangeText={setSearchQuery}
        onClose={handleCloseModal}
        onSelectLocation={handleSelectLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
    zIndex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    lineHeight: 22,
  },
  infoButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressIndicator: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingTop: 136,
    paddingHorizontal: 12,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 4,
    gap: 12,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
    width: '100%',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
    width: '100%',
  },
  locationContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  locationInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  flagContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    opacity: 0.78,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    gap: 8,
  },
  inputText: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    letterSpacing: -0.03,
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.48)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
  },
  infoText: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 34,
    gap: 12,
    zIndex: 2,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#FF4B4B',
  },
  continueText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 19,
    color: '#121212',
    textAlign: 'center',
  },
  tosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.03,
    textAlign: 'center',
  },
});
