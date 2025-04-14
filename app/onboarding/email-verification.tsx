import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EmailVerificationScreen() {
  const [isSent, setIsSent] = useState(true);

  const handleContinue = () => {
    router.push('/onboarding/create-password');
  };

  const handleBack = () => {
    router.back();
  };

  const handleResend = () => {
    // Simulate resending verification code
    setIsSent(true);
    // In a real app, you would call an API to resend the verification code
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Registration</Text>
            <Text style={styles.headerStep}>2/8</Text>
          </View>
          <Text style={styles.headerSubtitle}>Email verification</Text>
        </View>
        <Pressable style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground} />
        <View style={styles.progressBarFill} />
      </View>
      
      {/* Main content */}
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Please verify your email</Text>
        </View>
        
        <View style={styles.verificationContainer}>
          <View style={styles.verificationBox}>
            <Text style={styles.verificationText}>We've sent a verification code to your email</Text>
            <View style={styles.checkIconContainer}>
              <Ionicons name="checkmark" size={16} color="#6BFF90" />
            </View>
          </View>
          
          <View style={styles.helperTextContainer}>
            <View style={styles.helperTextRow}>
              <Ionicons name="checkmark-circle-outline" size={12} color="#6BFF90" />
              <Text style={styles.helperText}>Verification code sent</Text>
            </View>
          </View>
        </View>
        
        <Pressable style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendButtonText}>Resend code</Text>
        </Pressable>
      </View>
      
      {/* Bottom footer */}
      <View style={styles.footerContainer}>
        <View style={styles.buttonRow}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={27} color="#FFFFFF" />
          </Pressable>
          
          <Pressable 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </View>
        
        <View style={styles.tosContainer}>
          <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
          <Text style={styles.tosText}>
            By pressing "<Text style={styles.tosHighlight}>Continue</Text>" you agree with <Text style={styles.tosHighlight}>BandMate TOS</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
    zIndex: 2,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12,
  },
  headerRow: {
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
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  progressBarBackground: {
    position: 'absolute',
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressBarFill: {
    position: 'absolute',
    width: '25%', // 2/8 of the progress
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  mainContent: {
    flex: 1,
    paddingTop: 152,
    paddingHorizontal: 12,
    gap: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
  },
  verificationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 8,
  },
  verificationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 12,
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
  },
  verificationText: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    letterSpacing: -0.03 * 16,
    flex: 1,
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 12,
  },
  helperTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helperText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(107, 255, 144, 0.64)',
    letterSpacing: -0.03 * 12,
    flex: 1,
  },
  resendButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  resendButtonText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#FF4B4B',
    textDecorationLine: 'underline',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingBottom: 34,
    paddingHorizontal: 12,
    gap: 12,
    backgroundColor: 'rgba(18, 18, 18, 0)',
    backdropFilter: 'blur(16px)',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    gap: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: '#FF4B4B',
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
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
    letterSpacing: -0.03 * 12,
  },
  tosHighlight: {
    color: 'rgba(255, 255, 255, 0.48)',
  },
});
