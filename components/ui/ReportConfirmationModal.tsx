import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

interface ReportConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  userName: string;
  userType: string;
  userImage?: string;
}

const ReportConfirmationModal: React.FC<ReportConfirmationModalProps> = ({
  isVisible,
  onClose,
  userName,
  userType,
  userImage
}) => {
  const handleReport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onClose();
    
    // Navigate to report screen with user data
    setTimeout(() => {
      router.push({
        pathname: '/report',
        params: {
          userName,
          userType,
          userImage: userImage || ''
        }
      });
    }, 100); // Small delay to ensure modal is closed first
  };
  
  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name="flag" size={32} color="#F41857" />
                </View>
                
                <Text style={styles.title}>Report this musician</Text>
                
                <Text style={styles.description}>
                  Are you sure you want to report {userName}? This action cannot be undone.
                </Text>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.reportButton]} 
                    onPress={handleReport}
                  >
                    <Text style={styles.reportButtonText}>Yes, report this musician</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 340,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#121212',
  },
  modalContent: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(244, 24, 87, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    height: 48,
    borderRadius: 9999, // Fully rounded per WindSurf design system
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cancelButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  reportButton: {
    backgroundColor: '#F41857', // RedFlag color
  },
  reportButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default ReportConfirmationModal;
