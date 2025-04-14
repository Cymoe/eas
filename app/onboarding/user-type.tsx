import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserTypeScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleContinue = async () => {
    if (selectedType) {
      try {
        // Store the user type selection
        await AsyncStorage.setItem('userType', selectedType);
        
        // Navigate based on user type
        if (selectedType === 'solo') {
          // Solo artist flow
          router.push('/onboarding/full-name' as any);
        } else if (selectedType === 'band') {
          // Band flow
          router.push('/onboarding/band-name' as any);
        }
      } catch (error) {
        console.error('Error saving user type:', error);
      }
    }
  };

  const goBack = () => {
    router.back();
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
              <Text style={styles.stepIndicator}>4/8</Text>
            </View>
            <Text style={styles.headerSubtitle}>User Type</Text>
          </View>
          <View style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressIndicator} />
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>I am a</Text>
        
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={[
              styles.card, 
              styles.soloCard,
              selectedType === 'solo' && styles.selectedCard
            ]}
            onPress={() => setSelectedType('solo')}
          >
            <Text style={styles.cardTitle}>Solo Artist</Text>
            <View style={[styles.cardImage, styles.soloCardImage]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.card, 
              styles.bandCard,
              selectedType === 'band' && styles.selectedCard
            ]}
            onPress={() => setSelectedType('band')}
          >
            <Text style={styles.cardTitle}>Band</Text>
            <View style={[styles.cardImage, styles.bandCardImage]} />
          </TouchableOpacity>
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
            style={[styles.continueButton, !selectedType && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selectedType}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    width: '100%',
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  infoButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressIndicator: {
    width: '50%', // 4/8 of the progress
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontWeight: '400',
    fontSize: 32,
    lineHeight: 38,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  cardContainer: {
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 0,
    height: 160,
    borderRadius: 7.89,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 8,
  },
  soloCard: {
    backgroundColor: '#006450', // Green color for solo artist
  },
  bandCard: {
    backgroundColor: '#DC158C', // Pink color for band
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 28,
    lineHeight: 37,
    color: '#FFFFFF',
    zIndex: 1,
  },
  cardImage: {
    position: 'absolute',
    width: 144,
    height: 144,
    right: -80,
    bottom: 24,
    borderRadius: 7.89,
    transform: [{ rotate: '25deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 19.72,
  },
  soloCardImage: {
    backgroundColor: 'rgba(0, 100, 80, 0.7)', // Darker shade of the solo card color
  },
  bandCardImage: {
    backgroundColor: 'rgba(220, 21, 140, 0.7)', // Darker shade of the band card color
  },
  footer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 34,
    backdropFilter: 'blur(16px)',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  continueButton: {
    flex: 1,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: '#FF4B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17.1429,
    lineHeight: 19,
    color: '#121212',
    textAlign: 'center',
  },
});
