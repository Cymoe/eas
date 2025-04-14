import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PicturesScreen() {
  const [pictures, setPictures] = useState<string[]>([]);

  const handleAddPicture = (index: number) => {
    // In a real implementation, this would open the image picker
    console.log(`Adding picture at index ${index}`);
  };

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      if (pictures.length > 0) {
        await AsyncStorage.setItem('userPictures', JSON.stringify(pictures));
      }
      router.push('/onboarding/about-you');
    } catch (error) {
      console.error('Error saving pictures:', error);
    }
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
            <View style={[styles.progressIndicator, { width: '25%' }]} />
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pictures</Text>
          <Text style={styles.subtitle}>Add pictures to stand out in the community</Text>
        </View>
        
        <View style={styles.picturesContainer}>
          {/* First Row */}
          <View style={styles.picturesRow}>
            {/* Picture Box 1 */}
            <View style={styles.pictureOuterBox}>
              <Pressable 
                style={styles.pictureInnerBox}
                onPress={() => handleAddPicture(0)}
              >
                <Ionicons name="add" size={88} color="rgba(255, 255, 255, 0.48)" />
              </Pressable>
            </View>
            
            {/* Picture Box 2 */}
            <View style={styles.pictureOuterBox}>
              <Pressable 
                style={styles.pictureInnerBox}
                onPress={() => handleAddPicture(1)}
              >
                <Ionicons name="add" size={88} color="rgba(255, 255, 255, 0.48)" />
              </Pressable>
            </View>
          </View>
          
          {/* Second Row */}
          <View style={styles.picturesRow}>
            {/* Picture Box 3 */}
            <View style={styles.pictureOuterBox}>
              <Pressable 
                style={styles.pictureInnerBox}
                onPress={() => handleAddPicture(2)}
              >
                <Ionicons name="add" size={88} color="rgba(255, 255, 255, 0.48)" />
              </Pressable>
            </View>
            
            {/* Picture Box 4 */}
            <View style={styles.pictureOuterBox}>
              <Pressable 
                style={styles.pictureInnerBox}
                onPress={() => handleAddPicture(3)}
              >
                <Ionicons name="add" size={88} color="rgba(255, 255, 255, 0.48)" />
              </Pressable>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.64)" />
            <Text style={styles.infoText}>.jpg; .png format only. 1:1 ratio preferrably.</Text>
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
            style={[
              styles.continueButton,
              styles.continueButtonActive
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tosContainer}>
          <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
          <Text style={styles.tosText}>By pressing "Continue" you agree with BandMate TOS.</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
    zIndex: 1,
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
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    lineHeight: 22,
  },
  infoButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressIndicator: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingTop: 136,
    paddingHorizontal: 12,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  titleContainer: {
    width: '100%',
    gap: 12,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
    width: '100%',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
    width: '100%',
  },
  picturesContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  picturesRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
  },
  pictureOuterBox: {
    flex: 1,
    height: 171.5,
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 12,
  },
  pictureInnerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    marginTop: 8,
  },
  infoText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 34,
    gap: 12,
    zIndex: 2,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#FF4B4B',
  },
  continueText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 19,
    color: '#121212',
    textAlign: 'center',
  },
  tosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.03,
    textAlign: 'center',
  },
});
