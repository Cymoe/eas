import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import * as SplashScreenModule from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreenModule.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Hide the native splash screen
    SplashScreenModule.hideAsync();

    // Start animations
    Animated.sequence([
      // Fade in and scale up logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Wait a bit before finishing
      setTimeout(() => {
        onFinish();
      }, 1000);
    });
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={styles.container}>
      {/* Grid layout */}
      <View style={styles.gridContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, { backgroundColor: 'rgba(255, 59, 48, 0.16)' }]} />
        </View>
        
        {/* Row 2 */}
        <View style={styles.row}>
          <View style={[styles.cell, { backgroundColor: '#FF3B30' }]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
        </View>
        
        {/* Row 3 */}
        <View style={styles.row}>
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
        </View>
        
        {/* Row 4 */}
        <View style={styles.row}>
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
        </View>
        
        {/* Row 5 */}
        <View style={styles.row}>
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
        </View>
        
        {/* Row 6 */}
        <View style={styles.row}>
          <View style={[styles.cell, { backgroundColor: 'rgba(255, 59, 48, 0.32)' }]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
        </View>
        
        {/* Row 7 */}
        <View style={styles.row}>
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, styles.darkCell]} />
          <View style={[styles.cell, { backgroundColor: 'rgba(255, 59, 48, 0.8)' }]} />
        </View>
      </View>
      
      {/* Logo */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image 
          source={require('../assets/images/icon.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: 120,
    width: '100%',
  },
  cell: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  darkCell: {
    backgroundColor: '#121212',
  },
  logoContainer: {
    position: 'absolute',
    width: 162,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 162,
    height: 140,
  }
});
