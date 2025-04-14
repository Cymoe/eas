import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export default function AppLanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  
  const languages: Language[] = [
    { code: 'sq', name: 'Albanian', nativeName: 'Shqiptar', flag: '🇦🇱' },
    { code: 'zh-CN', name: 'Mandarin Chinese', nativeName: '中文 (Zhōngwén)', flag: '🇨🇳' },
    { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা (Bangla)', flag: '🇧🇩' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский (Russkiy)', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語 (Nihongo)', flag: '🇯🇵' },
    { code: 'ar', name: 'Standard Arabic', nativeName: 'اللغة العربية (Al-ʿArabīyah)', flag: '🇸🇦' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'ko', name: 'Korean', nativeName: '한국어 (Hangug-eo)', flag: '🇰🇷' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी (Marāṭhī)', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
    { code: 'sr', name: 'Serbian', nativeName: 'Српски (Srpski)', flag: '🇷🇸' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  ];

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguage(code);
    // In a real app, you would save this preference to AsyncStorage or a backend
    // Then navigate back
    setTimeout(() => router.back(), 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Language</Text>
        <View style={styles.placeholder} />
      </View>
      
      <Text style={styles.subtitle}>
        <Ionicons name="information-circle-outline" size={14} color="rgba(255, 255, 255, 0.48)" /> Select your preferred app language.
      </Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageItem}
            onPress={() => handleSelectLanguage(language.code)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.flagEmoji}>{language.flag}</Text>
              <View style={styles.languageTextContainer}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.nativeName}>{language.nativeName}</Text>
              </View>
            </View>
            
            {selectedLanguage === language.code ? (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#FF3B30" />
              </View>
            ) : (
              <View style={styles.unselectedIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
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
  },
  placeholder: {
    width: 40,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  languageTextContainer: {
    flexDirection: 'column',
  },
  languageName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
  },
  nativeName: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
  },
});
