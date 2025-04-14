import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

// TabBarBackground component that provides a solid black background
// following the WindSurf design system guidelines
export default function TabBarBackground() {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        tint="dark"
        intensity={100}
        style={StyleSheet.absoluteFill}
      >
        <View style={styles.overlay} />
      </BlurView>
    );
  }
  
  // For Android and other platforms, return a simple black background
  return <View style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000', // Solid black background as shown in the image
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darkening overlay for the blur effect
  },
});

export function useBottomTabOverflow() {
  return 0;
}
