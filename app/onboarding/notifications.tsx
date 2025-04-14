import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
  const handleEnableNotifications = async () => {
    try {
      // In a real implementation, this would request notification permissions
      await AsyncStorage.setItem('notificationsEnabled', 'true');
      router.push('/onboarding/success');
    } catch (error) {
      console.error('Error saving notification preference:', error);
    }
  };

  const handleSkipNotifications = async () => {
    try {
      await AsyncStorage.setItem('notificationsEnabled', 'false');
      router.push('/onboarding/success');
    } catch (error) {
      console.error('Error saving notification preference:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Ionicons name="musical-note" size={44} color="#FFFFFF" />
        </View>
        
        <View style={styles.notificationContainer}>
          {/* Bell Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="notifications-outline" size={88} color="#FFFFFF" />
          </View>
          
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Turn on push notifications.</Text>
            <Text style={styles.subtitle}>Get updates, special offers and more</Text>
          </View>
          
          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.enableButton}
              onPress={handleEnableNotifications}
            >
              <Text style={styles.enableButtonText}>Turn on notifciations</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={handleSkipNotifications}
            >
              <Text style={styles.skipButtonText}>Not now</Text>
            </TouchableOpacity>
          </View>
          
          {/* Settings Info */}
          <Text style={styles.settingsInfo}>
            Manage your notifications anytime under the <Text style={styles.settingsHighlight}>Settings</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
    paddingHorizontal: 81,
  },
  logoContainer: {
    width: 51,
    height: 44,
    marginBottom: 94,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContainer: {
    width: 213,
    alignItems: 'center',
    gap: 48,
  },
  iconContainer: {
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: 203,
    alignItems: 'center',
    gap: 18,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.64)',
  },
  buttonsContainer: {
    width: '100%',
    gap: 8,
  },
  enableButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  enableButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#121212',
  },
  skipButton: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  skipButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#FFFFFF',
  },
  settingsInfo: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.64)',
    marginTop: 16,
  },
  settingsHighlight: {
    color: '#FFFFFF',
  },
});
