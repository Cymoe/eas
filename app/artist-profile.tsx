import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ArtistProfileScreen() {
  // Get parameters passed to this screen
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroContainer}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/avril.png')} 
                style={styles.artistImage} 
              />
              <LinearGradient
                colors={['rgba(20, 20, 20, 0.64)', 'rgba(96, 96, 96, 0)']}
                style={styles.imageGradient}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0.64 }}
              />
              
              <View style={styles.backButtonContainer}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.artistInfoContainer}>
                <View style={styles.artistInfo}>
                  <Text style={styles.artistName}>{name || 'Viktor'}:28</Text>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={12} color="#EBEAEC" />
                    <Text style={styles.locationText}>Los Angeles, CA</Text>
                    <Text style={styles.distanceText}>33 km</Text>
                  </View>
                </View>
                <Text style={styles.artistSubtitle}>Solo Artist</Text>
              </View>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.dislikeButton]}>
                <View style={styles.actionButtonIcon}>
                  <Ionicons name="close" size={24} color="#121212" />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
                <View style={styles.actionButtonIcon}>
                  <Ionicons name="chatbubble" size={24} color="#121212" />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
                <View style={styles.actionButtonIcon}>
                  <Ionicons name="heart" size={24} color="#121212" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Viktor</Text>
          <Text style={styles.sectionText}>
            Solo artist with 8 years of experience. Looking to find musicians for jam sessions. 
            Influenced by rock, indie, and alternative music mostly into 90s era.
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        {/* Latest Release Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest release</Text>
          <View style={styles.latestReleaseContainer}>
            <View style={styles.latestReleaseCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop' }} 
                style={styles.latestReleaseImage} 
              />
              <View style={styles.latestReleaseOverlay}>
                <View style={styles.latestReleaseInfo}>
                  <View style={styles.postedByContainer}>
                    <Image
                      source={require('../assets/images/avril.png')}
                      style={styles.postedByAvatar}
                    />
                    <Text style={styles.postedByText}>Posted by Artist</Text>
                  </View>
                  <View style={styles.albumInfoContainer}>
                    <View style={styles.albumArtContainer}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop' }}
                        style={styles.albumArtThumbnail}
                      />
                    </View>
                    <View style={styles.albumDetails}>
                      <Text style={styles.albumTitle}>The Car</Text>
                      <Text style={styles.albumType}>Album</Text>
                    </View>
                    <TouchableOpacity style={styles.albumArrow}>
                      <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Music Style Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Music style</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Blues</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Rock</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Soul</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Instruments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bass</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Beginner</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.instrumentSection}>
          <Text style={styles.sectionTitle}>Guitar</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Intermediate</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.instrumentSection}>
          <Text style={styles.sectionTitle}>Piano</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Legend</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.instrumentSection}>
          <Text style={styles.sectionTitle}>Voice</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Advanced</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Looking For Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Looking for</Text>
            <TouchableOpacity 
              style={styles.showAllButton}
              onPress={() => router.push('/looking-for')}
            >
              <Text style={styles.sectionHeaderRight}>Edit</Text>
              <Ionicons name="chevron-forward" size={16} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Jam Sessions</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Studio time</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Band members</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Availability Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Availability</Text>
            <TouchableOpacity 
              style={styles.showAllButton}
              onPress={() => router.push('/availability')}
            >
              <Text style={styles.sectionHeaderRight}>Edit</Text>
              <Ionicons name="chevron-forward" size={16} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Weekdays</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Weekends</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Fan Of Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fan of</Text>
          <View style={styles.fanOfContainer}>
            <View style={styles.fanItem}>
              <Image 
                source={require('../assets/images/drummer.png')} 
                style={styles.fanImage} 
              />
              <Text style={styles.fanName}>Freddie</Text>
            </View>
            
            <View style={styles.fanItem}>
              <Image 
                source={require('../assets/images/artic.png')} 
                style={styles.fanImage} 
              />
              <Text style={styles.fanName}>David Bowie</Text>
            </View>
            
            <View style={styles.fanItem}>
              <Image 
                source={require('../assets/images/avril.png')} 
                style={styles.fanImage} 
              />
              <Text style={styles.fanName}>Nirvana</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Languages Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <TouchableOpacity 
              style={styles.showAllButton}
              onPress={() => router.push('/languages')}
            >
              <Text style={styles.sectionHeaderRight}>Edit</Text>
              <Ionicons name="chevron-forward" size={16} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            <View style={styles.languageTag}>
              <Ionicons name="language" size={16} color="#FFFFFF" />
              <Text style={styles.tagText}>English</Text>
            </View>
            <View style={styles.languageTag}>
              <Ionicons name="language" size={16} color="#FFFFFF" />
              <Text style={styles.tagText}>French</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Popular Releases Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <MaterialIcons name="library-music" size={20} color="#1ED760" />
              <Text style={styles.sectionTitle}>Popular releases</Text>
            </View>
            <Text style={styles.sectionHeaderRight}>Show all</Text>
          </View>
          
          <View style={styles.releasesList}>
            <View style={styles.releaseItem}>
              <Image 
                source={require('../assets/images/avril.png')} 
                style={styles.releaseImage} 
              />
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>Favorite song right now</Text>
                <Text style={styles.releaseArtist}>Single • Viktor:28</Text>
              </View>
            </View>
            
            <View style={styles.releaseItem}>
              <Image 
                source={require('../assets/images/drummer.png')} 
                style={styles.releaseImage} 
              />
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>Windshield People Don't Jam</Text>
                <Text style={styles.releaseArtist}>Single • Viktor:28</Text>
              </View>
            </View>
            
            <View style={styles.releaseItem}>
              <Image 
                source={require('../assets/images/artic.png')} 
                style={styles.releaseImage} 
              />
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>This Charming Man - 2011 Remaster</Text>
                <Text style={styles.releaseArtist}>Single • Viktor:28</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        {/* Songs Viktor Knows Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Ionicons name="musical-notes" size={20} color="#1ED760" />
              <Text style={styles.sectionTitle}>Songs Viktor Knows</Text>
            </View>
            <TouchableOpacity 
              style={styles.showAllButton}
              onPress={() => router.push(`/songs-we-know?artistId=${1}`)}
            >
              <Text style={styles.sectionHeaderRight}>Show all</Text>
              <Ionicons name="chevron-forward" size={16} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.songsList}>
            <View style={styles.songItem}>
              <Image 
                source={require('../assets/images/artic.png')} 
                style={styles.songImage} 
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>Live Forever - Remastered</Text>
                <Text style={styles.songArtist}>Oasis</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} color="#B3B3B3" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.songItem}>
              <Image 
                source={require('../assets/images/avril.png')} 
                style={styles.songImage} 
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>This Charming Man - 2011 Remaster</Text>
                <Text style={styles.songArtist}>The Smiths</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} color="#B3B3B3" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.songItem}>
              <Image 
                source={require('../assets/images/drummer.png')} 
                style={styles.songImage} 
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>Lucky Man</Text>
                <Text style={styles.songArtist}>The Verve</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} color="#B3B3B3" />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.seeDiscographyButton}>
            <Text style={styles.seeDiscographyText}>See all songs</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        {/* Connect Button */}
        <View style={styles.connectButtonContainer}>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    width: '100%',
    height: 462,
  },
  heroContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'linear-gradient(360deg, #121212 27.03%, rgba(25, 20, 20, 0) 72.58%)',
  },
  imageContainer: {
    width: '100%',
    height: 390,
    position: 'relative',
  },
  artistImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  backButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 48,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(16px)',
  },
  artistInfoContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  artistInfo: {
    marginBottom: 8,
  },
  artistName: {
    fontFamily: 'Abril Fatface',
    fontSize: 44,
    lineHeight: 60,
    color: '#FFFFFF',
    letterSpacing: -2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  distanceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    opacity: 0.64,
    marginLeft: 4,
  },
  artistSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginTop: 12,
    gap: 16,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#F41857',
    transform: [{ rotate: '180deg' }],
  },
  messageButton: {
    backgroundColor: '#007AFF',
    transform: [{ rotate: '-90deg' }],
  },
  likeButton: {
    backgroundColor: '#1ED760',
  },
  actionButtonIcon: {
    transform: [{ rotate: '180deg' }],
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#262626',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    lineHeight: 21,
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  sectionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: '#B3B3B3',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: '#313131',
    borderRadius: 16,
  },
  tagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  instrumentSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionHeaderRight: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    color: '#B3B3B3',
  },
  releasesList: {
    gap: 8,
  },
  releaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
  },
  releaseImage: {
    width: 80,
    height: 80,
  },
  releaseInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 16,
  },
  releaseTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    lineHeight: 21,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  releaseArtist: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    color: '#B3B3B3',
  },
  showMoreButton: {
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 16,
    marginTop: 16,
  },
  showMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  fanOfContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  fanItem: {
    alignItems: 'center',
    gap: 8,
  },
  fanImage: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  fanName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  connectButtonContainer: {
    width: '100%',
    height: 130,
    backgroundColor: 'rgba(18, 18, 18, 0.16)',
    backdropFilter: 'blur(2px)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 16,
  },
  connectButton: {
    paddingVertical: 10,
    paddingHorizontal: 64,
    backgroundColor: '#FF3B30',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
    letterSpacing: -0.2,
  },
  latestReleaseContainer: {
    width: '100%',
    height: 240,
    borderRadius: 4,
    overflow: 'hidden',
  },
  latestReleaseCard: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  latestReleaseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  latestReleaseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  latestReleaseInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 16,
  },
  postedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postedByAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  postedByText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#FFFFFF',
  },
  albumInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 6,
  },
  albumArtContainer: {
    width: 64,
    height: 64,
    borderRadius: 4,
    overflow: 'hidden',
  },
  albumArtThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  albumDetails: {
    flex: 1,
    marginLeft: 12,
  },
  albumTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  albumType: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  albumArrow: {
    padding: 4,
  },
  showAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  songsList: {
    gap: 8,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
  },
  songImage: {
    width: 48,
    height: 48,
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  songArtist: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    color: '#B3B3B3',
  },
  seeDiscographyButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 50,
    marginTop: 16,
  },
  seeDiscographyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  languageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
});
