import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define artists
const artists = [
  { id: 1, name: 'Arctic Monkeys' },
  { id: 2, name: 'Blur' },
  { id: 3, name: 'Beastie Boys' },
  { id: 4, name: 'Coldplay' },
  { id: 5, name: 'David Bowie' },
  { id: 6, name: 'Depeche Mode' },
  { id: 7, name: 'Greenday' },
  { id: 8, name: 'Massive Attack' },
  { id: 9, name: 'Oasis' },
  { id: 10, name: 'Placebo' },
  { id: 11, name: 'Radiohead' },
  { id: 12, name: 'Rage Against The Machine' },
  { id: 13, name: 'Red Hot Chili Peppers' },
  { id: 14, name: 'The Clash' },
  { id: 15, name: 'The Beatles' },
  { id: 16, name: 'The Cure' },
  { id: 17, name: 'The Killers' },
  { id: 18, name: 'The Smiths' },
  { id: 19, name: 'Kula Shaker' },
  { id: 20, name: 'The Verve' },
  { id: 21, name: 'The Strokes' },
];

export default function ArtistsScreen() {
  const [selectedArtists, setSelectedArtists] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArtists, setFilteredArtists] = useState(artists);
  const minimumArtists = 3;

  useEffect(() => {
    // Filter artists based on search query
    if (searchQuery.trim() === '') {
      setFilteredArtists(artists);
    } else {
      const filtered = artists.filter(artist => 
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArtists(filtered);
    }
  }, [searchQuery]);

  const toggleArtist = (artistId: number) => {
    if (selectedArtists.includes(artistId)) {
      setSelectedArtists(selectedArtists.filter(id => id !== artistId));
    } else {
      setSelectedArtists([...selectedArtists, artistId]);
    }
  };

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      // Get the selected artist names
      const selectedArtistNames = selectedArtists.map(id => 
        artists.find(artist => artist.id === id)?.name
      ).filter(Boolean);
      
      await AsyncStorage.setItem('selectedArtists', JSON.stringify(selectedArtistNames));
      router.push({
        pathname: '/onboarding/final',
      });
    } catch (error) {
      console.error('Error saving artists:', error);
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
              <Text style={styles.stepIndicator}>9/10</Text>
            </View>
            <Text style={styles.headerSubtitle}>Artists</Text>
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
            <Text style={styles.title}>Choose 3 or more artists you like.</Text>
            <Text style={styles.subtitle}>Tell us about your musical idols.</Text>
          </View>
          
          {/* Search Field */}
          <View style={styles.searchContainer}>
            <View style={styles.searchField}>
              <Ionicons name="search" size={32} color="rgba(255, 255, 255, 0.64)" />
              <TextInput
                style={styles.searchInput}
                placeholder="Coldplay, Ed Sheeran, Bob Marley..."
                placeholderTextColor="rgba(255, 255, 255, 0.48)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <Text style={styles.searchHint}>Just enter a name.</Text>
          </View>
          
          {/* Selection Requirement */}
          <View style={styles.requirementContainer}>
            <Ionicons name="information-circle-outline" size={12} color="#828282" />
            <Text style={styles.requirementText}>
              Choose at least {selectedArtists.length}/{minimumArtists}
            </Text>
          </View>
          
          {/* Artists Grid */}
          <View style={styles.artistsGrid}>
            {filteredArtists.map((artist) => (
              <TouchableOpacity
                key={artist.id}
                style={styles.artistContainer}
                onPress={() => toggleArtist(artist.id)}
              >
                <View style={[
                  styles.artistImageContainer,
                  selectedArtists.includes(artist.id) && styles.selectedArtistImageContainer
                ]}>
                  <View style={[
                    styles.artistImagePlaceholder,
                    { backgroundColor: getColorForArtist(artist.id) }
                  ]}>
                    <Text style={styles.artistInitial}>
                      {artist.name.charAt(0)}
                    </Text>
                  </View>
                  {selectedArtists.includes(artist.id) && (
                    <View style={styles.checkmarkContainer}>
                      <Ionicons name="checkmark-circle" size={48} color="#1ED760" />
                    </View>
                  )}
                </View>
                <Text style={styles.artistName}>{artist.name}</Text>
              </TouchableOpacity>
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
            style={[
              styles.continueButton,
              selectedArtists.length >= minimumArtists ? styles.continueButtonActive : {}
            ]}
            onPress={handleContinue}
            disabled={selectedArtists.length < minimumArtists}
          >
            <Text style={[
              styles.continueText,
              selectedArtists.length < minimumArtists ? { color: 'rgba(18, 18, 18, 0.5)' } : {}
            ]}>Continue</Text>
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

// Function to generate a color based on artist ID
const getColorForArtist = (id: number) => {
  const colors = [
    '#1ED760', '#DC158C', '#006450', '#8400E7', '#1D3264', 
    '#608109', '#26856B', '#503751', '#477D94', '#0F73EC', 
    '#8E66AC', '#608108', '#777777', '#8D67AB', '#E0128B', 
    '#477D95', '#016450', '#E81529', '#E0128C', '#8C67AB', '#E80F5C'
  ];
  
  return colors[(id - 1) % colors.length];
};

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
    marginTop: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 160,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: '#FFFFFF',
    lineHeight: 33,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.64)',
    lineHeight: 18,
    letterSpacing: -0.03,
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 32,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
  },
  searchHint: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.64)',
    lineHeight: 16,
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
    lineHeight: 18,
    letterSpacing: -0.03,
  },
  artistsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  artistContainer: {
    width: 108,
    alignItems: 'center',
    marginBottom: 24,
  },
  artistImageContainer: {
    width: 108,
    height: 108,
    borderRadius: 54,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  selectedArtistImageContainer: {
    borderWidth: 3,
    borderColor: '#1ED760',
  },
  artistImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistInitial: {
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  artistName: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  continueButtonActive: {
    backgroundColor: '#FF4B4B',
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
