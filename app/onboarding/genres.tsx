import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define music genres with their colors
const musicGenres = [
  { id: 1, name: 'Rock', color: '#DC158C' },
  { id: 2, name: 'Alternative', color: '#006450' },
  { id: 3, name: 'Jazz', color: '#8400E7' },
  { id: 4, name: 'Blues', color: '#1D3264' },
  { id: 5, name: 'Hip Hop', color: '#608109' },
  { id: 6, name: 'Country', color: '#26856B' },
  { id: 7, name: 'Pop', color: '#503751' },
  { id: 8, name: 'EDM', color: '#477D94' },
  { id: 9, name: 'Reggae', color: '#477D95' },
  { id: 10, name: 'Classical', color: '#0F73EC' },
  { id: 11, name: 'Metal', color: '#8E66AC' },
  { id: 12, name: 'Punk', color: '#608108' },
  { id: 13, name: 'R&B', color: '#777777' },
  { id: 14, name: 'Soul', color: '#8D67AB' },
  { id: 15, name: 'Experimental', color: '#E0128B' },
  { id: 16, name: 'Indie Rock', color: '#477D95' },
  { id: 17, name: 'K-Pop', color: '#016450' },
  { id: 18, name: 'Latin Music', color: '#E81529' },
  { id: 19, name: 'Psychedelic Rock', color: '#E0128C' },
  { id: 20, name: 'Gospel', color: '#8C67AB' },
  { id: 21, name: 'Progressive Rock', color: '#E80F5C' },
  { id: 22, name: 'Ambient', color: '#B16138' },
  { id: 23, name: 'Rap', color: '#B16138' },
  { id: 24, name: 'Trap', color: '#E80F5C' },
  { id: 25, name: 'Polish Noise', color: '#B16138' },
  { id: 26, name: 'Dubstep', color: '#B16138' },
  { id: 27, name: 'Bluegrass', color: '#E80F5C' },
  { id: 28, name: 'Folk', color: '#E80F5C' },
  { id: 29, name: 'Techno', color: '#B16138' },
];

export default function GenresScreen() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGenres, setFilteredGenres] = useState(musicGenres);
  const minimumGenres = 3;

  useEffect(() => {
    // Filter genres based on search query
    if (searchQuery.trim() === '') {
      setFilteredGenres(musicGenres);
    } else {
      const filtered = musicGenres.filter(genre => 
        genre.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGenres(filtered);
    }
  }, [searchQuery]);

  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      // Get the selected genre names
      const selectedGenreNames = selectedGenres.map(id => 
        musicGenres.find(genre => genre.id === id)?.name
      ).filter(Boolean);
      
      await AsyncStorage.setItem('selectedGenres', JSON.stringify(selectedGenreNames));
      router.push({
        pathname: '/onboarding/artists',
      });
    } catch (error) {
      console.error('Error saving genres:', error);
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
              <Text style={styles.stepIndicator}>9/9</Text>
            </View>
            <Text style={styles.headerSubtitle}>Genres</Text>
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
            <Text style={styles.title}>Choose 3 or more genres you like.</Text>
            <Text style={styles.subtitle}>Tell us about your musical influences and interests</Text>
          </View>
          
          {/* Search Field */}
          <View style={styles.searchContainer}>
            <View style={styles.searchField}>
              <Ionicons name="search" size={32} color="rgba(255, 255, 255, 0.64)" />
              <TextInput
                style={styles.searchInput}
                placeholder="Electronics, Pop, Rap..."
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
              Choose at least {selectedGenres.length}/{minimumGenres}
            </Text>
          </View>
          
          {/* Genre Grid */}
          <View style={styles.genreGrid}>
            {filteredGenres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreCard,
                  { backgroundColor: genre.color },
                  selectedGenres.includes(genre.id) && styles.selectedGenreCard
                ]}
                onPress={() => toggleGenre(genre.id)}
              >
                <Text style={styles.genreName}>{genre.name}</Text>
                {selectedGenres.includes(genre.id) && (
                  <View style={styles.checkmarkContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                  </View>
                )}
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
              selectedGenres.length >= minimumGenres ? styles.continueButtonActive : {}
            ]}
            onPress={handleContinue}
            disabled={selectedGenres.length < minimumGenres}
          >
            <Text style={[
              styles.continueText,
              selectedGenres.length < minimumGenres ? { color: 'rgba(18, 18, 18, 0.5)' } : {}
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
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  genreCard: {
    width: '48%',
    height: 98,
    borderRadius: 4,
    padding: 8,
    paddingLeft: 12,
    paddingRight: 50,
    marginBottom: 8,
    position: 'relative',
  },
  selectedGenreCard: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  genreName: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 19,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
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
