import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';

// Custom Checkmark component using the exact SVG path provided
const CheckmarkIcon = () => (
  <Svg width={75} height={74} viewBox="0 0 75 74" fill="none">
    <Path
      d="M37.5002 0.333496C17.2602 0.333496 0.833496 16.7602 0.833496 37.0002C0.833496 57.2402 17.2602 73.6668 37.5002 73.6668C57.7402 73.6668 74.1668 57.2402 74.1668 37.0002C74.1668 16.7602 57.7402 0.333496 37.5002 0.333496ZM30.1668 55.3335L11.8335 37.0002L17.0035 31.8302L30.1668 44.9568L57.9968 17.1268L63.1668 22.3335L30.1668 55.3335Z"
      fill="white"
    />
  </Svg>
);

export default function FinalScreen() {
  const handleStartMatching = () => {
    router.push({
      pathname: '/onboarding/location',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Logo */}
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Checkmark Icon */}
        <View style={styles.checkmarkContainer}>
          <CheckmarkIcon />
        </View>
        
        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Great Choice!</Text>
          <Text style={styles.subtitle}>
            Feel free to add more later under the Settings.
          </Text>
        </View>
        
        {/* Start Matching Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartMatching}
        >
          <Text style={styles.startButtonText}>Start matching!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 51,
    height: 44,
    position: 'absolute',
    top: 120,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 219,
    gap: 48,
  },
  checkmarkContainer: {
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 219,
    gap: 18,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 48,
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
  startButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 219,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  startButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#121212',
  },
});
