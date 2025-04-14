import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { router, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// WindSurf Design System Constants
const windsurf = {
  colors: {
    // Primary Colors
    accent: '#FF3B30',
    white: '#FFFFFF',
    night: '#121212',
    redFlag: '#F41857',
    greenFlag: '#6BFF90',
    orangeFlag: '#FFA726',
    
    // Opacity Functions
    withOpacity: (color: string, opacity: number) => {
      // Convert hex to rgba
      let r, g, b;
      if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return color;
    },
    
    // Opacity Levels
    opacityActive: 1,
    opacityInactive: 0.48,
    opacityHovered: 0.64,
    opacityBgNormal: 0.08,
    opacityBgHover: 0.16,
  }
};

export default function EmailScreen() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    setIsValid(emailRegex.test(text));
  };

  const handleContinue = () => {
    if (isValid) {
      setIsEmailValid(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerRow}>
            <Pressable style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color={windsurf.colors.white} />
            </Pressable>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '33%' }]} />
              </View>
              <Text style={styles.progressText}>Step 1 of 3</Text>
            </View>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>What's your email?</Text>
            <Text style={styles.subtitle}>We'll send you a verification code</Text>
          </View>
        </View>
      </View>
      
      {/* Form content */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              isValid && styles.validInput,
              email.length > 0 && !isValid && styles.invalidInput
            ]}
            placeholder="Enter your email"
            placeholderTextColor="rgba(255, 255, 255, 0.48)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={validateEmail}
          />
          
          {email.length > 0 && (
            <View style={styles.iconContainer}>
              {isValid ? (
                <Ionicons name="checkmark-circle" size={24} color={windsurf.colors.greenFlag} />
              ) : (
                <Ionicons name="alert-circle" size={24} color={windsurf.colors.redFlag} />
              )}
            </View>
          )}
        </View>
        
        {email.length > 0 && !isValid && (
          <View style={styles.helperContainer}>
            <Ionicons name="information-circle-outline" size={16} color={windsurf.colors.redFlag} />
            <Text style={styles.helperText}>Please enter a valid email address</Text>
          </View>
        )}
      </View>
      
      {/* Bottom action */}
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          {isValid ? (
            <Link href="/onboarding/email-verification" asChild>
              <TouchableOpacity style={styles.continueButton} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity 
              style={[styles.continueButton, !isValid && styles.disabledButton]} 
              activeOpacity={0.7}
              onPress={handleContinue}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.termsText}>
          By continuing, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: windsurf.colors.night,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, 0.1),
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: windsurf.colors.accent,
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  titleContainer: {
    width: '100%',
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: windsurf.colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  formContainer: {
    paddingHorizontal: 16,
    marginTop: 40,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    height: 56,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: windsurf.colors.white,
    fontFamily: 'Poppins',
  },
  validInput: {
    borderWidth: 1,
    borderColor: windsurf.colors.greenFlag,
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: windsurf.colors.redFlag,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  helperText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.redFlag,
    marginLeft: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  continueButton: {
    height: 56,
    backgroundColor: windsurf.colors.accent,
    borderRadius: 9999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.accent, 0.3),
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: windsurf.colors.white,
    marginRight: 8,
  },
  termsText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
    textAlign: 'center',
  },
  linkText: {
    color: windsurf.colors.accent,
  },
});
