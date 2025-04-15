import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Platform,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';

// Define types for the report reason
interface ReportReason {
  title: string;
  description: string;
}

// Report reasons options
const REPORT_REASONS: ReportReason[] = [
  {
    title: 'Adult content',
    description: 'Inappropriate images/videos shared.'
  },
  {
    title: 'Harassment',
    description: 'Threatening or offensive behavior.'
  },
  {
    title: 'Fake profile',
    description: 'Impersonation or misleading identity.'
  },
  {
    title: 'Spam',
    description: 'Repetitive or irrelevant messages.'
  },
  {
    title: 'Other',
    description: 'Please specify in the note section below.'
  }
];

export default function ReportScreen() {
  const params = useLocalSearchParams<{
    userName?: string;
    userType?: string;
    userImage?: string;
  }>();
  const { userName, userType, userImage } = params;
  
  const [selectedReason, setSelectedReason] = useState<ReportReason>(REPORT_REASONS[0]);
  const [note, setNote] = useState<string>('');
  const [showReasonDropdown, setShowReasonDropdown] = useState<boolean>(false);
  const [isHuman, setIsHuman] = useState<boolean>(false);
  
  // Character count for note
  const maxCharacters = 500;
  const remainingCharacters = maxCharacters - note.length;
  
  const handleConfirm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Here you would submit the report
    // For now, just navigate back
    router.back();
  };
  
  const toggleReasonDropdown = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowReasonDropdown(!showReasonDropdown);
  };
  
  const selectReason = (reason: ReportReason) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedReason(reason);
    setShowReasonDropdown(false);
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar style="light" />
      
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit a report</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <Text style={styles.progressStepText}>1</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressStep}>
          <Text style={styles.progressStepText}>2</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Author section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Author</Text>
          <View style={styles.userCard}>
            <Image 
              source={userImage ? { uri: userImage } : require('../assets/images/avatar.png')} 
              style={styles.userImage} 
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName || 'User name'}</Text>
              <Text style={styles.userType}>{userType || 'Solo Artist'}</Text>
            </View>
          </View>
        </View>
        
        {/* Reason section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a reason</Text>
          <TouchableOpacity 
            style={styles.reasonSelector}
            onPress={toggleReasonDropdown}
          >
            <View style={styles.reasonInfo}>
              <Text style={styles.reasonTitle}>{selectedReason.title}</Text>
              <Text style={styles.reasonDescription}>{selectedReason.description}</Text>
            </View>
            <Ionicons 
              name={showReasonDropdown ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="rgba(255, 255, 255, 0.48)" 
            />
          </TouchableOpacity>
          
          {showReasonDropdown && (
            <View style={styles.reasonDropdown}>
              {REPORT_REASONS.map((reason, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.reasonOption,
                    index === REPORT_REASONS.length - 1 && styles.lastReasonOption
                  ]}
                  onPress={() => selectReason(reason)}
                >
                  <Text style={styles.reasonOptionTitle}>{reason.title}</Text>
                  <Text style={styles.reasonOptionDescription}>{reason.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={12} color="#828282" />
            <Text style={styles.infoText}>Please select the reason that suits better the situation.</Text>
          </View>
        </View>
        
        {/* Note section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add a Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="e.g. Let's have a jam session together! I'll bring my guitar and some drinks."
            placeholderTextColor="#AEAEAE"
            multiline
            value={note}
            onChangeText={setNote}
            maxLength={maxCharacters}
          />
          
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={12} color="#828282" />
            <Text style={styles.infoText}>Maximum {note.length}/{maxCharacters} characters.</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={12} color="#828282" />
            <Text style={styles.infoText}>Please motivate the reason for your report.</Text>
          </View>
        </View>
        
        {/* Human verification section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Are you human?</Text>
          <TouchableOpacity
            style={[styles.captchaButton, isHuman && styles.captchaButtonActive]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setIsHuman(!isHuman);
            }}
          >
            <View style={styles.captchaImage}>
              {/* hCaptcha-inspired UI */}
              <View style={styles.hCaptchaContainer}>
                <View style={styles.hCaptchaHeader}>
                  <Text style={styles.hCaptchaText}>hCaptcha</Text>
                  <View style={styles.hCaptchaPrivacy}>
                    <Ionicons name="shield-checkmark" size={12} color="#6BFF90" />
                    <Text style={styles.hCaptchaPrivacyText}>Privacy</Text>
                  </View>
                </View>
                
                <View style={styles.hCaptchaCheckbox}>
                  {isHuman ? (
                    <Ionicons name="checkmark" size={20} color="#6BFF90" />
                  ) : (
                    <View style={{ width: 20, height: 20 }} />
                  )}
                </View>
                
                <Text style={styles.hCaptchaLabel}>
                  I am human
                </Text>
                
                <View style={styles.hCaptchaFooter}>
                  <Svg width="16" height="16" viewBox="0 0 24 24">
                    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" 
                      fill="#FFFFFF" fillOpacity="0.48" />
                  </Svg>
                  <Text style={styles.hCaptchaFooterText}>hCaptcha Protected</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Confirm button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            (!selectedReason || !isHuman) && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirm}
          disabled={!selectedReason || !isHuman}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          🤝 Thank you for keeping BandMate a safe space.
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
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 14,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
  },
  backButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  placeholder: {
    width: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 14,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 9999, 
    backgroundColor: '#FF3B30', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStepText: {
    fontFamily: 'Poppins',
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
    color: '#121212',
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#FF3B30', 
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: -0.5,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    borderRadius: 12, 
    backdropFilter: 'blur(16px)',
  },
  userImage: {
    width: 44,
    height: 40,
    borderRadius: 8,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.5,
    color: '#FFFFFF', 
  },
  userType: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.5,
    color: 'rgba(255, 255, 255, 0.48)', 
  },
  reasonSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    borderRadius: 12, 
    marginBottom: 8,
    backdropFilter: 'blur(16px)',
  },
  reasonInfo: {
    flex: 1,
  },
  reasonTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.5,
    color: '#FFFFFF', 
  },
  reasonDescription: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.5,
    color: 'rgba(255, 255, 255, 0.48)', 
  },
  reasonDropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    borderRadius: 12, 
    marginBottom: 8,
    overflow: 'hidden',
    backdropFilter: 'blur(16px)',
  },
  reasonOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  lastReasonOption: {
    borderBottomWidth: 0,
  },
  reasonOptionTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.5,
    color: '#FFFFFF', 
  },
  reasonOptionDescription: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.5,
    color: 'rgba(255, 255, 255, 0.48)', 
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)', 
    marginLeft: 4,
  },
  noteInput: {
    padding: 12,
    height: 104,
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    borderRadius: 8,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    color: '#FFFFFF', 
    textAlignVertical: 'top',
  },
  captchaButton: {
    alignSelf: 'flex-start',
  },
  captchaButtonActive: {
    opacity: 0.8,
  },
  captchaImage: {
    width: 200,
    height: 120,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  hCaptchaContainer: {
    width: '100%',
    height: '100%',
    padding: 8,
    justifyContent: 'space-between',
  },
  hCaptchaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hCaptchaText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  hCaptchaPrivacy: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hCaptchaPrivacyText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 4,
  },
  hCaptchaCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  hCaptchaLabel: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.64)',
    textAlign: 'center',
    marginTop: 4,
  },
  hCaptchaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hCaptchaFooterText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    paddingBottom: Platform.OS === 'ios' ? 32 : 8,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    alignItems: 'center',
    backdropFilter: 'blur(16px)',
  },
  confirmButton: {
    width: 240,
    height: 48, 
    borderRadius: 9999, 
    backgroundColor: '#FF3B30', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: 16, 
  },
  confirmButtonDisabled: {
    opacity: 0.48, 
  },
  confirmButtonText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: -0.2,
    color: '#000000',
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: 'rgba(255, 255, 255, 0.48)', 
    textAlign: 'center',
  },
});
