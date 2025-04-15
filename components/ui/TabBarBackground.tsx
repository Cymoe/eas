import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// TabBarBackground component that provides a solid black background
// following the WindSurf design system guidelines
export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        tint="dark"
        intensity={100}
        style={StyleSheet.absoluteFill}
      >
        <View style={[
          styles.overlay,
          { backgroundColor: Colors[colorScheme ?? 'dark'].tabBar }
        ]} />
      </BlurView>
    );
  }
  
  // For Android and other platforms, return a simple themed background
  return <View style={[
    styles.background,
    { backgroundColor: Colors[colorScheme ?? 'dark'].tabBar }
  ]} />;
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export function useBottomTabOverflow() {
  return 0;
}
