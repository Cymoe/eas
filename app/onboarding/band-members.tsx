import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BandMembersScreen() {
  const [memberCount, setMemberCount] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleMemberCountChange = (text: string) => {
    setMemberCount(text);
    // Simple validation to check if the input is a number
    const numericValue = parseInt(text);
    setIsValid(!isNaN(numericValue) && numericValue > 0);
  };

  const handleContinue = async () => {
    Keyboard.dismiss();
    if (isValid) {
      try {
        // Store the band member count
        await AsyncStorage.setItem('bandMemberCount', memberCount);
        // Navigate to the age range screen
        router.push('/onboarding/age-range' as any);
      } catch (error) {
        console.error('Error saving band member count:', error);
      }
    }
  };

  const goBack = () => {
    Keyboard.dismiss();
    router.back();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <View style={styles.headerTitleRow}>
                <Text style={styles.headerTitle}>Registration</Text>
                <Text style={styles.stepIndicator}>6/8</Text>
              </View>
              <Text style={styles.headerSubtitle}>Band Details</Text>
            </View>
            <View style={styles.infoButton}>
              <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressIndicator, { width: '75%' }]} />
            </View>
          </View>
        </View>
        
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>How many band members do you have?</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E.g. 2 members"
              placeholderTextColor="rgba(255, 255, 255, 0.48)"
              value={memberCount}
              onChangeText={handleMemberCountChange}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
              blurOnSubmit={true}
            />
            
            <View style={styles.warningContainer}>
              <Ionicons name="information-circle-outline" size={12} color="#828282" />
              <Text style={styles.warningText}>
                Please only mention fixed members.
              </Text>
            </View>
          </View>
        </View>
        
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
              style={[styles.continueButton, !isValid && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!isValid}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tosContainer}>
            <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
            <Text style={styles.tosText}>
              By pressing "Continue" you agree with <Text style={styles.tosHighlight}>BandMate TOS</Text>.
            </Text>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    marginTop: 4,
  },
  infoButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
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
  content: {
    flex: 1,
    paddingTop: 136,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  inputContainer: {
    width: '100%',
    gap: 8,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  warningText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.64)',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 34,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
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
    backgroundColor: '#FF4B4B',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  continueButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    color: '#121212',
  },
  tosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
  },
  tosHighlight: {
    color: '#FFFFFF',
  },
});
