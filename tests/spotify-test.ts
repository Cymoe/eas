import { spotifyService } from '../services/spotify';

async function testSpotifyService() {
  try {
    // Test artist search
    console.log('Testing artist search...');
    const searchResults = await spotifyService.searchArtists('Queen');
    console.log('Search results:', JSON.stringify(searchResults, null, 2));

    if (searchResults && searchResults.length > 0) {
      const artistId = searchResults[0].id;
      
      // Test getting artist details
      console.log('\nTesting get artist details...');
      const artistDetails = await spotifyService.getArtist(artistId);
      console.log('Artist details:', JSON.stringify(artistDetails, null, 2));

      // Test getting top tracks
      console.log('\nTesting get top tracks...');
      const topTracks = await spotifyService.getArtistTopTracks(artistId);
      console.log('Top tracks:', JSON.stringify(topTracks, null, 2));

      // Test getting related artists
      console.log('\nTesting get related artists...');
      const relatedArtists = await spotifyService.getRelatedArtists(artistId);
      console.log('Related artists:', JSON.stringify(relatedArtists, null, 2));
    }

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testSpotifyService(); 