import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

// Types
export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  genres: string[];
  popularity: number;
  followers: { total: number };
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: { url: string; height: number; width: number }[];
    name: string;
    release_date: string;
  };
  artists: SpotifyArtist[];
  preview_url?: string;
  external_urls: { spotify: string };
}

interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

interface SpotifyPublicArtist {
  id: string;
  profile: {
    name: string;
    genres?: string[];
  };
  images: SpotifyImage[];
  genres?: string[];
  popularity?: number;
  followers?: { total: number };
}

interface SpotifyPublicTrack {
  id: string;
  name: string;
  album: {
    images: SpotifyImage[];
    name: string;
    release_date: string;
  };
  artists: SpotifyPublicArtist[];
  preview_url?: string;
}

interface SpotifyPublicResponse {
  data?: {
    artists?: {
      items: SpotifyPublicArtist[];
    };
    artist?: {
      id: string;
      profile: {
        name: string;
        genres?: string[];
      };
      images: SpotifyImage[];
      genres?: string[];
      popularity?: number;
      followers?: { total: number };
      tracks?: {
        items: SpotifyPublicTrack[];
      };
      related?: {
        items: SpotifyPublicArtist[];
      };
    };
  };
}

interface PaginatedResult<T> {
  items: T[];
  hasMore: boolean;
  nextOffset: number;
}

// Popular artists by genre
export const POPULAR_ARTISTS = {
  rock: [
    { id: '0k17h0D3J5VfsdmQ1iZtE9', name: 'Pink Floyd' },
    { id: '36QJpDe2go2KgaRleHCDTp', name: 'Led Zeppelin' },
    { id: '7Ey4PD4MYsKc5I2dolUwbH', name: 'Aerosmith' },
    { id: '6mdiAmATAx73kdxrNrnlao', name: 'Iron Maiden' },
    { id: '58lV9VcRSjABbAbfWS6skp', name: 'Bon Jovi' }
  ],
  pop: [
    { id: '06HL4z0CvFAxyc27GXpf02', name: 'Taylor Swift' },
    { id: '1uNFoZAHBGtllmzznpCI3s', name: 'Justin Bieber' },
    { id: '6vWDO969PvNqNYHIOW5v0m', name: 'Beyoncé' },
    { id: '3TVXtAsR1Inumwj472S9r4', name: 'Drake' },
    { id: '4dpARuHxo51G3z768sgnrY', name: 'Adele' }
  ],
  hiphop: [
    { id: '5K4W6rqBFWDnAN6FQUkS6x', name: 'Kanye West' },
    { id: '0Y5tJX1MQlPlqiwlOH1tJY', name: 'Travis Scott' },
    { id: '6l3HvQ5sa6mXTsMTB19rO5', name: 'J. Cole' },
    { id: '2YZyLoL8N0Wb9xBt1NhZWg', name: 'Kendrick Lamar' },
    { id: '7dGJo4pcD2V6oG8kP0tJRR', name: 'Eminem' }
  ],
  electronic: [
    { id: '4tZwfgrHOc3mvqYlEYSvVi', name: 'Daft Punk' },
    { id: '1vCWHaC5f2uS3yhpwWbIA6', name: 'Avicii' },
    { id: '1HY2Jd0NmPuamShAr6KMms', name: 'David Guetta' },
    { id: '5he5w2lnU9x7JFhnwcekXX', name: 'Skrillex' },
    { id: '4YRxDV8wJFPHPTeXepOstw', name: 'Deadmau5' }
  ],
  jazz: [
    { id: '0kbYTNQb4Pb1rPbbaF0pT4', name: 'Miles Davis' },
    { id: '2hGh5VOeeqimQFxqXvfCUf', name: 'John Coltrane' },
    { id: '5v74mT11KGJqadf9sLw4dA', name: 'Herbie Hancock' },
    { id: '0Xk15jHKly4c3AhPr5vjoA', name: 'Bill Evans' },
    { id: '4QQgXkCYTt3BlENzhyNETg', name: 'Earth, Wind & Fire' }
  ],
  indie: [
    { id: '53XhwfbYqKCa1cC15pYq2q', name: 'Imagine Dragons' },
    { id: '7Ln80lUS6He07XvHI8qqHH', name: 'Arctic Monkeys' },
    { id: '4LEiUm1SRbFMgfqnQTwUbQ', name: 'Bon Iver' },
    { id: '4YrKBkKSVeqDamzBPWVnSJ', name: 'Tame Impala' },
    { id: '4Z8W4fKeB5YxbusRsdQVPb', name: 'Radiohead' }
  ],
  metal: [
    { id: '2ye2Wgw4gimLv2eAKyk1NB', name: 'Metallica' },
    { id: '5M52tdBnJaKSvOpJGz8mfZ', name: 'Black Sabbath' },
    { id: '3RNrq3jvMZxD9ZyoOZbQOD', name: 'Pantera' },
    { id: '1Yox196W7bzVNZI7RBaPnf', name: 'Slipknot' },
    { id: '3qm84nBOXUEQ2vnTfUTTFC', name: 'Guns N Roses' }
  ],
  country: [
    { id: '4YLtscXsxbVgi031ovDDdh', name: 'Chris Stapleton' },
    { id: '66lH4jAE7pqPlOlzUKbwYo', name: 'Miranda Lambert' },
    { id: '4oUHIQIBe0LHzYfvXNW4QM', name: 'Morgan Wallen' },
    { id: '6roFdX1y5BYSbp60OTJWMd', name: 'Luke Bryan' },
    { id: '4YWj8sohRDjL9dVlDZJxNj', name: 'Carrie Underwood' }
  ],
  latin: [
    { id: '4q3ewBCX7sLwd24euuV69X', name: 'Bad Bunny' },
    { id: '1vyhD5VmyZ7KMfW5gqLgo5', name: 'J Balvin' },
    { id: '4VMYDCV2IEDYJArk749S6m', name: 'Daddy Yankee' },
    { id: '4SsVbpTthjScTS7U2hmr1X', name: 'Karol G' },
    { id: '1i8SpTcr7yvPOmcqrbnVXY', name: 'Ozuna' }
  ]
};

