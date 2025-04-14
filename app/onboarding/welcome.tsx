import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    // Load user name from AsyncStorage
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        } else {
          setUserName('Myles'); // Default name if not found
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUserName('Myles'); // Default name on error
      }
    };
    
    loadUserData();
  }, []);

  const goToMatchingScreen = () => {
    try {
      console.log("Attempting to navigate to matching screen...");
      // Navigate to the matching screen
      router.replace('/(tabs)/matching');
      
      // Show an alert to confirm the navigation was triggered
      Alert.alert(
        "Navigation",
        "Navigating to matching screen...",
        [{ text: "OK" }]
      );
    } catch (error: any) {
      console.error("Navigation error:", error);
      Alert.alert("Navigation Error", error?.message || "Unknown error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background with Gradient */}
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        <View style={styles.contentContainer}>
          {/* Logo and App Name */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="musical-note" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>BandMate</Text>
          </View>
          
          {/* User Profile and Welcome */}
          <View style={styles.welcomeContainer}>
            <View style={styles.profileSection}>
              <View style={styles.profileImageBorder}>
                <View style={styles.profileImagePlaceholder}>
                  <Ionicons name="person" size={64} color="#FFFFFF" />
                </View>
              </View>
              
              <Text style={styles.welcomeText}>Hi {userName}!</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.welcomeButton}
              onPress={goToMatchingScreen}
            >
              <Text style={styles.welcomeButtonText}>Welcome back!</Text>
            </TouchableOpacity>
          </View>
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 37,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontFamily: 'Abril Fatface',
    fontSize: 28,
    lineHeight: 38,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  welcomeContainer: {
    width: 206,
    alignItems: 'center',
    gap: 24,
  },
  profileSection: {
    alignItems: 'center',
    gap: 16,
  },
  profileImageBorder: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#F5F5F5',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholder: {
    width: 108,
    height: 108,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 36,
    color: '#FFFFFF',
  },
  welcomeButton: {
    width: 206,
    height: 43,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  welcomeButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    color: '#FFFFFF',
  },
});
