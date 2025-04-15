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

// List of available languages with native names
const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'zh', name: 'Mandarin Chinese', native: '普通话 / 汉语' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'ar', name: 'Standard Arabic', native: 'العربية' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ur', name: 'Urdu', native: 'اُردُو' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'pa_west', name: 'Western Punjabi', native: 'پنجابی' },
  { code: 'wuu', name: 'Wu Chinese', native: '吴语' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'yue', name: 'Cantonese', native: '粤语 / 廣東話' },
  { code: 'jv', name: 'Javanese', native: 'ꦧꦱꦗꦮ' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'arz', name: 'Egyptian Arabic', native: 'العامية المصرية' },
  { code: 'ha', name: 'Hausa', native: 'Harshen Hausa' },
  { code: 'th', name: 'Thai', native: 'ภาษาไทย' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी' },
  { code: 'nan', name: 'Southern Min', native: '闽南语' },
  { code: 'hak', name: 'Hakka', native: '客家话' },
  { code: 'cjy', name: 'Jinyu', native: '晋语' },
  { code: 'fil', name: 'Filipino', native: 'Wikang Filipino' },
  { code: 'my', name: 'Burmese', native: 'မြန်မာဘာသာ' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'hsn', name: 'Xiang Chinese', native: '湘语' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ary', name: 'Moroccan Arabic', native: 'الدارجة' },
  { code: 'pa_east', name: 'Eastern Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda' },
  { code: 'arq', name: 'Algerian Arabic', native: 'الدارجة الجزائرية' },
  { code: 'apd', name: 'Sudanese Arabic', native: 'اللهجة السودانية' },
  { code: 'pcm', name: 'Nigerian Pidgin', native: 'Naija / Pidgin' },
  { code: 'sq', name: 'Albanian', native: 'shqip' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
  { code: 'eu', name: 'Basque', native: 'Euskara' },
  { code: 'be', name: 'Belarusian', native: 'беларуская' },
  { code: 'bs', name: 'Bosnian', native: 'bosanski jezik' },
  { code: 'br', name: 'Breton', native: 'brezhoneg' },
  { code: 'bg', name: 'Bulgarian', native: 'български' },
  { code: 'ca', name: 'Catalan', native: 'català' },
  { code: 'co', name: 'Corsican', native: 'corsu' },
  { code: 'hr', name: 'Croatian', native: 'hrvatski jezik' },
  { code: 'cs', name: 'Czech', native: 'čeština' },
  { code: 'da', name: 'Danish', native: 'dansk' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'et', name: 'Estonian', native: 'eesti keel' },
  { code: 'fo', name: 'Faroese', native: 'føroyskt' },
  { code: 'fi', name: 'Finnish', native: 'suomi' },
  { code: 'fy', name: 'Frisian', native: 'Frysk' },
  { code: 'gl', name: 'Galician', native: 'galego' },
  { code: 'ka', name: 'Georgian', native: 'ქართული' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'hu', name: 'Hungarian', native: 'magyar' },
  { code: 'is', name: 'Icelandic', native: 'íslenska' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'lv', name: 'Latvian', native: 'latviešu valoda' },
  { code: 'lt', name: 'Lithuanian', native: 'lietuvių kalba' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
  { code: 'mk', name: 'Macedonian', native: 'македонски' },
  { code: 'mt', name: 'Maltese', native: 'Malti' },
  { code: 'gv', name: 'Manx', native: 'Gaelg' },
  { code: 'no', name: 'Norwegian', native: 'norsk' },
  { code: 'oc', name: 'Occitan', native: 'occitan' },
  { code: 'rm', name: 'Romani', native: 'romani' },
  { code: 'se', name: 'Sami', native: 'Sámegiella' },
  { code: 'gd', name: 'Scottish Gaelic', native: 'Gàidhlig' },
  { code: 'sr', name: 'Serbian', native: 'српски језик' },
  { code: 'sk', name: 'Slovak', native: 'slovenčina' },
  { code: 'sl', name: 'Slovenian', native: 'slovenščina' },
  { code: 'sv', name: 'Swedish', native: 'svenska' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש' }
];

// Update the LanguagesData type to use language codes
type LanguagesData = {
  [code: string]: boolean;
};

export default function LanguagesScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();
  
  // State for the languages toggles
  const [languages, setLanguages] = useState<LanguagesData>(() => {
    // Initialize with all languages set to false
    const initialState: LanguagesData = {};
    LANGUAGES.forEach(lang => {
      initialState[lang.code] = false;
    });
    // Set English to true by default
    initialState['en'] = true;
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
          <React.Fragment key={language.code}>
            <View style={styles.optionRow}>
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.nativeName}>{language.native}</Text>
              </View>
              <Switch
                value={languages[language.code]}
                onValueChange={(value) => handleToggleChange(language.code, value)}
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
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  nativeName: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginTop: 2,
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
