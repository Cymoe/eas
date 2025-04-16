import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';

// hCaptcha site key from .env file
const HCAPTCHA_SITE_KEY = '05309e38-3a22-466e-803a-a9d0a60c065a';

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

// Generate random math problem
const generateMathProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operation = Math.random() > 0.5 ? '+' : '-';
  
  let answer;
  if (operation === '+') {
    answer = num1 + num2;
  } else {
    // Ensure we don't have negative answers
    if (num1 >= num2) {
      answer = num1 - num2;
    } else {
      answer = num2 - num1;
      return { num1: num2, num2: num1, operation, answer };
    }
  }
  
  return { num1, num2, operation, answer };
};

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
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);
  
  // Captcha state
  const [mathProblem, setMathProblem] = useState(generateMathProblem());
  const [userAnswer, setUserAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  
  // Animation for progress bar
  const progressAnim = useRef(new Animated.Value(1)).current;
  
  // Character count for note
  const maxCharacters = 500;
  const remainingCharacters = maxCharacters - note.length;
  
  const handleConfirm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Here you would submit the report
    console.log('Report submitted');
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
  
  const handleCaptchaVerify = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setVerifying(true);
    setMathProblem(generateMathProblem());
    setUserAnswer('');
    setCaptchaError('');
    setShowCaptcha(true);
  };
  
  const handleCaptchaSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (userAnswer.trim() === '') {
      setCaptchaError('Please enter your answer');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    
    const parsedAnswer = parseInt(userAnswer.trim(), 10);
    if (isNaN(parsedAnswer)) {
      setCaptchaError('Please enter a valid number');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    
    if (parsedAnswer === mathProblem.answer) {
      // Correct answer
      setIsHuman(true);
      setShowCaptcha(false);
      setVerifying(false);
      setShowVerificationSuccess(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Reset and start the progress animation
      progressAnim.setValue(1);
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      
      // Auto-hide success message after 2 seconds
      setTimeout(() => {
        setShowVerificationSuccess(false);
        // Add a subtle haptic feedback when the success message disappears
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 2000);
    } else {
      // Wrong answer
      setCaptchaError('Incorrect answer, please try again');
      setMathProblem(generateMathProblem());
      setUserAnswer('');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };
  
  const refreshCaptcha = () => {
    setMathProblem(generateMathProblem());
    setUserAnswer('');
    setCaptchaError('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar style="light" />
      
      {/* Verification Success Modal */}
      <Modal
        visible={showVerificationSuccess}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.captchaModalContainer}>
          <View style={styles.verificationSuccessContent}>
            <View style={styles.verificationSuccessIcon}>
              <Ionicons name="checkmark-circle" size={64} color="#6BFF90" />
            </View>
            <Text style={styles.verificationSuccessTitle}>Verification Complete</Text>
            <Text style={styles.verificationSuccessText}>
              Thank you for verifying you're human
            </Text>
            <View style={styles.verificationProgressBar}>
              <Animated.View 
                style={[
                  styles.verificationProgressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    })
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Captcha Modal */}
      <Modal
        visible={showCaptcha}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.captchaModalContainer}>
          <View style={styles.captchaModalContent}>
            <View style={styles.captchaModalHeader}>
              <Text style={styles.captchaModalTitle}>Human Verification</Text>
              <TouchableOpacity 
                style={styles.captchaModalClose}
                onPress={() => {
                  setShowCaptcha(false);
                  setVerifying(false);
                }}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.captchaContent}>
              <Text style={styles.captchaTitle}>Solve this math problem</Text>
              <Text style={styles.mathProblem}>
                {mathProblem.num1} {mathProblem.operation} {mathProblem.num2} = ?
              </Text>
              
              <TextInput
                style={styles.captchaInput}
                value={userAnswer}
                onChangeText={setUserAnswer}
                keyboardType="number-pad"
                placeholder="Enter your answer"
                placeholderTextColor="rgba(255, 255, 255, 0.48)"
                autoFocus
              />
              
              {captchaError ? (
                <Text style={styles.captchaError}>{captchaError}</Text>
              ) : null}
              
              <View style={styles.captchaActions}>
                <TouchableOpacity 
                  style={styles.captchaRefreshButton}
                  onPress={refreshCaptcha}
                >
                  <Ionicons name="refresh" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.captchaSubmitButton}
                  onPress={handleCaptchaSubmit}
                >
                  <Text style={styles.captchaSubmitText}>Verify</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.captchaFooter}>
                This verification helps keep BandMate safe
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      
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
            style={[
              styles.captchaButton, 
              isHuman && styles.captchaButtonActive,
              verifying && styles.captchaButtonVerifying
            ]}
            onPress={handleCaptchaVerify}
            disabled={isHuman || verifying}
          >
            <View style={styles.captchaImage}>
              {/* hCaptcha-inspired UI */}
              <View style={styles.hCaptchaContainer}>
                <View style={styles.hCaptchaHeader}>
                  <Text style={styles.hCaptchaText}>BandMate Verify</Text>
                  <View style={styles.hCaptchaPrivacy}>
                    <Ionicons name="shield-checkmark" size={12} color="#6BFF90" />
                    <Text style={styles.hCaptchaPrivacyText}>Privacy</Text>
                  </View>
                </View>
                
                <View style={[
                  styles.hCaptchaCheckbox,
                  isHuman && styles.hCaptchaCheckboxVerified,
                  verifying && styles.hCaptchaCheckboxVerifying
                ]}>
                  {verifying ? (
                    <ActivityIndicator size="small" color="#FF3B30" />
                  ) : isHuman ? (
                    <Ionicons name="checkmark" size={20} color="#6BFF90" />
                  ) : (
                    <View style={{ width: 20, height: 20 }} />
                  )}
                </View>
                
                <Text style={[
                  styles.hCaptchaLabel,
                  isHuman && styles.hCaptchaLabelVerified,
                  verifying && styles.hCaptchaLabelVerifying
                ]}>
                  {verifying ? "Verifying..." : isHuman ? "Verified" : "I am human"}
                </Text>
                
                <View style={styles.hCaptchaFooter}>
                  <Svg width="16" height="16" viewBox="0 0 24 24">
                    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" 
                      fill="#FFFFFF" fillOpacity="0.48" />
                  </Svg>
                  <Text style={styles.hCaptchaFooterText}>BandMate Protected</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          
          {isHuman && (
            <View style={styles.verificationStatusContainer}>
              <Ionicons name="checkmark-circle" size={16} color="#6BFF90" />
              <Text style={styles.verificationStatusText}>Verification complete</Text>
            </View>
          )}
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
    justifyContent: 'center',
    paddingVertical: 16,
  },
  progressStep: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStepText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#FF3B30',
    marginHorizontal: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.48)',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userType: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  reasonSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  reasonInfo: {
    flex: 1,
  },
  reasonTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  reasonDescription: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  reasonDropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  reasonOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  lastReasonOption: {
    borderBottomWidth: 0,
  },
  reasonOptionTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  reasonOptionDescription: {
    fontFamily: 'Poppins',
    fontSize: 14,
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
    color: '#828282',
    marginLeft: 4,
  },
  noteInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  captchaButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captchaButtonActive: {
    backgroundColor: 'rgba(107, 255, 144, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(107, 255, 144, 0.24)',
  },
  captchaButtonVerifying: {
    backgroundColor: 'rgba(255, 59, 48, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.24)',
  },
  captchaImage: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hCaptchaContainer: {
    width: 300,
    backgroundColor: '#1D1D1D',
    borderRadius: 8,
    padding: 12,
  },
  hCaptchaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
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
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 4,
  },
  hCaptchaCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  hCaptchaCheckboxVerified: {
    backgroundColor: 'rgba(107, 255, 144, 0.16)',
    borderColor: 'rgba(107, 255, 144, 0.48)',
  },
  hCaptchaCheckboxVerifying: {
    backgroundColor: 'rgba(255, 59, 48, 0.16)',
    borderColor: 'rgba(255, 59, 48, 0.48)',
  },
  hCaptchaLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  hCaptchaLabelVerified: {
    color: '#6BFF90',
  },
  hCaptchaLabelVerifying: {
    color: '#FF3B30',
  },
  hCaptchaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hCaptchaFooterText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 4,
  },
  verificationStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  verificationStatusText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#6BFF90',
    marginLeft: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 16,
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#FF3B30',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: 'rgba(255, 59, 48, 0.48)',
  },
  confirmButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  captchaModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captchaModalContent: {
    width: '90%',
    backgroundColor: '#121212',
    borderRadius: 12,
    overflow: 'hidden',
  },
  captchaModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  captchaModalTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  captchaModalClose: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captchaContent: {
    padding: 20,
    alignItems: 'center',
  },
  captchaTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  mathProblem: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  captchaInput: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  captchaError: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#F41857',
    marginBottom: 12,
  },
  captchaActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  captchaRefreshButton: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captchaSubmitButton: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captchaSubmitText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  captchaFooter: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginTop: 20,
  },
  verificationSuccessContent: {
    width: '80%',
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(107, 255, 144, 0.24)',
  },
  verificationSuccessIcon: {
    marginBottom: 16,
  },
  verificationSuccessTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  verificationSuccessText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    textAlign: 'center',
    marginBottom: 20,
  },
  verificationProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  verificationProgressFill: {
    height: '100%',
    backgroundColor: '#6BFF90',
    borderRadius: 2,
  },
});