class SpotifyService {
  private readonly CLIENT_ID = '9e0d2e1b9d5e4ac1b4f53b3e3c31e5d6';
  private readonly CLIENT_SECRET = '8c1b4f53b3e3c31e5d69e0d2e1b9d5e4';
  private readonly REDIRECT_URI = 'bandmate://spotify-auth-callback';
  private readonly SCOPES = ['user-read-private', 'user-read-email'];
  private readonly AUTH_STORAGE_KEY = '@spotify_auth';
  private token: string | null = null;
  private tokenExpiry: number = 0;
  private clientToken: string | null = null;
  private clientTokenExpiry: number = 0;
  private readonly DELAY_BETWEEN_REQUESTS = 100; // ms
  private readonly BATCH_SIZE = 20;
  private readonly MAX_RETRIES = 3;

  constructor() {
    // Set up deep link handler
    Linking.addEventListener('url', this.handleRedirect);
  }

  private async handleRedirect({ url }: { url: string }) {
    if (!url.includes('spotify-auth-callback')) return;

    try {
      const params = new URLSearchParams(url.split('?')[1]);
      const code = params.get('code');
      if (!code) throw new Error('No code in redirect');

      await this.exchangeCodeForToken(code);
    } catch (error) {
      console.error('Auth redirect error:', error);
      throw error;
    }
  }

