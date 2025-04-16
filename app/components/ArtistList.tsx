import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import { spotifyService, SpotifyArtist, POPULAR_ARTISTS } from '../../services/spotify';

interface ArtistListProps {
  searchQuery?: string;
  genre?: keyof typeof POPULAR_ARTISTS;
  isRandom?: boolean;
}

export const ArtistList = ({ searchQuery, genre, isRandom }: ArtistListProps) => {
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadArtists = useCallback(async () => {
    console.log('loadArtists called', { loading, hasMore, offset, isInitialLoad });
    if (loading || !hasMore) {
      console.log('Skipping load:', { loading, hasMore });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let result;
      if (searchQuery) {
        console.log('Loading search results:', { searchQuery, offset });
        result = await spotifyService.searchArtistsWithPagination(searchQuery, offset);
      } else if (genre && Object.keys(POPULAR_ARTISTS).includes(genre)) {
        console.log('Loading genre:', { genre, offset });
        result = await spotifyService.getArtistsByGenreWithPagination(
          genre as keyof typeof POPULAR_ARTISTS,
          offset
        );
      } else if (isRandom) {
        console.log('Loading random:', { offset });
        result = await spotifyService.getRandomArtistsWithPagination(offset, 20, artists.map(a => a.id));
      }

      console.log('Load result:', { 
        itemsReceived: result?.items?.length, 
        hasMore: result?.hasMore,
        nextOffset: result?.nextOffset 
      });

      if (!result || result.items.length === 0) {
        setHasMore(false);
      } else {
        setArtists(prev => [...prev, ...result.items]);
        setHasMore(result.hasMore);
        setOffset(result.nextOffset);
      }
    } catch (err) {
      console.error('Load error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load artists');
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [searchQuery, genre, isRandom, offset, loading, hasMore, artists]);

  useEffect(() => {
    console.log('Input changed, resetting list:', { searchQuery, genre, isRandom });
    setArtists([]);
    setOffset(0);
    setHasMore(true);
    setIsInitialLoad(true);
    loadArtists();
  }, [searchQuery, genre, isRandom]);

  const handleEndReached = useCallback(() => {
    console.log('End reached', { isInitialLoad, loading, hasMore });
    if (!isInitialLoad && !loading && hasMore) {
      loadArtists();
    }
  }, [isInitialLoad, loading, hasMore, loadArtists]);

  const renderArtist = ({ item }: { item: SpotifyArtist }) => {
    const imageUrl = item.images[0]?.url || 'default_image_url';
    
    return (
      <View style={styles.artistCard}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.artistImage}
        />
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>
            {item.name}
          </Text>
          {item.genres.length > 0 && (
            <Text style={styles.genres}>
              {item.genres.slice(0, 2).join(', ')}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#FF4B4B" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading && isInitialLoad) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No artists found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={artists}
          renderItem={renderArtist}
          keyExtractor={item => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onScroll={event => {
            const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
            const paddingToBottom = 20;
            const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= 
              contentSize.height - paddingToBottom;
            
            console.log('Scroll position:', {
              isCloseToBottom,
              currentHeight: layoutMeasurement.height + contentOffset.y,
              totalHeight: contentSize.height,
              remaining: contentSize.height - (layoutMeasurement.height + contentOffset.y)
            });
          }}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[
            styles.list,
            artists.length === 0 && styles.emptyList
          ]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          windowSize={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
        />
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 32 - CARD_MARGIN) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  artistCard: {
    width: CARD_WIDTH,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  artistImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
  },
  artistInfo: {
    padding: 8,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  genres: {
    fontSize: 12,
    marginTop: 4,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  footer: {
    paddingVertical: 12,
  },
  error: {
    padding: 12,
    textAlign: 'center',
    color: '#F41857',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.48)',
  },
}); 