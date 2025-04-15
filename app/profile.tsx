import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Switch, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CloseAccountModal from '../components/CloseAccountModal';
import HelpImproveModal from '../components/HelpImproveModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Language type and languages array
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'zh-CN', name: 'Mandarin Chinese', nativeName: '普通话 / 汉语', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  // ... other languages
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  
  // State for toggles
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [closeAccountModalVisible, setCloseAccountModalVisible] = useState(false);
  const [helpImproveModalVisible, setHelpImproveModalVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English (US)');

  // Load app language on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('appLanguage');
        if (savedLanguage) {
          // Find the language name from the code
          const language = languages.find(l => l.code === savedLanguage);
          if (language) {
            setCurrentLanguage(language.name);
          }
        }
      } catch (error) {
        console.log('Error loading app language:', error);
      }
    };
    
    loadLanguage();
  }, []);

  const handleCloseAccount = () => {
    // Logic to close the account would go here
    setCloseAccountModalVisible(false);
    // Optionally navigate to a confirmation screen or show a success message
  };

  return (
    <LinearGradient
      colors={['#141416', '#000000']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>My Profile</Text>
              <View style={styles.subtitleContainer}>
                <Ionicons name="settings-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
                <Text style={styles.subtitle}>Manage your preferences</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="#F8F9FB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.userInfoContainer}>
            <Ionicons name="person" size={40} color="#F8F9FB" />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Hi Viktor</Text>
              <Text style={styles.userEmail}>viktor@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.premiumBanner}>
            <Text style={styles.premiumText}>Discover all offers</Text>
            <View style={styles.learnButton}>
              <Text style={styles.learnButtonText}>Learn more</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bonuses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bonuses</Text>
          <View style={styles.bonusesContainer}>
            <TouchableOpacity 
              style={styles.bonusCard}
              onPress={() => router.push('/super-likes')}
            >
              <Ionicons name="star" size={24} color="#007BFF" />
              <Text style={styles.bonusTitle}>Super Likes</Text>
              <Text style={styles.bonusPrice}>$2/each</Text>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.bonusCard}
              onPress={() => router.push('/boosts')}
            >
              <Ionicons name="flash" size={24} color="#575093" />
              <Text style={styles.bonusTitle}>Boosts</Text>
              <Text style={styles.bonusPrice}>$5/each</Text>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.bonusCard}
              onPress={() => router.push('/rewinds')}
            >
              <Ionicons name="play-back" size={24} color="#F8F9FB" />
              <Text style={styles.bonusTitle}>Rewinds</Text>
              <Text style={styles.bonusPrice}>$1/each</Text>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bonusCard, styles.subscriptionCard]} onPress={() => router.push('/subscription')}>
              <Text style={[styles.bonusTitle, styles.subscriptionTitle]}>Subscription plans</Text>
              <Text style={[styles.bonusPrice, styles.subscriptionPrice]}>$10/month</Text>
              <Ionicons name="chevron-forward" size={24} color="#A19375" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity 
              style={styles.settingCard}
              onPress={() => router.push('/analytics')}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="analytics" size={24} color="#A19375" />
                <View>
                  <Text style={styles.settingTitle}>Analytics</Text>
                  <Text style={styles.settingSubtitle}>Only with Platinum</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <Ionicons name="card" size={24} color="#A19375" />
                <Text style={styles.settingTitle}>Payment method</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingCard}
              onPress={() => router.push('/notification-settings')}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="notifications" size={24} color="#A19375" />
                <Text style={styles.settingTitle}>Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingCard}
              onPress={() => router.push('/change-password')}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="key" size={24} color="#A19375" />
                <Text style={styles.settingTitle}>Change my password</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <View style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <Ionicons name="shield" size={24} color="#A19375" />
                <Text style={styles.settingTitle}>Two factors authentication</Text>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{ false: '#828186', true: '#A19375' }}
                thumbColor={twoFactorEnabled ? '#141416' : '#F8F9FB'}
              />
            </View>
          </View>
        </View>

        {/* Help Us Improve Section */}
        <View style={styles.helpImproveSection}>
          <View style={styles.helpImproveContainer}>
            <Text style={styles.helpImproveText}>Help us improve BM</Text>
            <TouchableOpacity 
              style={styles.startNowButton}
              onPress={() => setHelpImproveModalVisible(true)}
            >
              <Text style={styles.startNowText}>Start now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsContainer}>
            <View style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon" size={24} color="#A19375" />
                <Text style={styles.settingTitle}>Dark mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: '#828186', true: '#A19375' }}
                thumbColor={isDarkMode ? '#141416' : '#F8F9FB'}
              />
            </View>

            <View style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <Ionicons name="close" size={24} color="#A19375" />
                <Text style={styles.settingTitle}>Mark as unavailable</Text>
              </View>
              <Switch
                value={isUnavailable}
                onValueChange={setIsUnavailable}
                trackColor={{ false: '#828186', true: '#A19375' }}
                thumbColor={isUnavailable ? '#141416' : '#F8F9FB'}
              />
            </View>

            <View style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <View>
                  <Text style={styles.settingTitle}>Only see verified profiles</Text>
                  <Text style={styles.settingSubtitle}>Only with Platinum</Text>
                </View>
              </View>
              <Switch
                value={showVerifiedOnly}
                onValueChange={setShowVerifiedOnly}
                trackColor={{ false: '#828186', true: '#A19375' }}
                thumbColor={showVerifiedOnly ? '#141416' : '#F8F9FB'}
                disabled={true}
              />
            </View>

            <View style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <View>
                  <Text style={styles.settingTitle}>Only show the ones I liked</Text>
                  <Text style={styles.settingSubtitle}>Only with Platinum</Text>
                </View>
              </View>
              <Switch
                value={showLikedOnly}
                onValueChange={setShowLikedOnly}
                trackColor={{ false: '#828186', true: '#A19375' }}
                thumbColor={showLikedOnly ? '#141416' : '#F8F9FB'}
                disabled={true}
              />
            </View>

            <TouchableOpacity 
              style={styles.settingCard}
              onPress={() => router.push('/app-language')}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="language" size={24} color="#A19375" />
                <View>
                  <Text style={styles.settingTitle}>App language</Text>
                  <Text style={styles.settingSubtitle}>{currentLanguage}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <View style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <Ionicons name="refresh" size={24} color="#A19375" />
                <Text style={styles.settingTitle}>Automatic updates</Text>
              </View>
              <Switch
                value={autoUpdates}
                onValueChange={setAutoUpdates}
                trackColor={{ false: '#828186', true: '#A19375' }}
                thumbColor={autoUpdates ? '#141416' : '#F8F9FB'}
              />
            </View>
          </View>
        </View>

        {/* Community Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity style={styles.socialCard}>
              <View style={styles.settingLeft}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                </View>
                <Text style={styles.settingTitle}>Follow us on X</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialCard}>
              <View style={styles.settingLeft}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                </View>
                <Text style={styles.settingTitle}>Follow us on Facebook</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialCard}>
              <View style={styles.settingLeft}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-instagram" size={24} color="#E1306C" />
                </View>
                <Text style={styles.settingTitle}>Follow us on Instagram</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialCard}>
              <View style={styles.settingLeft}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={24} color="#A19375" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Rate this app</Text>
                  <Text style={styles.settingSubtitle}>4.9 rating on the Play Store & App Store</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.socialCard}
              onPress={() => setHelpImproveModalVisible(true)}
            >
              <View style={styles.settingLeft}>
                <View style={styles.feedbackContainer}>
                  <Ionicons name="chatbubble-ellipses" size={24} color="#A19375" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Help us improve</Text>
                  <Text style={styles.settingSubtitle}>Share your feedback and suggestions</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeAccountButton}
              onPress={() => setCloseAccountModalVisible(true)}
            >
              <Ionicons name="trash-outline" size={24} color="#F8F9FB" />
              <Text style={styles.closeAccountText}>Close my account</Text>
            </TouchableOpacity>
          </View>

          {/* Copyright Text */}
          <Text style={styles.copyrightText}>
            2025 Sola Group. All rights reserved. Sola Group, SG, the Sola Group logo, BandMate, BandMate (stylized), BM, BM logo are trademarks or registered of Sola Group in the USA and elsewhere.{'\n'}All other trademarks are the property of their respective owners.
          </Text>
        </View>
      </ScrollView>
      
      {/* Close Account Modal */}
      <CloseAccountModal
        visible={closeAccountModalVisible}
        onClose={() => setCloseAccountModalVisible(false)}
        onCloseAccount={handleCloseAccount}
      />
      
      {/* Help Improve Modal */}
      <HelpImproveModal
        visible={helpImproveModalVisible}
        onClose={() => setHelpImproveModalVisible(false)}
        userEmail="viktor@gmail.com"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  scrollView: {
    paddingHorizontal: 12,
    paddingTop: 56,
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 32,
    lineHeight: 43,
    color: '#FFFFFF',
    letterSpacing: -0.96,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.42,
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 20,
    color: '#F8F9FB',
    marginBottom: 24,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#828186',
  },
  editProfile: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#A19375',
    marginBottom: 12,
  },
  premiumBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#A19375',
    borderRadius: 100,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
  },
  premiumText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
  },
  learnButton: {
    backgroundColor: '#141416',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  learnButtonText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  bonusesContainer: {
    gap: 8,
  },
  bonusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#262626',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  bonusTitle: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
  },
  bonusPrice: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  subscriptionCard: {
    borderColor: '#A19375',
  },
  subscriptionTitle: {
    color: '#A19375',
  },
  subscriptionPrice: {
    color: '#A19375',
  },
  settingsContainer: {
    gap: 8,
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#262626',
    paddingVertical: 0,
    paddingHorizontal: 12,
    height: 48,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
  },
  settingSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#828186',
  },
  helpImproveSection: {
    marginVertical: 16,
  },
  helpImproveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 38, 38, 0.5)',
    borderRadius: 12,
    padding: 16,
  },
  helpImproveText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
  },
  startNowButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  startNowText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  helpBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#262626',
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    marginBottom: 32,
  },
  helpText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  startButton: {
    backgroundColor: '#F8F9FB',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  startButtonText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#141416',
  },
  socialCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EBEAEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 12,
    height: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#262626',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(161, 147, 117, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  feedbackContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(161, 147, 117, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionButtons: {
    gap: 8,
    marginTop: 24,
  },
  logoutButton: {
    backgroundColor: '#F8F9FB',
    borderRadius: 100,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
    letterSpacing: -0.32,
  },
  closeAccountButton: {
    flexDirection: 'row',
    backgroundColor: '#EE1045',
    borderRadius: 100,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  closeAccountText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F9FB',
    letterSpacing: -0.32,
  },
  copyrightText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
    marginTop: 24,
  },
});