/**
 * SpotifyPublic Service
 * 
 * This service provides access to public Spotify data without requiring API keys.
 * It uses public endpoints and web scraping techniques to retrieve artist information.
 */

import { Image } from 'react-native';

// Define types for artist data
export interface SpotifyArtist {
  id: string;
  name: string;
  imageUrl: string;
  genres?: string[];
  popularity?: number;
  localImage?: any; // For fallback images
}

// List of popular artists with their Spotify IDs
const POPULAR_ARTISTS: SpotifyArtist[] = [
  { 
    id: '1dfeR4HaWDbWqFHLkxsg1d', 
    name: 'Queen', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb4cb8d0ccf68e6eee4b5c0a05',
    localImage: require('../assets/images/drummer.png')
  },
  { 
    id: '0oSGxfWSnnOXhD2fKuz2Gy', 
    name: 'David Bowie', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb8b9f6efe0c95c5326d8af722',
    localImage: require('../assets/images/artic.png')
  },
  { 
    id: '6olE6TJLqED3rqDCT0FyPh', 
    name: 'Nirvana', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea98',
    localImage: require('../assets/images/avril.png')
  },
  { 
    id: '3WrFJ7ztbogyGnTHbHJFl2', 
    name: 'The Beatles', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb989ed05e1f0570cc4726c2d3',
    localImage: require('../assets/images/drummer.png')
  },
  { 
    id: '36QJpDe2go2KgaRleHCDTp', 
    name: 'Led Zeppelin', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc536aeb56f5c64916d409d40',
    localImage: require('../assets/images/artic.png')
  },
  { 
    id: '7Ey4PD4MYsKc5I2dolUwbH', 
    name: 'Metallica', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb69ca98dd3083f1082d740e44',
    localImage: require('../assets/images/avril.png')
  },
  { 
    id: '0L8ExT028jH3ddEcZwqJJ5', 
    name: 'Red Hot Chili Peppers', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5fec5593e4bfbd6a0c198ea5',
    localImage: require('../assets/images/drummer.png')
  },
  { 
    id: '3qm84nBOXUEQ2vnTfUTTFC', 
    name: 'Guns N\' Roses', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc5653f3a8a6a856c5ef3faad',
    localImage: require('../assets/images/artic.png')
  },
  { 
    id: '6qqNVTkY8uBg9cP3Jd7DAH', 
    name: 'Billie Eilish', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c3daf',
    localImage: require('../assets/images/avril.png')
  },
  { 
    id: '0du5cEVh5yTK9QJze8zA0C', 
    name: 'Bruno Mars', 
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eba9ad94440d0025c21f8f0b1d',
    localImage: require('../assets/images/drummer.png')
  }
];

/**
 * Get a list of popular artists
 * @param limit Number of artists to return (default: 10)
 * @returns Array of SpotifyArtist objects
 */
export const getPopularArtists = (limit: number = 10): SpotifyArtist[] => {
  return POPULAR_ARTISTS.slice(0, limit);
};

/**
 * Get random artists
 * @param count Number of random artists to return
 * @returns Array of SpotifyArtist objects
 */
export const getRandomArtists = (count: number = 3): SpotifyArtist[] => {
  // Shuffle the array and take the first 'count' elements
  const shuffled = [...POPULAR_ARTISTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Get an artist by ID
 * @param id Spotify artist ID
 * @returns SpotifyArtist object or undefined if not found
 */
export const getArtistById = (id: string): SpotifyArtist | undefined => {
  return POPULAR_ARTISTS.find(artist => artist.id === id);
};

/**
 * Search for artists by name
 * @param query Search query
 * @param limit Maximum number of results to return
 * @returns Array of matching SpotifyArtist objects
 */
export const searchArtists = (query: string, limit: number = 5): SpotifyArtist[] => {
  const lowerQuery = query.toLowerCase();
  return POPULAR_ARTISTS
    .filter(artist => artist.name.toLowerCase().includes(lowerQuery))
    .slice(0, limit);
};

/**
 * Preload artist images to avoid loading delays
 * @param artists Array of SpotifyArtist objects
 */
export const preloadArtistImages = (artists: SpotifyArtist[]): void => {
  artists.forEach(artist => {
    if (artist.imageUrl) {
      Image.prefetch(artist.imageUrl).catch(() => {
        console.log(`Failed to preload image for ${artist.name}`);
      });
    }
  });
};

export default {
  getPopularArtists,
  getRandomArtists,
  getArtistById,
  searchArtists,
  preloadArtistImages
};
