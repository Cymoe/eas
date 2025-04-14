import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

interface SongItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image: any;
  verified?: boolean;
}

const THEME = {
  colors: {
    background: '#121212',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    accent: '#007AFF',
  },
};

export default function SongsWeKnowScreen() {
  const insets = useSafeAreaInsets();
  const { bandId } = useLocalSearchParams<{ bandId: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const songs: SongItem[] = [
    {
      id: '1',
      title: 'Song Title',
      artist: 'Artist Name',
      duration: '3:56',
      image: require('../assets/images/artic.png'),
      verified: true,
    },
    {
      id: '2',
      title: 'Song Title',
      artist: 'Artist Name',
      duration: '3:56',
      image: require('../assets/images/artic.png'),
      verified: true,
    },
    {
      id: '3',
      title: 'Song Title',
      artist: 'Artist Name',
      duration: '3:56',
      image: require('../assets/images/artic.png'),
      verified: true,
    },
    {
      id: '4',
      title: 'Song Title',
      artist: 'Artist Name',
      duration: '3:56',
      image: require('../assets/images/avril.png'),
    },
    {
      id: '5',
      title: 'Song Title',
      artist: 'Artist Name',
      duration: '3:56',
      image: require('../assets/images/avril.png'),
    },
    {
      id: '6',
      title: 'Song Title',
      artist: 'Artist Name',
      duration: '3:56',
      image: require('../assets/images/avril.png'),
    },
  ];

  const renderArtistHeader = (artistName: string, isFirst = false, isVerified = false) => (
    <View style={[styles.artistHeader, isFirst ? { marginTop: 0 } : null]}>
      <Text style={styles.artistName}>{artistName}</Text>
      {isVerified && (
        <Ionicons name="checkmark-circle" size={16} color={THEME.colors.accent} />
      )}
    </View>
  );

  const renderSongItem = ({ item, index }: { item: SongItem; index: number }) => {
    const isFirstInGroup = index === 0 || songs[index - 1].artist !== item.artist;
    
    return (
      <>
        {isFirstInGroup && renderArtistHeader(item.artist, index === 0, item.verified)}
        <View style={styles.songItem}>
          <Image source={item.image} style={styles.songImage} />
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songDuration}>{item.duration}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#777" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a title..."
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={songs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id}
          style={styles.songsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: THEME.colors.text,
    fontFamily: 'Poppins-Medium',
  },
  cancelButton: {
    color: THEME.colors.text,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  songsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  artistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    gap: 8,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.text,
    fontFamily: 'Poppins-Bold',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  songImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: THEME.colors.text,
    fontFamily: 'Poppins-Medium',
  },
  songDuration: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    fontFamily: 'Poppins-Medium',
  },
}); 