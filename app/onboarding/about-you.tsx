import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AboutYouScreen() {
  const [aboutText, setAboutText] = useState('');
  const maxCharacters = 150;

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      if (aboutText.trim().length > 0) {
        await AsyncStorage.setItem('userAbout', aboutText);
      }
      router.push('/onboarding/notifications'); // Navigate to the notifications screen
    } catch (error) {
      console.error('Error saving about text:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="light" />
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerTextContainer}>
                <View style={styles.headerTitleRow}>
                  <Text style={styles.headerTitle}>Registration</Text>
                  <Text style={styles.stepIndicator}>1/8</Text>
                </View>
                <Text style={styles.headerSubtitle}>Email</Text>
              </View>
              <View style={styles.infoButton}>
                <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressIndicator, { width: '25%' }]} />
              </View>
            </View>
          </View>
          
          {/* Main Content */}
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Tell us more about you</Text>
                <Text style={styles.subtitle}>Tell others about yourself (optional)</Text>
              </View>
              
              <View style={styles.aboutContainer}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="E.g. We are a rock n roll band fans of the 80's era..."
                    placeholderTextColor="rgba(255, 255, 255, 0.48)"
                    multiline={true}
                    value={aboutText}
                    onChangeText={setAboutText}
                    maxLength={maxCharacters}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="information-circle-outline" size={12} color="#828282" />
                  <Text style={styles.infoText}>
                    Maximum {aboutText.length}/{maxCharacters} characters.
                  </Text>
                </View>
              </View>
              
              {/* Add extra space at the bottom to ensure content is visible above the keyboard */}
              <View style={styles.keyboardSpacer} />
            </View>
          </ScrollView>
          
          {/* Footer */}
          <LinearGradient
            colors={['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 0.16)']}
            style={styles.footer}
          >
            <View style={styles.footerContent}>
              <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Ionicons name="chevron-back" size={27} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  styles.continueButtonActive
                ]}
                onPress={handleContinue}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.tosContainer}>
              <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
              <Text style={styles.tosText}>By pressing "Continue" you agree with BandMate TOS.</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
    zIndex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    lineHeight: 22,
  },
  infoButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressIndicator: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 150, // Extra padding to ensure content is visible above keyboard
  },
  content: {
    flex: 1,
    paddingTop: 136,
    paddingHorizontal: 12,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  titleContainer: {
    width: '100%',
    gap: 12,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
    width: '100%',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
    width: '100%',
  },
  aboutContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  textInputContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    minHeight: 104,
  },
  textInput: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    letterSpacing: -0.03,
    textAlignVertical: 'top',
    height: 80,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  infoText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
  },
  keyboardSpacer: {
    height: 100, // Extra space to push content up when keyboard is visible
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 34,
    gap: 12,
    zIndex: 2,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#FF4B4B',
  },
  continueText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 19,
    color: '#121212',
    textAlign: 'center',
  },
  tosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.03,
    textAlign: 'center',
  },
});