  private async exchangeCodeForToken(code: string) {
    try {
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64')
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.REDIRECT_URI
        }).toString()
      });

      if (!tokenResponse.ok) {
        throw new Error('Token exchange failed');
      }

      const data = await tokenResponse.json();
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Expire 1 min early

      // Store auth data
      await AsyncStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify({
        token: this.token,
        expiry: this.tokenExpiry,
        refreshToken: data.refresh_token
      }));
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  private async refreshToken() {
    try {
      const authData = await AsyncStorage.getItem(this.AUTH_STORAGE_KEY);
      if (!authData) throw new Error('No refresh token');

      const { refreshToken } = JSON.parse(authData);
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64')
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }).toString()
      });

      if (!response.ok) throw new Error('Token refresh failed');

      const data = await response.json();
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;

      await AsyncStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify({
        token: this.token,
        expiry: this.tokenExpiry,
        refreshToken: data.refresh_token || refreshToken
      }));
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  private async getValidToken(): Promise<string> {
    try {
      // Try to load stored token
      const authData = await AsyncStorage.getItem(this.AUTH_STORAGE_KEY);
      if (authData) {
        const { token, expiry } = JSON.parse(authData);
        if (expiry > Date.now()) {
          this.token = token;
          this.tokenExpiry = expiry;
        } else {
          await this.refreshToken();
        }
      }

      // If no valid token, start auth flow
      if (!this.token) {
        const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
          response_type: 'code',
          client_id: this.CLIENT_ID,
          scope: this.SCOPES.join(' '),
          redirect_uri: this.REDIRECT_URI,
        })}`;

        const result = await WebBrowser.openAuthSessionAsync(authUrl, this.REDIRECT_URI);
        if (result.type !== 'success') {
          throw new Error('Auth cancelled');
        }
      }

      return this.token!;
    } catch (error) {
      console.error('Token error:', error);
      throw error;
    }
  }

  // Get client credentials token for public endpoints
  private async getClientToken(): Promise<string> {
    try {
      // Check if we have a valid token
      if (this.clientToken && this.clientTokenExpiry > Date.now()) {
        return this.clientToken;
      }

      // Get new token
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64')
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials'
        }).toString()
      });

      if (!response.ok) {
        console.error('Token request failed:', await response.text());
        throw new Error('Client token request failed');
      }

      const data = await response.json();
      this.clientToken = data.access_token;
      this.clientTokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Expire 1 minute early

      if (!this.clientToken) throw new Error('No token received');
      return this.clientToken;
    } catch (error) {
      console.error('Client token error:', error);
      throw error;
    }
  }

  // Helper to handle rate limits
  private async handleRateLimit(response: Response): Promise<void> {
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '1');
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    }
  }

  // Public endpoints that don't require user auth
  async searchArtistsPublic(query: string, limit: number = 50): Promise<SpotifyArtist[]> {
    try {
      const token = await this.getClientToken();
      
      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, this.DELAY_BETWEEN_REQUESTS));
      
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(query)}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 429) {
        await this.handleRateLimit(response);
        return this.searchArtistsPublic(query, limit); // Retry after waiting
      }

      if (!response.ok) {
        console.error('Search failed:', await response.text());
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data.artists?.items) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format');
      }

      return data.artists.items
        .filter((item: any) => {
          if (!item?.id || !item?.name) {
            console.error('Invalid artist data:', item);
            return false;
          }
          return true;
        })
        .map((artist: any) => ({
          id: artist.id,
          name: artist.name,
          images: artist.images || [],
          genres: artist.genres || [],
          popularity: artist.popularity || 0,
          followers: { total: artist.followers?.total || 0 },
          external_urls: { spotify: artist.external_urls?.spotify || `https://open.spotify.com/artist/${artist.id}` }
        }));
    } catch (error) {
      console.error('Public search error:', error);
      throw error;
    }
  }

  async getArtistPublic(artistId: string): Promise<SpotifyArtist> {
    try {
      const token = await this.getClientToken();
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error(`Get artist failed: ${response.status}`);

      const artist = await response.json();
      return {
        id: artist.id,
        name: artist.name,
        images: artist.images || [],
        genres: artist.genres || [],
        popularity: artist.popularity || 0,
        followers: { total: artist.followers?.total || 0 },
        external_urls: { spotify: artist.external_urls?.spotify || `https://open.spotify.com/artist/${artist.id}` }
      };
    } catch (error) {
      console.error('Get public artist error:', error);
      throw error;
    }
  }

  async getArtistTopTracksPublic(artistId: string): Promise<SpotifyTrack[]> {
    try {
      const token = await this.getClientToken();
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error(`Get top tracks failed: ${response.status}`);

      const data = await response.json();
      return data.tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        album: {
          images: track.album.images || [],
          name: track.album.name,
          release_date: track.album.release_date
        },
        artists: track.artists.map((a: any) => ({
          id: a.id,
          name: a.name,
          images: [],
          genres: [],
          popularity: 0,
          followers: { total: 0 },
          external_urls: { spotify: a.external_urls?.spotify || `https://open.spotify.com/artist/${a.id}` }
        })),
        preview_url: track.preview_url,
        external_urls: { spotify: track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}` }
      }));
    } catch (error) {
      console.error('Get public top tracks error:', error);
      throw error;
    }
  }

  async getRelatedArtistsPublic(artistId: string): Promise<SpotifyArtist[]> {
    try {
      const token = await this.getClientToken();
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error(`Get related artists failed: ${response.status}`);

      const data = await response.json();
      return data.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        images: artist.images || [],
        genres: artist.genres || [],
        popularity: artist.popularity || 0,
        followers: { total: artist.followers?.total || 0 },
        external_urls: { spotify: artist.external_urls?.spotify || `https://open.spotify.com/artist/${artist.id}` }
      }));
    } catch (error) {
      console.error('Get public related artists error:', error);
      throw error;
    }
  }

  async searchArtists(query: string, limit: number = 50): Promise<SpotifyArtist[]> {
    try {
      const token = await this.getValidToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(query)}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error(`Search failed: ${response.status}`);

      const data = await response.json();
      return data.artists.items.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        images: artist.images || [],
        genres: artist.genres || [],
        popularity: artist.popularity || 0,
        followers: { total: artist.followers?.total || 0 },
        external_urls: { spotify: artist.external_urls?.spotify }
      }));
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  async getArtist(artistId: string): Promise<SpotifyArtist> {
    try {
      const token = await this.getValidToken();
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error(`Get artist failed: ${response.status}`);

      const artist = await response.json();
      return {
        id: artist.id,
        name: artist.name,
        images: artist.images || [],
        genres: artist.genres || [],
        popularity: artist.popularity || 0,
        followers: { total: artist.followers?.total || 0 },
        external_urls: { spotify: artist.external_urls?.spotify }
      };
    } catch (error) {
      console.error('Get artist error:', error);
      throw error;
    }
  }

  async getArtistTopTracks(artistId: string): Promise<SpotifyTrack[]> {
    try {
      const token = await this.getValidToken();
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error(`Get top tracks failed: ${response.status}`);

      const data = await response.json();
      return data.tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        album: {
          images: track.album.images || [],
          name: track.album.name,
          release_date: track.album.release_date
        },
        artists: track.artists.map((a: any) => ({
          id: a.id,
          name: a.name,
          images: [],
          genres: [],
          popularity: 0,
          followers: { total: 0 },
          external_urls: { spotify: a.external_urls?.spotify }
        })),
        preview_url: track.preview_url,
        external_urls: { spotify: track.external_urls?.spotify }
      }));
    } catch (error) {
      console.error('Get top tracks error:', error);
      throw error;
    }
  }

  async getRelatedArtists(artistId: string): Promise<SpotifyArtist[]> {
    try {
      const token = await this.getValidToken();
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error(`Get related artists failed: ${response.status}`);

      const data = await response.json();
      return data.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        images: artist.images || [],
        genres: artist.genres || [],
        popularity: artist.popularity || 0,
        followers: { total: artist.followers?.total || 0 },
        external_urls: { spotify: artist.external_urls?.spotify }
      }));
    } catch (error) {
      console.error('Get related artists error:', error);
      throw error;
    }
  }

  // Add method to get artists by genre
  async getArtistsByGenre(genre: keyof typeof POPULAR_ARTISTS): Promise<SpotifyArtist[]> {
    const artists = POPULAR_ARTISTS[genre];
    const results = await Promise.all(
      artists.map(artist => this.getArtistPublic(artist.id))
    );
    return results;
  }

  // Add method to get random artists across all genres
  async getRandomArtists(count: number = 10): Promise<SpotifyArtist[]> {
    const allArtists = Object.values(POPULAR_ARTISTS).flat();
    const shuffled = [...allArtists].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    const results = await Promise.all(
      selected.map(artist => this.getArtistPublic(artist.id))
    );
    return results;
  }

  // Add paginated search method
  async searchArtistsWithPagination(
    query: string,
    offset: number = 0,
    limit: number = this.BATCH_SIZE
  ): Promise<PaginatedResult<SpotifyArtist>> {
    try {
      const token = await this.getClientToken();
      await new Promise(resolve => setTimeout(resolve, this.DELAY_BETWEEN_REQUESTS));

      const response = await fetch(
        `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 429) {
        await this.handleRateLimit(response);
        return this.searchArtistsWithPagination(query, offset, limit);
      }

      if (!response.ok) {
        console.error('Search failed:', await response.text());
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data.artists?.items) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format');
      }

      const items = data.artists.items
        .filter((item: any) => item?.id && item?.name)
        .map((artist: any) => ({
          id: artist.id,
          name: artist.name,
          images: artist.images || [],
          genres: artist.genres || [],
          popularity: artist.popularity || 0,
          followers: { total: artist.followers?.total || 0 },
          external_urls: { spotify: artist.external_urls?.spotify || `https://open.spotify.com/artist/${artist.id}` }
        }));

      return {
        items,
        hasMore: data.artists.total > offset + limit,
        nextOffset: offset + limit
      };
    } catch (error) {
      console.error('Paginated search error:', error);
      throw error;
    }
  }

  // Add paginated genre method
  async getArtistsByGenreWithPagination(
    genre: keyof typeof POPULAR_ARTISTS,
    offset: number = 0,
    limit: number = this.BATCH_SIZE
  ): Promise<PaginatedResult<SpotifyArtist>> {
    const artists = POPULAR_ARTISTS[genre];
    const start = offset;
    const end = Math.min(start + limit, artists.length);
    const batch = artists.slice(start, end);

    const results = await Promise.all(
      batch.map(artist => this.getArtistPublic(artist.id))
    );

    return {
      items: results,
      hasMore: end < artists.length,
      nextOffset: end
    };
  }

  // Add paginated random artists method
  async getRandomArtistsWithPagination(
    offset: number = 0,
    limit: number = this.BATCH_SIZE,
    excludeIds: string[] = []
  ): Promise<PaginatedResult<SpotifyArtist>> {
    const allArtists = Object.values(POPULAR_ARTISTS)
      .flat()
      .filter(artist => !excludeIds.includes(artist.id));
    
    const shuffled = [...allArtists].sort(() => Math.random() - 0.5);
    const batch = shuffled.slice(offset, offset + limit);
    
    const results = await Promise.all(
      batch.map(artist => this.getArtistPublic(artist.id))
    );

    return {
      items: results,
      hasMore: offset + limit < allArtists.length,
      nextOffset: offset + limit
    };
  }
}

export const spotifyService = new SpotifyService(); 