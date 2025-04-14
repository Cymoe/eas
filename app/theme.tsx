import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ColorOption = ({ 
  color, 
  isSelected, 
  onPress 
}: { 
  color: string, 
  isSelected: boolean, 
  onPress: () => void 
}) => (
  <TouchableOpacity 
    style={[
      styles.colorOption,
      { backgroundColor: color },
      isSelected && styles.colorOptionSelected
    ]}
    onPress={onPress}
  />
);

const MessagePreview = ({ 
  senderMessage, 
  receiverMessage, 
  selectedColor 
}: { 
  senderMessage: string, 
  receiverMessage: string, 
  selectedColor: string 
}) => (
  <View style={styles.previewContainer}>
    <View style={styles.senderMessage}>
      <Text style={styles.messageText}>{senderMessage}</Text>
    </View>
    <View style={[styles.receiverMessage, { backgroundColor: selectedColor }]}>
      <Text style={styles.messageText}>{receiverMessage}</Text>
    </View>
  </View>
);

export default function ThemeScreen() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  const colors = [
    '#006636', // Dark Green
    '#8DC53E', // Light Green
    '#EFE347', // Yellow
    '#FD6D1B', // Orange
    '#EE1045', // Red (not shown in the image but included for completeness)
    '#D3155D', // Pink (not shown in the image but included for completeness)
    '#CD88FD', // Purple (not shown in the image but included for completeness)
    '#575093', // Blue-purple (not shown in the image but included for completeness)
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Message Preview */}
      <View style={styles.previewSection}>
        <MessagePreview 
          senderMessage="Hi James, how are you?"
          receiverMessage="Hey Catie, I'm doing well. I hope you too!"
          selectedColor={colors[selectedColorIndex]}
        />
        <Text style={styles.previewHint}>
          <Ionicons name="information-circle-outline" size={14} color="rgba(255, 255, 255, 0.48)" />
          {" "}This is how your conversation will look like.
        </Text>
      </View>
      
      <View style={styles.separator} />
      
      {/* Color Options */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.colorOptionsContainer}>
          {colors.slice(0, 4).map((color, index) => (
            <ColorOption 
              key={index}
              color={color}
              isSelected={selectedColorIndex === index}
              onPress={() => setSelectedColorIndex(index)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
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
  previewSection: {
    padding: 16,
  },
  previewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  senderMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    padding: 12,
    maxWidth: '80%',
    marginBottom: 12,
  },
  receiverMessage: {
    alignSelf: 'flex-end',
    borderRadius: 12,
    padding: 12,
    maxWidth: '80%',
  },
  messageText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
  },
  previewHint: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  colorOptionsContainer: {
    padding: 16,
  },
  colorOption: {
    width: width - 32,
    height: 80,
    borderRadius: 12,
    marginBottom: 16,
  },
  colorOptionSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
