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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define languages type
type LanguagesData = {
  [key: string]: boolean;
};

// List of available languages
const LANGUAGES = [
  'Albanian',
  'Chinese Traditional',
  'Croatian',
  'English',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Spanish',
  'Swedish',
  'Serbian',
  'Japanese',
];

export default function LanguagesScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();
  
  // State for the languages toggles
  const [languages, setLanguages] = useState<LanguagesData>(() => {
    // Initialize with all languages set to false
    const initialState: LanguagesData = {};
    LANGUAGES.forEach(lang => {
      initialState[lang] = false;
    });
    // Set English to true by default
    initialState['English'] = true;
    return initialState;
  });

  // Load saved languages data on mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const savedData = await AsyncStorage.getItem('languages');
        if (savedData) {
          const parsedData = JSON.parse(savedData) as LanguagesData;
          setLanguages(parsedData);
        }
      } catch (error) {
        console.log('Error loading languages data:', error);
      }
    };
    
    loadLanguages();
  }, []);

  // Handle toggle change with haptic feedback
  const handleToggleChange = (language: string, value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLanguages(prev => ({
      ...prev,
      [language]: value
    }));
  };

  // Handle saving and returning to the profile
  const handleSave = async () => {
    try {
      // Save languages data to AsyncStorage
      await AsyncStorage.setItem('languages', JSON.stringify(languages));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Navigate back to the appropriate screen
      router.back();
    } catch (error) {
      console.log('Error saving languages data:', error);
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
        <Text style={styles.headerTitle}>Languages</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      {/* Subtitle */}
      <View style={styles.subtitleContainer}>
        <Ionicons name="globe-outline" size={16} color="rgba(255, 255, 255, 0.48)" />
        <Text style={styles.subtitle}>Add all the languages you speak</Text>
      </View>
      
      {/* Languages Options */}
      <ScrollView style={styles.content}>
        {LANGUAGES.map((language, index) => (
          <React.Fragment key={language}>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>{language}</Text>
              <Switch
                value={languages[language]}
                onValueChange={(value) => handleToggleChange(language, value)}
                trackColor={{ false: 'rgba(255, 255, 255, 0.08)', true: '#FF3B30' }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor="rgba(255, 255, 255, 0.08)"
                style={Platform.OS === 'ios' ? styles.iosSwitch : styles.androidSwitch}
              />
            </View>
            {index < LANGUAGES.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
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
