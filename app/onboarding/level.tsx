import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Legend';

interface InstrumentSkill {
  name: string;
  level: SkillLevel;
}

export default function SkillLevelsScreen() {
  const [instrumentSkills, setInstrumentSkills] = useState<InstrumentSkill[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  useEffect(() => {
    const loadSelectedInstruments = async () => {
      try {
        const instruments = await AsyncStorage.getItem('selectedInstruments');
        if (instruments) {
          const parsedInstruments = JSON.parse(instruments) as string[];
          setSelectedInstruments(parsedInstruments);
          
          // Initialize instrument skills with default 'Beginner' level
          setInstrumentSkills(
            parsedInstruments.map(instrument => ({
              name: instrument,
              level: 'Beginner',
            }))
          );
        }
      } catch (error) {
        console.error('Error loading selected instruments:', error);
      }
    };

    loadSelectedInstruments();
  }, []);

  const updateSkillLevel = (instrumentName: string, level: SkillLevel) => {
    setInstrumentSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.name === instrumentName 
          ? { ...skill, level } 
          : skill
      )
    );
  };

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('instrumentSkills', JSON.stringify(instrumentSkills));
      router.push({
        pathname: '/onboarding/genres',
      });
    } catch (error) {
      console.error('Error saving instrument skills:', error);
    }
  };

  const renderSkillLevelButton = (instrument: string, level: SkillLevel, currentLevel: SkillLevel) => {
    const isSelected = level === currentLevel;
    
    return (
      <TouchableOpacity
        style={[
          styles.skillLevelButton,
          isSelected ? styles.selectedSkillLevel : {}
        ]}
        onPress={() => updateSkillLevel(instrument, level)}
      >
        <Text style={[
          styles.skillLevelText,
          isSelected ? styles.selectedSkillLevelText : {}
        ]}>
          {level}
        </Text>
      </TouchableOpacity>
    );
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
              <Text style={styles.stepIndicator}>8/8</Text>
            </View>
            <Text style={styles.headerSubtitle}>Skill Levels</Text>
          </View>
          <View style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: '100%' }]} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Let others know your level.</Text>
            <Text style={styles.subtitle}>Tell us about your musical skills and level.</Text>
          </View>
          
          {/* Instrument Skill Levels */}
          <View style={styles.skillsContainer}>
            {instrumentSkills.map((instrumentSkill, index) => (
              <View key={index} style={styles.instrumentSkillContainer}>
                <Text style={styles.instrumentName}>{instrumentSkill.name}</Text>
                <View style={styles.skillLevelsRow}>
                  {renderSkillLevelButton(instrumentSkill.name, 'Beginner', instrumentSkill.level)}
                  {renderSkillLevelButton(instrumentSkill.name, 'Intermediate', instrumentSkill.level)}
                  {renderSkillLevelButton(instrumentSkill.name, 'Advanced', instrumentSkill.level)}
                  {renderSkillLevelButton(instrumentSkill.name, 'Legend', instrumentSkill.level)}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <LinearGradient
        colors={['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 0.8)', '#121212']}
        style={styles.continueGradient}
      >
        <View style={styles.footerContent}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="chevron-back" size={27} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.continueButton}
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
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
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
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 12,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressIndicator: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 160,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: '#FFFFFF',
    lineHeight: 38,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.64)',
    lineHeight: 18,
    letterSpacing: -0.03,
  },
  skillsContainer: {
    gap: 16,
  },
  instrumentSkillContainer: {
    marginBottom: 16,
  },
  instrumentName: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 21,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  skillLevelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skillLevelButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#313131',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 65,
  },
  selectedSkillLevel: {
    backgroundColor: '#FFFFFF',
  },
  skillLevelText: {
    fontFamily: 'Poppins',
    fontSize: 11,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 16,
    textAlign: 'center',
  },
  selectedSkillLevelText: {
    color: '#121212',
  },
  continueGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'flex-end',
    paddingBottom: 34,
    paddingHorizontal: 16,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#FF4B4B',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  continueText: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '500',
    color: '#121212',
    lineHeight: 19,
  },
  tosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.03,
    lineHeight: 18,
  },
});
