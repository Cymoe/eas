import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Platform, ImageSourcePropType, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const THEME = {
  colors: {
    background: '#121212',
    searchBg: '#313131',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    headerBg: '#1F1F1F',
  },
};

interface FanItemProps {
  name: string;
  image: ImageSourcePropType;
  verified: boolean;
}

const FanItem = ({ name, image, verified }: FanItemProps) => (
  <View style={styles.fanItem}>
    <View style={styles.titleImgContainer}>
      <Image 
        source={image} 
        style={styles.artistImage}
        defaultSource={require('../assets/images/avatar.png')}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.artistName}>{name}</Text>
        {verified && (
          <Ionicons name="checkmark-circle" size={16} color="#007AFF" />
        )}
      </View>
    </View>
  </View>
);

const GridItem = ({ name, image }: FanItemProps) => (
  <View style={styles.gridItem}>
    <Image 
      source={image} 
      style={styles.gridImage}
      defaultSource={require('../assets/images/avatar.png')}
    />
    <Text style={styles.gridName}>{name}</Text>
  </View>
);

const FansScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { bandId } = useLocalSearchParams<{ bandId: string }>();

  // Sample data for artists
  const artists = [
    { id: '1', name: 'Arctic Monkeys', image: require('../assets/images/avatar.png'), verified: true },
    { id: '2', name: 'Blur', image: require('../assets/images/avatar.png'), verified: true },
    { id: '3', name: 'Beastie Boys', image: require('../assets/images/avatar.png'), verified: true },
    { id: '4', name: 'Coldplay', image: require('../assets/images/avatar.png'), verified: false },
    { id: '5', name: 'David Bowie', image: require('../assets/images/avatar.png'), verified: true },
    { id: '6', name: 'Depeche Mode', image: require('../assets/images/avatar.png'), verified: true },
    { id: '7', name: 'Greenday', image: require('../assets/images/avatar.png'), verified: false },
    { id: '8', name: 'Massive Attack', image: require('../assets/images/avatar.png'), verified: true },
    { id: '9', name: 'Oasis', image: require('../assets/images/avatar.png'), verified: true },
    { id: '10', name: 'Placebo', image: require('../assets/images/avatar.png'), verified: false },
    { id: '11', name: 'Radiohead', image: require('../assets/images/avatar.png'), verified: true },
    { id: '12', name: 'Rage Against The Machine', image: require('../assets/images/avatar.png'), verified: true },
    { id: '13', name: 'Red Hot Chili Peppers', image: require('../assets/images/avatar.png'), verified: true },
    { id: '14', name: 'The Clash', image: require('../assets/images/avatar.png'), verified: false },
    { id: '15', name: 'The Beatles', image: require('../assets/images/avatar.png'), verified: true },
  ];

  const toggleView = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for an Artist, Band..."
            placeholderTextColor="#B3B3B3"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.sortContainer}>
          <Ionicons name="swap-vertical" size={24} color="#FFFFFF" />
          <Text style={styles.sortText}>A-Z</Text>
        </View>
        <TouchableOpacity onPress={toggleView}>
          <Ionicons 
            name={viewMode === 'list' ? 'grid' : 'list'} 
            size={24} 
            color="rgba(255, 255, 255, 0.64)" 
          />
        </TouchableOpacity>
      </View>

      {viewMode === 'list' ? (
        <ScrollView style={styles.fanList}>
          {artists.map((artist) => (
            <FanItem
              key={artist.id}
              name={artist.name}
              image={artist.image}
              verified={artist.verified}
            />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={artists}
          renderItem={({ item }) => (
            <GridItem
              name={item.name}
              image={item.image}
              verified={item.verified}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.gridContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 16,
    backgroundColor: THEME.colors.headerBg,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.searchBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: THEME.colors.text,
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  cancelButton: {
    color: THEME.colors.text,
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 24,
    marginTop: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    color: THEME.colors.text,
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  fanList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  fanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    marginBottom: 12,
  },
  titleImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  artistImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  artistName: {
    color: THEME.colors.text,
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  // Grid view styles
  gridContainer: {
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  gridItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 24,
  },
  gridImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  gridName: {
    color: THEME.colors.text,
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 100,
  }
});

export default FansScreen; 