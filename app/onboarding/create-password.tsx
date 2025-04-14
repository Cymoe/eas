import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
// Import our mock AsyncStorage instead of the real one
import AsyncStorage from '../../utils/mockAsyncStorage';

export default function CreatePasswordScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  // Password requirements
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);

  // First useEffect to update individual requirements
  useEffect(() => {
    setHasMinLength(password.length >= 8);
    setHasUppercase(/[A-Z]/.test(password));
    setHasDigit(/\d/.test(password));
    
    // For development, allow any password with at least 1 character
    setIsValid(password.length > 0);
  }, [password]);

  const handleContinue = async () => {
    try {
      // Store the password in AsyncStorage
      await AsyncStorage.setItem('tempPassword', password);
      // Navigate to confirm password screen
      router.push('/onboarding/confirm-password');
    } catch (error) {
      console.error('Error saving password:', error);
    }
  };

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    
    // Ensure we have at least one uppercase and one digit
    newPassword += "A"; // Add one uppercase
    newPassword += "1"; // Add one digit
    
    // Fill the rest with random characters
    for (let i = 0; i < length - 2; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    
    setPassword(newPassword);
  };

  const goBack = () => {
    router.back();
  };

  return (
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
            <View style={styles.progressIndicator} />
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Create a password</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            placeholderTextColor="rgba(255, 255, 255, 0.48)"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={24} 
              color="rgba(255, 255, 255, 0.48)" 
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.generatePasswordRow} onPress={generatePassword}>
          <Text style={styles.generatePasswordText}>Generate a password for me</Text>
          <Ionicons name="arrow-forward-outline" size={12} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <View style={styles.requirementsContainer}>
          <View style={styles.requirementRow}>
            <View style={styles.checkCircle}>
              <Ionicons 
                name={hasMinLength ? "checkmark" : "ellipse"} 
                size={12} 
                color="rgba(255, 255, 255, 0.64)" 
              />
            </View>
            <Text style={styles.requirementText}>Minimum 8 characters.</Text>
          </View>
          
          <View style={styles.requirementRow}>
            <View style={styles.checkCircle}>
              <Ionicons 
                name={hasUppercase ? "checkmark" : "ellipse"} 
                size={12} 
                color="rgba(255, 255, 255, 0.64)" 
              />
            </View>
            <Text style={styles.requirementText}>Minimum 1 uppercase</Text>
          </View>
          
          <View style={styles.requirementRow}>
            <View style={styles.checkCircle}>
              <Ionicons 
                name={hasDigit ? "checkmark" : "ellipse"} 
                size={12} 
                color="rgba(255, 255, 255, 0.64)" 
              />
            </View>
            <Text style={styles.requirementText}>Minimum 1 digit</Text>
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
        
        <View style={styles.termsRow}>
          <Ionicons name="ellipse" size={12} color="rgba(255, 255, 255, 0.48)" />
          <Text style={styles.termsText}>
            By pressing "Continue" you agree with <Text style={styles.tosText}>BandMate TOS</Text>.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    width: '100%',
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.64)',
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
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressIndicator: {
    width: '12.5%', // 1/8 of the progress (first screen)
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: 'rgba(255, 255, 255, 0.48)',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: -0.03 * 16,
  },
  generatePasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 12,
    marginBottom: 12,
  },
  generatePasswordText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    letterSpacing: -0.03 * 12,
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    marginBottom: 12,
  },
  requirementsContainer: {
    marginTop: 6,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 12,
    marginBottom: 6,
  },
  checkCircle: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  requirementText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03 * 12,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 34,
    backdropFilter: 'blur(16px)',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  continueButton: {
    flex: 1,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: '#FF4B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17.1429,
    lineHeight: 19,
    color: '#121212',
    textAlign: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 12,
  },
  termsText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
    letterSpacing: -0.03 * 12,
    marginLeft: 4,
  },
  tosText: {
    color: 'rgba(255, 255, 255, 0.48)',
  },
});
