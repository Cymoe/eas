import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spotifyService, type SpotifyArtist } from '../../services/spotify';
import { Colors } from '../../constants/Colors';
import { spacing } from '../../constants/Spacing';
import styled from 'styled-components/native';

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

// Default artists if API fails
const DEFAULT_ARTISTS: SpotifyArtist[] = [
  {
    id: '1dfeR4HaWDbWqFHLkxsg1d',
    name: 'Queen',
    images: [{ url: 'https://i.scdn.co/image/b040846ceba13c3e9c125d68389491094e7f2982', height: 640, width: 640 }],
    genres: ['classic rock', 'rock'],
    popularity: 100,
    followers: { total: 30000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d' }
  },
  {
    id: '3WrFJ7ztbogyGnTHbHJFl2',
    name: 'The Beatles',
    images: [{ url: 'https://i.scdn.co/image/6b2a709752ef9c7aaf0d270344157f6cd2e0f1a7', height: 640, width: 640 }],
    genres: ['british invasion', 'classic rock'],
    popularity: 100,
    followers: { total: 25000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2' }
  },
  {
    id: '0k17h0D3J5VfsdmQ1iZtE9',
    name: 'Pink Floyd',
    images: [{ url: 'https://i.scdn.co/image/d011c95081cd9a329e506abd7ded47535d524a07', height: 640, width: 640 }],
    genres: ['art rock', 'classic rock'],
    popularity: 100,
    followers: { total: 20000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9' }
  },
  {
    id: '36QJpDe2go2KgaRleHCDTp',
    name: 'Led Zeppelin',
    images: [{ url: 'https://i.scdn.co/image/207803ce008388d3427a685254f9de6a8f61dc2e', height: 640, width: 640 }],
    genres: ['album rock', 'classic rock'],
    popularity: 100,
    followers: { total: 15000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/36QJpDe2go2KgaRleHCDTp' }
  },
  {
    id: '3fMbdgg4jU18AjLCKBhRSm',
    name: 'Michael Jackson',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb0e08ea2c4d6789fbf5cbe0aa', height: 640, width: 640 }],
    genres: ['pop', 'r&b'],
    popularity: 100,
    followers: { total: 25000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm' }
  },
  {
    id: '7Ey4PD4MYsKc5I2dolUwbH',
    name: 'Metallica',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb69a0a9c2a434c6f26a95471d', height: 640, width: 640 }],
    genres: ['metal', 'rock'],
    popularity: 100,
    followers: { total: 18000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/7Ey4PD4MYsKc5I2dolUwbH' }
  },
  {
    id: '6XyY86QOPPrYVGvF9ch6wz',
    name: 'Linkin Park',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb811f3b785b6ef52632f49d27', height: 640, width: 640 }],
    genres: ['alternative metal', 'nu metal'],
    popularity: 100,
    followers: { total: 16000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz' }
  },
  {
    id: '3YQKmKGau1PzlVlkL1iodx',
    name: 'Twenty One Pilots',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb056f2c37c031b9d2db67ee82', height: 640, width: 640 }],
    genres: ['modern rock', 'rock'],
    popularity: 100,
    followers: { total: 14000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/3YQKmKGau1PzlVlkL1iodx' }
  },
  {
    id: '53XhwfbYqKCa1cC15pYq2q',
    name: 'Imagine Dragons',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb920dc1f617550de8388f368e', height: 640, width: 640 }],
    genres: ['modern rock', 'pop rock'],
    popularity: 100,
    followers: { total: 15000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/53XhwfbYqKCa1cC15pYq2q' }
  },
  {
    id: '6deZN1bslXzeGvOLaLMOIF',
    name: 'Nickelback',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb7d9c4f06da8d0d982d0d9823', height: 640, width: 640 }],
    genres: ['alternative metal', 'post-grunge'],
    popularity: 100,
    followers: { total: 13000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/6deZN1bslXzeGvOLaLMOIF' }
  },
  {
    id: '4gzpq5DPGxSnKTe4SA8HAU',
    name: 'Coldplay',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb989ed05e1f0570cc4726c2d3', height: 640, width: 640 }],
    genres: ['permanent wave', 'pop'],
    popularity: 100,
    followers: { total: 17000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU' }
  },
  {
    id: '6olE6TJLqED3rqDCT0FyPh',
    name: 'Nirvana',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36', height: 640, width: 640 }],
    genres: ['alternative rock', 'grunge'],
    popularity: 100,
    followers: { total: 14000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/6olE6TJLqED3rqDCT0FyPh' }
  },
  {
    id: '0L8ExT028jH3ddEcZwqJJ5',
    name: 'Red Hot Chili Peppers',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb5fdb0b89e2881970c0e87e7e', height: 640, width: 640 }],
    genres: ['alternative rock', 'funk rock'],
    popularity: 100,
    followers: { total: 16000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/0L8ExT028jH3ddEcZwqJJ5' }
  },
  {
    id: '3RNrq3jvMZxD9ZyoOZbQOD',
    name: 'Korn',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb4856a724ad9c8531e3bc1d28', height: 640, width: 640 }],
    genres: ['alternative metal', 'nu metal'],
    popularity: 100,
    followers: { total: 12000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/3RNrq3jvMZxD9ZyoOZbQOD' }
  },
  {
    id: '2ye2Wgw4gimLv2eAKyk1NB',
    name: 'Metallica',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb69a0a9c2a434c6f26a95471d', height: 640, width: 640 }],
    genres: ['metal', 'rock'],
    popularity: 100,
    followers: { total: 18000000 },
    external_urls: { spotify: 'https://open.spotify.com/artist/2ye2Wgw4gimLv2eAKyk1NB' }
  }
];

interface StyledProps {
  selected?: boolean;
  color?: string;
}

const ArtistGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${spacing.md}px;
`;

const ArtistContainer = styled.TouchableOpacity`
  width: 108px;
  align-items: center;
  margin-bottom: 24px;
`;

const ArtistImageContainer = styled.View<StyledProps>`
  width: 108px;
  height: 108px;
  border-radius: 54px;
  overflow: hidden;
  border: 2px solid ${(props: StyledProps) => props.selected ? Colors.accent : Colors.white};
  opacity: ${(props: StyledProps) => props.selected ? 1 : 0.48};
`;

const ArtistImagePlaceholder = styled.View<StyledProps>`
  width: 100%;
  height: 100%;
  border-radius: 54px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: StyledProps) => props.color || Colors.accent};
`;

const ArtistImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ArtistInitial = styled.Text`
  font-family: 'Poppins';
  font-size: 40px;
  font-weight: bold;
  color: ${Colors.white};
`;

const CheckmarkContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-24px) translateY(-24px);
`;

const ArtistName = styled.Text`
  font-family: 'Poppins';
  font-size: 12px;
  font-weight: 500;
  color: ${Colors.white};
  text-align: center;
  line-height: 16px;
`;

export default function ArtistsScreen() {
  const [selectedArtists, setSelectedArtists] = useState<SpotifyArtist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SpotifyArtist[]>([]);
  const [popularArtists, setPopularArtists] = useState<SpotifyArtist[]>(DEFAULT_ARTISTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const minimumArtists = 3;
  const BATCH_SIZE = 20;
  const flatListRef = useRef<FlatList>(null);

  // Load popular artists on mount
  useEffect(() => {
    const loadPopularArtists = async () => {
      if (popularArtists.length > DEFAULT_ARTISTS.length) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const popularNames = [
          // Rock Legends
          'Beatles', 'Queen', 'Pink Floyd', 'Led Zeppelin', 'Rolling Stones',
          'AC/DC', 'Guns N Roses', 'Aerosmith', 'The Who', 'Deep Purple',
          
          // Modern Rock
          'Arctic Monkeys', 'The Strokes', 'The Killers', 'Muse', 'Foo Fighters',
          'Green Day', 'Linkin Park', 'System of a Down', 'Pearl Jam', 'Red Hot Chili Peppers',
          
          // Metal
          'Metallica', 'Iron Maiden', 'Black Sabbath', 'Slayer', 'Megadeth',
          'Pantera', 'Tool', 'Rammstein', 'Slipknot', 'Korn',
          
          // Alternative/Grunge
          'Nirvana', 'Radiohead', 'The Cure', 'Depeche Mode', 'Joy Division',
          'The Smiths', 'Pixies', 'Sonic Youth', 'Smashing Pumpkins', 'Nine Inch Nails',
          
          // Pop/Rock
          'U2', 'Coldplay', 'Oasis', 'R.E.M.', 'The Police',
          'David Bowie', 'Elton John', 'Queen', 'The Eagles', 'Fleetwood Mac',
          
          // Progressive Rock
          'Rush', 'Yes', 'Genesis', 'King Crimson', 'Jethro Tull',
          'Dream Theater', 'Porcupine Tree', 'Opeth', 'Pink Floyd', 'Tool',
          
          // Punk
          'Ramones', 'Sex Pistols', 'The Clash', 'Dead Kennedys', 'Black Flag',
          'Bad Religion', 'NOFX', 'Rancid', 'The Offspring', 'Blink-182',
          
          // Modern Metal
          'Avenged Sevenfold', 'Bullet For My Valentine', 'Trivium', 'Mastodon', 'Gojira',
          'Lamb of God', 'Machine Head', 'In Flames', 'Killswitch Engage', 'Five Finger Death Punch',
          
          // Indie Rock
          'The White Stripes', 'Arcade Fire', 'The Black Keys', 'Vampire Weekend', 'MGMT',
          'Tame Impala', 'The National', 'Modest Mouse', 'Death Cab for Cutie'
        ];
        
        // Remove duplicates
        const uniqueNames = [...new Set(popularNames)];
        
        const artistPromises = uniqueNames.map(name => 
          spotifyService.searchArtistsPublic(name)
            .then(results => results?.[0])
            .catch(err => {
              console.error(`Error loading ${name}:`, err);
              return null;
            })
        );
        
        const results = await Promise.allSettled(artistPromises);
        const artists = results
          .filter((result): result is PromiseFulfilledResult<SpotifyArtist> => 
            result.status === 'fulfilled' && result.value !== null
          )
          .map(result => result.value);
        
        if (artists.length > 0) {
          setPopularArtists(artists);
        }
      } catch (err) {
        console.error('Error loading popular artists:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularArtists();
  }, []);

  // Debounced search using public endpoint with pagination
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        setError(null);
        setOffset(0); // Reset offset when search query changes
        setHasMore(true); // Reset hasMore when search query changes
        setSearchResults([]); // Clear previous results
        try {
          const results = await spotifyService.searchArtistsWithPagination(searchQuery, 0, BATCH_SIZE);
          setSearchResults(results.items);
          setHasMore(results.hasMore);
          setOffset(results.nextOffset);
        } catch (err) {
          setError('Failed to search artists. Please try again.');
          console.error('Search error:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setOffset(0);
        setHasMore(true);
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const loadMoreArtists = useCallback(async () => {
    if (!hasMore || isLoadingMore || isLoading || !searchQuery.trim()) return;
    
    console.log('Loading more artists at offset:', offset);
    setIsLoadingMore(true);
    try {
      const results = await spotifyService.searchArtistsWithPagination(searchQuery, offset, BATCH_SIZE);
      console.log('Loaded', results.items.length, 'more artists, hasMore:', results.hasMore);
      setSearchResults(prev => [...prev, ...results.items]);
      setHasMore(results.hasMore);
      setOffset(results.nextOffset);
    } catch (err) {
      console.error('Error loading more artists:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, isLoading, searchQuery, offset]);

  const handleEndReached = () => {
    console.log('End reached, hasMore:', hasMore, 'isLoadingMore:', isLoadingMore);
    if (searchQuery.trim() && hasMore && !isLoadingMore) {
      loadMoreArtists();
    }
  };

  const toggleArtist = (artist: SpotifyArtist) => {
    setSelectedArtists(prev => {
      const isSelected = prev.some(a => a.id === artist.id);
      if (isSelected) {
        return prev.filter(a => a.id !== artist.id);
      } else {
        return [...prev, artist];
      }
    });
  };

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('selectedArtists', JSON.stringify(selectedArtists));
      router.push('/onboarding/final');
    } catch (error) {
      console.error('Error saving artists:', error);
    }
  };

  // Determine which artists to display
  const displayedArtists = searchQuery.trim() ? searchResults : popularArtists;

  const renderArtistItem = ({ item: artist }: { item: SpotifyArtist }) => {
    const isSelected = selectedArtists.some(a => a.id === artist.id);
    const color = getColorForArtist(parseInt(artist.id));
    
    return (
      <ArtistContainer key={artist.id} onPress={() => toggleArtist(artist)}>
        <ArtistImageContainer selected={isSelected}>
          {artist.images?.[0]?.url ? (
            <ArtistImage source={{ uri: artist.images[0].url }} />
          ) : (
            <ArtistImagePlaceholder color={color}>
              <ArtistInitial>{artist.name[0]}</ArtistInitial>
            </ArtistImagePlaceholder>
          )}
          {isSelected && (
            <CheckmarkContainer>
              <Ionicons name="checkmark-circle" size={48} color={Colors.green} />
            </CheckmarkContainer>
          )}
        </ArtistImageContainer>
        <ArtistName>{artist.name}</ArtistName>
      </ArtistContainer>
    );
  };

  const ListFooterComponent = () => {
    if (!searchQuery.trim() || (!isLoadingMore && !hasMore)) return null;
    
    return (
      <View style={styles.loadingMoreContainer}>
        {isLoadingMore && <ActivityIndicator color="rgba(255, 255, 255, 0.64)" />}
        {!isLoadingMore && hasMore && (
          <TouchableOpacity onPress={loadMoreArtists}>
            <Text style={styles.loadMoreText}>Load more</Text>
          </TouchableOpacity>
        )}
      </View>
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

      {/* Main Content Area */}
      <View style={styles.mainContent}>
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
              placeholder="Search for artists..."
              placeholderTextColor="rgba(255, 255, 255, 0.48)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {isLoading && !isLoadingMore && (
              <ActivityIndicator color="rgba(255, 255, 255, 0.64)" />
            )}
          </View>
          <Text style={styles.searchHint}>
            {error || "Search for your favorite artists"}
          </Text>
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
          {isLoading && displayedArtists.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="rgba(255, 255, 255, 0.64)" />
              <Text style={styles.loadingText}>Loading artists...</Text>
            </View>
          ) : displayedArtists.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={displayedArtists}
              renderItem={renderArtistItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={styles.flatListContent}
              columnWrapperStyle={styles.columnWrapper}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.3}
              ListFooterComponent={ListFooterComponent}
              showsVerticalScrollIndicator={false}
              initialNumToRender={BATCH_SIZE}
              maxToRenderPerBatch={BATCH_SIZE}
              windowSize={5}
            />
          ) : searchQuery.trim() ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No artists found</Text>
              <Text style={styles.noResultsSubtext}>Try searching for something else</Text>
            </View>
          ) : error ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>Could not load artists</Text>
              <Text style={styles.noResultsSubtext}>Please try searching instead</Text>
            </View>
          ) : null}
        </View>

        {/* Selected Artists Section */}
        {selectedArtists.length > 0 && (
          <View style={styles.selectedSection}>
            <Text style={styles.selectedTitle}>Selected Artists</Text>
            <View style={styles.selectedGrid}>
              {selectedArtists.map((artist) => (
                <TouchableOpacity
                  key={artist.id}
                  style={styles.selectedArtistChip}
                  onPress={() => toggleArtist(artist)}
                >
                  {artist.images?.[0]?.url && (
                    <Image 
                      source={{ uri: artist.images[0].url }}
                      style={styles.selectedArtistImage}
                    />
                  )}
                  <Text style={styles.selectedArtistName}>{artist.name}</Text>
                  <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.64)" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

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
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginTop: 16,
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
    flex: 1,
    marginTop: 8,
  },
  flatListContent: {
    paddingBottom: 120, // Add extra padding at bottom to ensure we can scroll past the last row
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.64)',
    marginTop: 16,
  },
  loadingMoreContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadMoreText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    textDecorationLine: 'underline',
  },
  selectedSection: {
    marginTop: 24,
  },
  selectedTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  selectedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedArtistChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  selectedArtistImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  selectedArtistName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: 'rgba(255, 255, 255, 0.64)',
    fontSize: 14,
  },
});
