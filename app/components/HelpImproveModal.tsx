import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface HelpImproveModalProps {
  visible: boolean;
  onClose: () => void;
  userEmail?: string;
}

export default function HelpImproveModal({ 
  visible, 
  onClose, 
  userEmail = "abc@gmail.com" 
}: HelpImproveModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 500;

  const handleTextChange = (text: string) => {
    if (text.length <= maxCharCount) {
      setFeedback(text);
      setCharCount(text.length);
    }
  };

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleResetPassword = () => {
    // Logic to reset password would go here
    console.log("Reset password requested");
    // Could show a success message or navigate to a reset screen
  };

  const handleKeepTrying = () => {
    // Logic for "Keep trying" option
    console.log("Keep trying selected");
    onClose();
  };

  const handleReportMusician = () => {
    // Logic to report musician would go here
    console.log("Report musician selected");
    // Could navigate to a report screen
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView 
        intensity={30} 
        tint="dark" 
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Help us improve BandMate</Text>
          
          {/* Rating Buttons */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.ratingButton,
                  rating === num && styles.selectedRating
                ]}
                onPress={() => handleRatingSelect(num)}
              >
                <Text style={[
                  styles.ratingText,
                  rating === num && styles.selectedRatingText
                ]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.ratingLabel}>
            <Ionicons name="checkmark-circle" size={14} color="rgba(255, 255, 255, 0.48)" /> Agree.
          </Text>
          
          <Text style={styles.feedbackLabel}>
            Let us know how we can improve your experience on BandMate
          </Text>
          
          {/* Feedback Text Input */}
          <TextInput
            style={styles.feedbackInput}
            placeholder="e.g. I have an thought about..."
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            multiline
            value={feedback}
            onChangeText={handleTextChange}
          />
          
          <Text style={styles.charCounter}>
            <Ionicons name="information-circle" size={14} color="rgba(255, 255, 255, 0.48)" /> Maximum {charCount}/{maxCharCount} characters.
          </Text>
          
          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleResetPassword}
          >
            <View style={styles.actionIconContainer}>
              <Ionicons name="mail" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Ask to reset my password</Text>
              <Text style={styles.actionSubtitle}>
                A verification code will be sent {userEmail} to you to reset your password.
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleKeepTrying}
          >
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Keep trying</Text>
              <Text style={styles.actionSubtitle}>
                Try again but with a new password.
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleReportMusician}
          >
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Yes, report this musician</Text>
              <Text style={styles.actionSubtitle}>
                Select a reason why and motivate it.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    maxHeight: height * 0.9,
  },
  modalTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingButton: {
    width: 60,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRating: {
    backgroundColor: '#FFFFFF',
  },
  ratingText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  selectedRatingText: {
    color: '#000000',
  },
  ratingLabel: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginBottom: 16,
  },
  feedbackLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  feedbackInput: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    height: 120,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  charCounter: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 12,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
