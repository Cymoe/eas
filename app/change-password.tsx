import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    digit: false
  });
  
  // Check password requirements when new password changes
  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    
    // Validate password requirements
    setPasswordValid({
      length: text.length >= 8,
      uppercase: /[A-Z]/.test(text),
      digit: /\d/.test(text)
    });
    
    // Check if passwords match
    if (confirmPassword) {
      setPasswordsMatch(text === confirmPassword);
    }
  };
  
  // Check if passwords match when confirm password changes
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(text === newPassword);
  };
  
  const handleGeneratePassword = () => {
    // Generate a random password that meets all requirements
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    
    // Ensure at least one uppercase letter
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    
    // Ensure at least one digit
    password += '0123456789'[Math.floor(Math.random() * 10)];
    
    // Add random characters to reach minimum length
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Shuffle the password characters
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    setNewPassword(password);
    setConfirmPassword(password);
    
    // Update validation states
    setPasswordValid({
      length: true,
      uppercase: true,
      digit: true
    });
    setPasswordsMatch(true);
  };
  
  const handleContinue = () => {
    // Check if all validations pass
    if (currentPassword && 
        passwordValid.length && 
        passwordValid.uppercase && 
        passwordValid.digit && 
        passwordsMatch) {
      // In a real app, you would call an API to update the password
      console.log('Password updated successfully');
      router.back();
    } else {
      // Show error message or highlight invalid fields
      console.log('Please fix validation errors');
    }
  };
  
  const handleTOSPress = () => {
    // In a real app, navigate to Terms of Service page
    console.log('Navigate to Terms of Service');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Changing my Password</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Current Password */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>CURRENT PASSWORD</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="********"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Ionicons 
                name={showCurrentPassword ? "eye-off" : "eye"} 
                size={24} 
                color="rgba(255, 255, 255, 0.5)" 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            <Ionicons name="information-circle-outline" size={14} color="rgba(255, 255, 255, 0.48)" /> The password you use to log in to your account.
          </Text>
        </View>
        
        {/* New Password */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>NEW PASSWORD</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              placeholder="********"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Ionicons 
                name={showNewPassword ? "eye-off" : "eye"} 
                size={24} 
                color="rgba(255, 255, 255, 0.5)" 
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.generatePasswordButton}
            onPress={handleGeneratePassword}
          >
            <Text style={styles.generatePasswordText}>Generate a password for me</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={[
              styles.requirementText, 
              passwordValid.length ? styles.validRequirement : styles.invalidRequirement
            ]}>
              <Ionicons 
                name="information-circle-outline" 
                size={14} 
                color={passwordValid.length ? "rgba(255, 255, 255, 0.48)" : "rgba(255, 255, 255, 0.48)"} 
              /> Minimum 8 characters.
            </Text>
            
            <Text style={[
              styles.requirementText, 
              passwordValid.uppercase ? styles.validRequirement : styles.invalidRequirement
            ]}>
              <Ionicons 
                name="information-circle-outline" 
                size={14} 
                color={passwordValid.uppercase ? "rgba(255, 255, 255, 0.48)" : "rgba(255, 255, 255, 0.48)"} 
              /> Minimum 1 uppercase.
            </Text>
            
            <Text style={[
              styles.requirementText, 
              passwordValid.digit ? styles.validRequirement : styles.invalidRequirement
            ]}>
              <Ionicons 
                name="information-circle-outline" 
                size={14} 
                color={passwordValid.digit ? "rgba(255, 255, 255, 0.48)" : "rgba(255, 255, 255, 0.48)"} 
              /> Minimum 1 digit.
            </Text>
          </View>
        </View>
        
        {/* Confirm New Password */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>CONFIRM NEW PASSWORD</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="********"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-off" : "eye"} 
                size={24} 
                color="rgba(255, 255, 255, 0.5)" 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={[
            styles.helperText,
            !passwordsMatch && confirmPassword ? styles.errorText : {}
          ]}>
            <Ionicons 
              name="information-circle-outline" 
              size={14} 
              color={!passwordsMatch && confirmPassword ? "#F41857" : "rgba(255, 255, 255, 0.48)"} 
            /> {passwordsMatch ? "Password matching" : "Passwords don't match"}
          </Text>
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <Text style={styles.tosText}>
          <Ionicons name="information-circle-outline" size={14} color="rgba(255, 255, 255, 0.48)" /> By pressing "
          <Text style={styles.boldText}>Continue</Text>
          " you agree with 
          <Text style={styles.linkText} onPress={handleTOSPress}> BandMate TOS</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
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
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.48)',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  helperText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  generatePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  generatePasswordText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
  requirementsContainer: {
    marginTop: 8,
  },
  requirementText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginBottom: 4,
  },
  validRequirement: {
    color: 'rgba(255, 255, 255, 0.48)',
  },
  invalidRequirement: {
    color: 'rgba(255, 255, 255, 0.48)',
  },
  errorText: {
    color: '#F41857',
  },
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
  },
  continueButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 9999,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  linkText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});
