import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Instrument data with categories and colors
const instrumentCategories = [
  {
    name: 'Strings',
    instruments: [
      { name: 'Guitar', color: '#DC158C' },
      { name: 'Bass', color: '#006450' },
      { name: 'Violin', color: '#8400E7' },
      { name: 'Viola', color: '#1D3264' },
      { name: 'Cello', color: '#608109' },
      { name: 'Harp', color: '#26856B' },
      { name: 'Banjo', color: '#503751' },
      { name: 'Ukulele', color: '#477D94' },
      { name: 'Mandolin', color: '#477D95' },
      { name: 'Double Bass', color: '#0F73EC' },
      { name: 'Lute', color: '#8E66AC' },
      { name: 'Sitar', color: '#608108' },
    ]
  },
  {
    name: 'Percussion Instruments',
    instruments: [
      { name: 'Drums', color: '#DC158C' },
      { name: 'Bongos', color: '#006450' },
      { name: 'Congas', color: '#8400E7' },
      { name: 'Tambourine', color: '#1D3264' },
      { name: 'Maracas', color: '#608109' },
      { name: 'Xylophone', color: '#26856B' },
      { name: 'Vibraphone', color: '#503751' },
      { name: 'Cajon', color: '#477D94' },
      { name: 'Djembe', color: '#477D95' },
      { name: 'Triangle', color: '#0F73EC' },
      { name: 'Cymbals', color: '#8E66AC' },
      { name: 'Timpani', color: '#608108' },
    ]
  },
  {
    name: 'Keyboard Instruments',
    instruments: [
      { name: 'Piano', color: '#DC158C' },
      { name: 'Organ', color: '#006450' },
      { name: 'Synthesizer', color: '#8400E7' },
      { name: 'Accordion', color: '#1D3264' },
      { name: 'Harpsichord', color: '#608109' },
      { name: 'Melodica', color: '#26856B' },
      { name: 'Electric Piano', color: '#503751' },
      { name: 'Keytar', color: '#477D94' },
      { name: 'MIDI Controller', color: '#477D95' },
      { name: 'Celesta', color: '#0F73EC' },
      { name: 'Clavichord', color: '#8E66AC' },
      { name: 'Digital Piano', color: '#608108' },
    ]
  },
  {
    name: 'Wind Instruments',
    instruments: [
      { name: 'Flute', color: '#DC158C' },
      { name: 'Clarinet', color: '#006450' },
      { name: 'Saxophone', color: '#8400E7' },
      { name: 'Trumpet', color: '#1D3264' },
      { name: 'Trombone', color: '#608109' },
      { name: 'Tuba', color: '#26856B' },
      { name: 'French Horn', color: '#503751' },
      { name: 'Oboe', color: '#477D94' },
      { name: 'Bassoon', color: '#477D95' },
      { name: 'Recorder', color: '#0F73EC' },
      { name: 'Harmonica', color: '#8E66AC' },
      { name: 'Bagpipes', color: '#608108' },
    ]
  }
];

export default function InstrumentsScreen() {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  
  const toggleInstrument = (instrumentName: string) => {
    if (selectedInstruments.includes(instrumentName)) {
      setSelectedInstruments(selectedInstruments.filter(name => name !== instrumentName));
    } else {
      setSelectedInstruments([...selectedInstruments, instrumentName]);
    }
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('selectedInstruments', JSON.stringify(selectedInstruments));
      router.push({
        pathname: '/onboarding/level',
      });
    } catch (error) {
      console.error('Error saving instruments:', error);
    }
  };

  const goBack = () => {
    router.back();
  };

  const filteredCategories = searchText.trim() === '' 
    ? instrumentCategories 
    : instrumentCategories.map(category => ({
        name: category.name,
        instruments: category.instruments.filter(instrument => 
          instrument.name.toLowerCase().includes(searchText.toLowerCase())
        )
      })).filter(category => category.instruments.length > 0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle}>Registration</Text>
              <Text style={styles.stepIndicator}>7/8</Text>
            </View>
            <Text style={styles.headerSubtitle}>Instruments</Text>
          </View>
          <View style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: '87.5%' }]} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Instruments you play</Text>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={24} color="rgba(255, 255, 255, 0.64)" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Guitar, Piano, Violin..."
                placeholderTextColor="rgba(255, 255, 255, 0.48)"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <Text style={styles.searchHint}>Just enter a name.</Text>
          </View>
          
          {/* Selection Requirement */}
          <View style={styles.requirementContainer}>
            <Ionicons name="information-circle-outline" size={12} color="#828282" />
            <Text style={styles.requirementText}>
              Choose at least {selectedInstruments.length}/1
            </Text>
          </View>

          {/* Instrument Categories */}
          {filteredCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              <View style={styles.instrumentGrid}>
                {category.instruments.map((instrument, instrumentIndex) => (
                  <TouchableOpacity
                    key={instrumentIndex}
                    style={[
                      styles.instrumentCard,
                      { backgroundColor: instrument.color },
                      selectedInstruments.includes(instrument.name) && styles.selectedCard
                    ]}
                    onPress={() => toggleInstrument(instrument.name)}
                  >
                    <Text style={styles.instrumentName}>{instrument.name}</Text>
                    {selectedInstruments.includes(instrument.name) && (
                      <View style={styles.checkmarkContainer}>
                        <Ionicons name="checkmark-circle" size={24} color="white" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Spacer for bottom padding */}
          <View style={styles.bottomSpacer} />
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
            style={[
              styles.continueButton,
              selectedInstruments.length > 0 ? styles.continueButtonActive : {}
            ]}
            onPress={handleContinue}
            disabled={selectedInstruments.length === 0}
          >
            <Text style={[
              styles.continueText,
              selectedInstruments.length === 0 ? { color: 'rgba(255, 255, 255, 0.5)' } : {}
            ]}>Continue</Text>
          </TouchableOpacity>
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
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    marginTop: 4,
  },
  infoButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
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
  scrollView: {
    flex: 1,
    marginTop: 120,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 160,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: '#FFFFFF',
    lineHeight: 38,
  },
  searchContainer: {
    marginBottom: 16,
    gap: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  searchHint: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  requirementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 4,
  },
  requirementText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.64)',
    flex: 1,
    letterSpacing: -0.3,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
    lineHeight: 21,
  },
  instrumentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  instrumentCard: {
    width: '48.5%',
    height: 98,
    borderRadius: 4,
    padding: 0,
    paddingLeft: 12,
    paddingTop: 8,
    paddingRight: 50,
    marginBottom: 8,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: 'white',
  },
  instrumentName: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 15,
    color: '#FFFFFF',
    width: 109,
    lineHeight: 19,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  bottomSpacer: {
    height: 100,
  },
  continueGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 16,
  },
  continueButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  continueText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#121212',
  },
});
