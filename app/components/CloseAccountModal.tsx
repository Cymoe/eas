import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView
} from 'react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

interface CloseAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onCloseAccount: () => void;
}

export default function CloseAccountModal({ visible, onClose, onCloseAccount }: CloseAccountModalProps) {
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
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Closing your account and deleting your data</Text>
            
            <Text style={styles.modalText}>
              To close your <Text style={styles.boldText}>BandMate</Text> Free or Premium 
              account and delete your data permanently from all <Text style={styles.boldText}>BandMate</Text> apps and services, you 
              can use our automated service.
            </Text>
            
            <Text style={styles.modalText}>
              If you're looking cancel your Premium subscription, you can keep all your playlists 
              and saved music by switching to <Text style={styles.boldText}>BandMate</Text> free, our ad-supported service.
            </Text>
            
            <TouchableOpacity 
              style={styles.closeAccountButton} 
              onPress={onCloseAccount}
            >
              <Text style={styles.closeAccountButtonText}>Close my account and delete my data</Text>
            </TouchableOpacity>
            
            <Text style={styles.disclaimerText}>
              After you close your account, we will email you a link which 
              you can use to reactivate it within 30 days. After those 30 
              days, your account cannot be reactivated and the 
              process to delete your data will be initiated. You can 
              always create a new one.
            </Text>
            
            <Text style={styles.disclaimerText}>
              Information you submit will be used to respond to your 
              enquiry, and as otherwise described in our <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
            
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.readMoreText}>Read more</Text>
            </TouchableOpacity>
          </ScrollView>
          
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
    maxHeight: height * 0.8,
  },
  scrollView: {
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeAccountButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 24,
  },
  closeAccountButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  disclaimerText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 12,
    lineHeight: 20,
  },
  linkText: {
    color: '#FF3B30',
    textDecorationLine: 'underline',
  },
  readMoreText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 8,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
