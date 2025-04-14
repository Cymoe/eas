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

// Define looking for options type
type LookingForData = {
  jamSessions: boolean;
  studioTime: boolean;
  concerts: boolean;
  bandMembers: boolean;
};

export default function LookingForScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();
  
  // State for the looking for toggles
  const [jamSessions, setJamSessions] = useState(true);
  const [studioTime, setStudioTime] = useState(true);
  const [concerts, setConcerts] = useState(true);
  const [bandMembers, setBandMembers] = useState(true);

  // Load saved looking for data on mount
  useEffect(() => {
    const loadLookingFor = async () => {
      try {
        const savedData = await AsyncStorage.getItem('lookingFor');
        if (savedData) {
          const parsedData = JSON.parse(savedData) as LookingForData;
          setJamSessions(parsedData.jamSessions);
          setStudioTime(parsedData.studioTime);
          setConcerts(parsedData.concerts);
          setBandMembers(parsedData.bandMembers);
        }
      } catch (error) {
        console.log('Error loading looking for data:', error);
      }
    };
    
    loadLookingFor();
  }, []);

  // Handle toggle change with haptic feedback
  const handleToggleChange = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(value);
  };

  // Handle saving and returning to the profile
  const handleSave = async () => {
    try {
      // Save looking for data to AsyncStorage
      const lookingForData: LookingForData = {
        jamSessions,
        studioTime,
        concerts,
        bandMembers
      };
      
      await AsyncStorage.setItem('lookingFor', JSON.stringify(lookingForData));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Navigate back to the appropriate screen
      router.back();
    } catch (error) {
      console.log('Error saving looking for data:', error);
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
        <Text style={styles.headerTitle}>Looking For</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      {/* Looking For Options */}
      <View style={styles.content}>
        {/* Jam Sessions Option */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Jam sessions</Text>
          <Switch
            value={jamSessions}
            onValueChange={(value) => handleToggleChange(setJamSessions, value)}
            trackColor={{ false: 'rgba(255, 255, 255, 0.08)', true: '#FF3B30' }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="rgba(255, 255, 255, 0.08)"
            style={Platform.OS === 'ios' ? styles.iosSwitch : styles.androidSwitch}
          />
        </View>
        
        <View style={styles.divider} />
        
        {/* Studio Time Option */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Studio time</Text>
          <Switch
            value={studioTime}
            onValueChange={(value) => handleToggleChange(setStudioTime, value)}
            trackColor={{ false: 'rgba(255, 255, 255, 0.08)', true: '#FF3B30' }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="rgba(255, 255, 255, 0.08)"
            style={Platform.OS === 'ios' ? styles.iosSwitch : styles.androidSwitch}
          />
        </View>
        
        <View style={styles.divider} />
        
        {/* Concerts Option */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Concerts</Text>
          <Switch
            value={concerts}
            onValueChange={(value) => handleToggleChange(setConcerts, value)}
            trackColor={{ false: 'rgba(255, 255, 255, 0.08)', true: '#FF3B30' }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="rgba(255, 255, 255, 0.08)"
            style={Platform.OS === 'ios' ? styles.iosSwitch : styles.androidSwitch}
          />
        </View>
        
        <View style={styles.divider} />
        
        {/* Band Members Option */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Band members</Text>
          <Switch
            value={bandMembers}
            onValueChange={(value) => handleToggleChange(setBandMembers, value)}
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
