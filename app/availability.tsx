import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Switch,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define availability type
type AvailabilityData = {
  weekdays: boolean;
  weekends: boolean;
};

export default function AvailabilityScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();
  
  // State for the availability toggles
  const [weekdaysAvailable, setWeekdaysAvailable] = useState(true);
  const [weekendsAvailable, setWeekendsAvailable] = useState(true);

  // Load saved availability data on mount
  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const savedData = await AsyncStorage.getItem('availability');
        if (savedData) {
          const parsedData = JSON.parse(savedData) as AvailabilityData;
          setWeekdaysAvailable(parsedData.weekdays);
          setWeekendsAvailable(parsedData.weekends);
        }
      } catch (error) {
        console.log('Error loading availability data:', error);
      }
    };
    
    loadAvailability();
  }, []);

  // Handle toggle change with haptic feedback
  const handleToggleChange = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(value);
  };

  // Handle saving and returning to the profile
  const handleSave = async () => {
    try {
      // Save availability data to AsyncStorage
      const availabilityData: AvailabilityData = {
        weekdays: weekdaysAvailable,
        weekends: weekendsAvailable,
      };
      
      await AsyncStorage.setItem('availability', JSON.stringify(availabilityData));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Navigate back to the appropriate screen
      router.back();
    } catch (error) {
      console.log('Error saving availability data:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Availability</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      {/* Availability Options */}
      <View style={styles.content}>
        {/* Weekdays Option */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Weekdays</Text>
          <Switch
            value={weekdaysAvailable}
            onValueChange={(value) => handleToggleChange(setWeekdaysAvailable, value)}
            trackColor={{ false: 'rgba(255, 255, 255, 0.08)', true: '#FF3B30' }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="rgba(255, 255, 255, 0.08)"
            style={Platform.OS === 'ios' ? styles.iosSwitch : styles.androidSwitch}
          />
        </View>
        
        <View style={styles.divider} />
        
        {/* Weekends Option */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Weekends</Text>
          <Switch
            value={weekendsAvailable}
            onValueChange={(value) => handleToggleChange(setWeekendsAvailable, value)}
            trackColor={{ false: 'rgba(255, 255, 255, 0.08)', true: '#FF3B30' }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="rgba(255, 255, 255, 0.08)"
            style={Platform.OS === 'ios' ? styles.iosSwitch : styles.androidSwitch}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '400',
    lineHeight: 25,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999, // Fully rounded per WindSurf design
  },
  saveButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FF3B30', // Accent color per WindSurf design
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  optionText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  iosSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  androidSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});
