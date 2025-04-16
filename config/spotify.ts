export const SPOTIFY_CONFIG = {
  CLIENT_ID: 'fee9b6ee57c94bcb9a58d1ae02729b07',
  CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '', // Add this to your .env file
  REDIRECT_URI: 'bandmate://spotify-auth-callback',
  AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
  TOKEN_ENDPOINT: 'https://accounts.spotify.com/api/token',
  API_ENDPOINT: 'https://api.spotify.com/v1',
  SCOPES: [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-library-read'
  ],
  CACHE_KEYS: {
    ACCESS_TOKEN: '@spotify_access_token',
    REFRESH_TOKEN: '@spotify_refresh_token',
    USER_ID: '@spotify_user_id'
  }
}; 