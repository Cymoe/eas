import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
// Import our mock AsyncStorage instead of the real one
import AsyncStorage from '../utils/mockAsyncStorage';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

// WindSurf Design System Constants
const windsurf = {
  colors: {
    // Primary Colors
    accent: '#FF3B30',
    white: '#FFFFFF',
    night: '#121212',
    redFlag: '#F41857',
    greenFlag: '#6BFF90',
    orangeFlag: '#FFA726',
    
    // Opacity Functions
    withOpacity: (color: string, opacity: number) => {
      // Convert hex to rgba
      let r, g, b;
      if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return color;
    },
    
    // Opacity Levels
    opacityActive: 1,
    opacityInactive: 0.48,
    opacityHovered: 0.64,
    opacityBgNormal: 0.08,
    opacityBgHover: 0.16,
  }
};

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

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={24} color={windsurf.colors.white} />
      </TouchableOpacity>
      
      <View style={styles.content}>
        {/* Welcome Text */}
        <Text style={styles.welcomeTitle}>Welcome back,</Text>
        <Text style={styles.userName}>{userName}</Text>
        
        {/* Helper Text */}
        <View style={styles.helperContainer}>
          <View style={styles.helperIcon}>
            <Ionicons 
              name="information-circle" 
              size={12} 
              color={windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive)} 
            />
          </View>
          <Text style={styles.helperText}>
            Tap the button below to continue to the app
          </Text>
        </View>
        
        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          activeOpacity={0.7}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue to App</Text>
        </TouchableOpacity>
      </View>
      
      {/* Blurred Card */}
      <BlurView
        intensity={16}
        tint="dark"
        style={styles.blurredCard}
      >
        <Text style={styles.cardTitle}>WindSurf Design System</Text>
        <Text style={styles.cardDescription}>
          This app demonstrates the WindSurf design system components and guidelines
        </Text>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: windsurf.colors.night,
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  welcomeTitle: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '500',
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
    marginBottom: 8,
  },
  userName: {
    fontFamily: 'Abril Fatface',
    fontSize: 40,
    fontWeight: '400',
    color: windsurf.colors.white,
    marginBottom: 24,
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  helperIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  continueButton: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: windsurf.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: windsurf.colors.white,
  },
  blurredCard: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    color: windsurf.colors.white,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
    lineHeight: 20,
  },
});
