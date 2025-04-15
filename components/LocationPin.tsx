import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationPinProps {
  size?: number;
  color?: string;
}

/**
 * LocationPin component that follows the WindSurf design system
 * Used to display location markers in the app
 */
const LocationPin: React.FC<LocationPinProps> = ({ 
  size = 24, 
  color = '#FF3B30' // Accent color from WindSurf design system
}) => {
  return (
    <View style={styles.container}>
      <Ionicons 
        name="location" 
        size={size} 
        color={color} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LocationPin;
