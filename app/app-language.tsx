import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTranslation } from '../hooks/useTranslation';
import { Colors } from '../constants/Colors';
import { spacing } from '../constants/Spacing';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

export default function AppLanguageScreen() {
  const { language, setLanguage, t } = useTranslation();

  const handleSelectLanguage = async (code: string) => {
    await Haptics.selectionAsync();
    setLanguage(code);
    setTimeout(() => router.back(), 300);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingTop: spacing.xl + (Platform.OS === 'ios' ? 44 : 0),
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
      }}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.withOpacity(Colors.white, 0.08),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={{ 
          marginLeft: spacing.md,
          fontSize: 24,
          fontWeight: '500',
          color: Colors.white,
        }}>
          {t('profile.language')}
        </Text>
      </View>

      {/* Subtitle */}
      <Text style={{ 
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        fontSize: 16,
        color: Colors.withOpacity(Colors.white, 0.48),
      }}>
        {t('profile.selectLanguage')}
      </Text>

      {/* Language List */}
      <ScrollView style={{ flex: 1 }}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => handleSelectLanguage(lang.code)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              backgroundColor: Colors.black,
            }}
          >
            <Text style={{ fontSize: 24, marginRight: spacing.md }}>{lang.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 16,
                fontWeight: '500',
                color: Colors.white,
                marginBottom: 2,
              }}>
                {lang.name}
              </Text>
              <Text style={{ 
                fontSize: 14,
                color: Colors.withOpacity(Colors.white, 0.48),
              }}>
                {lang.nativeName}
              </Text>
            </View>
            {language === lang.code && (
              <Ionicons 
                name="checkmark-circle" 
                size={24} 
                color={Colors.accent}
                style={{ marginLeft: spacing.md }}
              />
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
