import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import * as SplashScreenModule from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreenModule.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

// Define the grid size
const GRID_ROWS = 7;
const GRID_COLS = 4;

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Animation value for the pattern shift
  const patternShiftAnim = useRef(new Animated.Value(0)).current;
  
  // Define multiple sets of colored cells positions
  // Each set represents a different state in the animation
  const coloredCellSets = [
    // Set 1 - Initial positions
    [
      { row: 0, col: 3, color: 'rgba(255, 59, 48, 0.16)' },
      { row: 1, col: 0, color: '#FF3B30' },
      { row: 5, col: 0, color: 'rgba(255, 59, 48, 0.32)' },
      { row: 6, col: 3, color: 'rgba(255, 59, 48, 0.8)' },
    ],
    // Set 2
    [
      { row: 0, col: 2, color: 'rgba(255, 59, 48, 0.16)' },
      { row: 2, col: 0, color: '#FF3B30' },
      { row: 4, col: 1, color: 'rgba(255, 59, 48, 0.32)' },
      { row: 6, col: 2, color: 'rgba(255, 59, 48, 0.8)' },
    ],
    // Set 3
    [
      { row: 0, col: 1, color: 'rgba(255, 59, 48, 0.16)' },
      { row: 2, col: 1, color: '#FF3B30' },
      { row: 4, col: 2, color: 'rgba(255, 59, 48, 0.32)' },
      { row: 6, col: 1, color: 'rgba(255, 59, 48, 0.8)' },
    ],
    // Set 4
    [
      { row: 0, col: 0, color: 'rgba(255, 59, 48, 0.16)' },
      { row: 2, col: 2, color: '#FF3B30' },
      { row: 4, col: 3, color: 'rgba(255, 59, 48, 0.32)' },
      { row: 6, col: 0, color: 'rgba(255, 59, 48, 0.8)' },
    ],
    // Set 5
    [
      { row: 1, col: 1, color: 'rgba(255, 59, 48, 0.16)' },
      { row: 3, col: 2, color: '#FF3B30' },
      { row: 5, col: 3, color: 'rgba(255, 59, 48, 0.32)' },
      { row: 5, col: 1, color: 'rgba(255, 59, 48, 0.8)' },
    ],
    // Set 6 - Back to positions similar to initial
    [
      { row: 1, col: 3, color: 'rgba(255, 59, 48, 0.16)' },
      { row: 3, col: 0, color: '#FF3B30' },
      { row: 5, col: 2, color: 'rgba(255, 59, 48, 0.32)' },
      { row: 5, col: 3, color: 'rgba(255, 59, 48, 0.8)' },
    ],
  ];

  useEffect(() => {
    // Hide the native splash screen
    SplashScreenModule.hideAsync();

    // Start logo animations
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
    ]).start();
    
    // Start the subtle pattern shift animation
    const startPatternShift = () => {
      Animated.loop(
        Animated.sequence([
          // Pause at the beginning
          Animated.delay(1000),
          // Animate through all the pattern sets
          Animated.timing(patternShiftAnim, {
            toValue: coloredCellSets.length - 1,
            duration: 8000, // Slow animation over 8 seconds
            useNativeDriver: true,
          }),
          // Reset to beginning
          Animated.timing(patternShiftAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    
    // Start the pattern shift after a short delay
    setTimeout(startPatternShift, 500);
    
    // Wait before finishing
    setTimeout(() => {
      onFinish();
    }, 6000); // Give more time to see the animations
    
  }, [fadeAnim, scaleAnim, patternShiftAnim, onFinish]);

  // Render the grid with animated cells
  const renderGrid = () => {
    // Create a 2D array to represent the grid
    const grid = Array(GRID_ROWS).fill(0).map(() => Array(GRID_COLS).fill(null));
    
    // Function to calculate the opacity for a cell based on the current pattern state
    const getCellOpacity = (row: number, col: number) => {
      // Check each set of colored cells
      for (let setIndex = 0; setIndex < coloredCellSets.length; setIndex++) {
        const set = coloredCellSets[setIndex];
        
        // Check if this cell is colored in this set
        const cellInSet = set.find(cell => cell.row === row && cell.col === col);
        
        if (cellInSet) {
          // Calculate how much this set contributes to the current animation state
          return patternShiftAnim.interpolate({
            inputRange: [
              Math.max(0, setIndex - 1), 
              setIndex, 
              Math.min(coloredCellSets.length - 1, setIndex + 1)
            ],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp'
          });
        }
      }
      
      // If this cell is not colored in any set, return 0
      return 0;
    };
    
    // Function to get the color for a cell
    const getCellColor = (row: number, col: number) => {
      // Check each set of colored cells
      for (let setIndex = 0; setIndex < coloredCellSets.length; setIndex++) {
        const set = coloredCellSets[setIndex];
        
        // Check if this cell is colored in this set
        const cellInSet = set.find(cell => cell.row === row && cell.col === col);
        
        if (cellInSet) {
          return cellInSet.color;
        }
      }
      
      // Default dark color
      return '#121212';
    };
    
    // Render each row
    return Array(GRID_ROWS).fill(0).map((_, row) => (
      <View key={`row-${row}`} style={styles.row}>
        {Array(GRID_COLS).fill(0).map((_, col) => {
          const cellColor = getCellColor(row, col);
          const cellOpacity = getCellOpacity(row, col);
          
          return (
            <Animated.View 
              key={`cell-${row}-${col}`}
              style={[
                styles.cell,
                {
                  backgroundColor: '#121212', // Base color
                  opacity: 1
                }
              ]}
            >
              <Animated.View 
                style={[
                  styles.colorOverlay,
                  {
                    backgroundColor: cellColor,
                    opacity: cellOpacity
                  }
                ]}
              />
            </Animated.View>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Grid layout */}
      <View style={styles.gridContainer}>
        {renderGrid()}
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
    overflow: 'hidden',
    position: 'relative',
  },
  colorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  logoContainer: {
    position: 'absolute',
    width: 162,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoImage: {
    width: 162,
    height: 140,
  }
});
