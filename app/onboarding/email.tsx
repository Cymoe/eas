import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const EmailRegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (text: string) => {
    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValid(emailRegex.test(text));
    setEmail(text);
  };

  const handleContinue = () => {
    if (isValid && email) {
      router.push('/onboarding/email-verification');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Registration</Text>
            <Text style={styles.headerStep}>1/8</Text>
          </View>
          <Text style={styles.headerSubtitle}>Email</Text>
        </View>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground} />
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>What's your email?</Text>
          
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="E.g. abc@email.com"
              placeholderTextColor="rgba(255, 255, 255, 0.48)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={validateEmail}
            />
          </View>
          
          <View style={styles.helperTextContainer}>
            <Ionicons 
              name="information-outline" 
              size={12} 
              color="rgba(255, 255, 255, 0.48)" 
            />
            <Text style={styles.helperText}>
              {isValid ? 'Please enter a valid email address.' : 'Please enter a valid email address.'}
            </Text>
          </View>
          
          <View style={styles.helperTextContainer}>
            <Ionicons 
              name="information-outline" 
              size={12} 
              color="rgba(255, 255, 255, 0.48)" 
            />
            <Text style={styles.helperText}>
              We will later use this email to verify your account.
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backIconButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
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
          <Ionicons 
            name="information-outline" 
            size={12} 
            color="rgba(255, 255, 255, 0.48)" 
          />
          <Text style={styles.tosText}>
            By pressing "Continue" you agree with BandMate TOS.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  
  // Header Styles
  header: {
    width: '100%',
    height: 120,
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    zIndex: 2,
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  headerStep: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 12,
    top: 48,
  },
  progressContainer: {
    width: '100%',
    height: 4,
    marginTop: 12,
  },
  progressBackground: {
    position: 'absolute',
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressFill: {
    position: 'absolute',
    width: '25%', // For 1/8 completion
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  
  // Main Content Styles
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  inputLabel: {
    width: '100%',
    fontFamily: 'Abril Fatface',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
  },
  textInputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 8,
  },
  textInput: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 12,
    gap: 4,
  },
  helperText: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.03 * 12, // -0.03em
  },
  
  // Footer Styles
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 34,
    gap: 12,
    backgroundColor: 'rgba(18, 18, 18, 0)',
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    gap: 8,
  },
  backIconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
  },
  continueButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#FF3B30',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 17.1429,
    lineHeight: 19,
    color: '#121212',
    textAlign: 'center',
  },
  tosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 12,
    gap: 4,
  },
  tosText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.03 * 12, // -0.03em
  },
  continueButtonDisabled: {
    opacity: 0.48,
  },
});

export default EmailRegistrationScreen;