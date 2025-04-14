import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Pressable, Platform, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  runOnJS,
  interpolate,
  Extrapolate,
  cancelAnimation
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;
const SWIPE_OUT_DURATION = 250;
const ROTATION_ANGLE = 8;

type Profile = {
  id: string;
  name: string;
  type: 'band' | 'artist';
  location: string;
  distance: number;
  matchPercent: number;
  genres: string[];
  commonMatches: number;
  bio?: string;
  image?: string;
  monthlyViews?: number;
};

export default function MatchingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [swiping, setSwiping] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [gradientColors, setGradientColors] = useState<{[key: string]: string[]}>({});
  const [profiles] = useState<Profile[]>([
    {
      id: 'square-123',
      name: 'Square Waves',
      type: 'band',
      location: 'Los Angeles, CA',
      distance: 33,
      matchPercent: 64,
      genres: ['Blues', 'Rock', 'Soul'],
      commonMatches: 4,
      bio: 'Lead guitarist looking for a band. Into classic rock and blues.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop',
      monthlyViews: 528
    },
    {
      id: 'sarah-456',
      name: 'Sarah Connor',
      type: 'artist',
      location: 'San Francisco, CA',
      distance: 15,
      matchPercent: 78,
      genres: ['Jazz', 'Soul', 'R&B'],
      commonMatches: 2,
      bio: 'Vocalist seeking band members. Love jazz and soul music.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop',
      monthlyViews: 412
    },
    {
      id: 'groove-789',
      name: 'Groove Collective',
      type: 'band',
      location: 'New York, NY',
      distance: 42,
      matchPercent: 91,
      genres: ['Funk', 'Jazz', 'Electronic'],
      commonMatches: 6,
      bio: 'Electronic funk band looking for keyboardist.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop',
      monthlyViews: 743
    }
  ]);

  // Animated values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const likeOpacity = useSharedValue(0);
  const nopeOpacity = useSharedValue(0);
  const nextCardScale = useSharedValue(0.92);
  const nextCardOpacity = useSharedValue(0.85);

  // Reset animation state
  const resetAnimationState = () => {
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
    likeOpacity.value = 0;
    nopeOpacity.value = 0;
    nextCardScale.value = 0.92;
    nextCardOpacity.value = 0.85;
  };

  // Animate next card to become the top card
  const animateNextCard = () => {
    nextCardScale.value = withSpring(1, {
      damping: 12,
      stiffness: 80,
      mass: 0.6,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2
    });
    nextCardOpacity.value = withSpring(1, {
      damping: 12,
      stiffness: 80,
      mass: 0.6,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2
    });
  };

  // Force swipe in a direction
  const forceSwipe = (direction: 'right' | 'left' | 'up') => {
    if (swiping) return;
    setSwiping(true);
    
    // Cancel any ongoing animations
    cancelAnimation(translateX);
    cancelAnimation(translateY);
    
    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : direction === 'left' ? -SCREEN_WIDTH * 1.5 : 0;
    const y = direction === 'up' ? -SCREEN_HEIGHT * 1.5 : 0;

    // Show appropriate indicator
    if (direction === 'right') {
      likeOpacity.value = withTiming(1, { duration: 150 });
    } else if (direction === 'left') {
      nopeOpacity.value = withTiming(1, { duration: 150 });
    }

    // Start animating the next card
    animateNextCard();

    // Animate the card out
    translateX.value = withSpring(
      x, 
      {
        damping: 12,
        stiffness: 80,
        mass: 0.5,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2
      },
      () => {
        runOnJS(handleSwipeComplete)(direction);
      }
    );

    if (direction === 'up') {
      translateY.value = withSpring(
        y, 
        {
          damping: 12,
          stiffness: 80,
          mass: 0.5,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2
        }
      );
    }
  };

  // Handle swipe completion
  const handleSwipeComplete = (direction: 'right' | 'left') => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Update index
    setCurrentIndex(prevIndex => prevIndex + 1);
    
    // Reset animations for next card
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
    likeOpacity.value = 0;
    nopeOpacity.value = 0;
    nextCardScale.value = 0.92;
    nextCardOpacity.value = 0.85;
  };

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(setSwiping)(true);
    })
    .onUpdate((event) => {
      // Update position
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
      
      // Update indicators
      if (event.translationX > 20) {
        likeOpacity.value = Math.min(event.translationX / (SWIPE_THRESHOLD * 1.2), 1);
        nopeOpacity.value = 0;
      } else if (event.translationX < -20) {
        nopeOpacity.value = Math.min(-event.translationX / (SWIPE_THRESHOLD * 1.2), 1);
        likeOpacity.value = 0;
      } else {
        likeOpacity.value = 0;
        nopeOpacity.value = 0;
      }
      
      // Update next card
      const absX = Math.abs(event.translationX);
      const progress = Math.min(absX / (SCREEN_WIDTH * 0.2), 1);
      nextCardScale.value = 0.92 + (progress * 0.08);
      nextCardOpacity.value = 0.85 + (progress * 0.15);
    })
    .onEnd((event) => {
      const swipeVelocityThreshold = Platform.OS === 'ios' ? 500 : 400;
      
      // Check if swipe should complete
      const hasExceededPositionThreshold = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      const hasExceededVelocityThreshold = Math.abs(event.velocityX) > swipeVelocityThreshold;
      
      if (hasExceededVelocityThreshold || hasExceededPositionThreshold) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        
        // Complete the swipe
        const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
        
        translateX.value = withSpring(
          x, 
          {
            damping: 12,
            stiffness: 80,
            mass: 0.5,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            velocity: event.velocityX
          },
          () => {
            runOnJS(handleSwipeComplete)(direction);
          }
        );
      } else {
        // Return to center with spring animation
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
          mass: 0.5,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          velocity: event.velocityX
        });
        
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
          mass: 0.5,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          velocity: event.velocityY
        });
        
        // Fade out indicators
        likeOpacity.value = withTiming(0, { duration: 150 });
        nopeOpacity.value = withTiming(0, { duration: 150 });
        
        // Return next card to original state
        nextCardScale.value = withSpring(0.92, {
          damping: 15,
          stiffness: 150,
          mass: 0.5
        });
        
        nextCardOpacity.value = withSpring(0.85, {
          damping: 15,
          stiffness: 150,
          mass: 0.5
        });
        
        // Allow new swipes
        runOnJS(setSwiping)(false);
      }
    })
    .onFinalize(() => {
      // Ensure swiping state is reset if gesture is interrupted
      if (swiping) {
        runOnJS(setSwiping)(false);
      }
    });

  // Card animated style
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` }
      ]
    };
  });

  // Next card animated style
  const nextCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: nextCardScale.value }
      ],
      opacity: nextCardOpacity.value
    };
  });

  // Render cards
  const renderCards = () => {
    if (initialLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF3B30" />
        </View>
      );
    }

    if (currentIndex >= profiles.length) {
      return (
        <View style={styles.noMoreCardsContainer}>
          <Text style={styles.noMoreCardsText}>No more profiles to show</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              setCurrentIndex(0);
              setNextIndex(1);
            }}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return profiles.map((profile, index) => {
      if (index < currentIndex || index > currentIndex + 1) return null;
      
      const isTopCard = index === currentIndex;
      const isNextCard = index === currentIndex + 1;
      
      return (
        <View 
          key={profile.id}
          style={[
            styles.cardContainer,
            isNextCard && { zIndex: 998 }
          ]}
        >
          <Animated.View
            style={[
              styles.card,
              isTopCard ? cardAnimatedStyle : nextCardAnimatedStyle,
              { zIndex: isTopCard ? 999 : 998 }
            ]}
          >
            {renderCardContent(profile, isTopCard)}
          </Animated.View>
          
          {isTopCard && (
            <GestureDetector gesture={panGesture}>
              <Animated.View style={StyleSheet.absoluteFillObject} />
            </GestureDetector>
          )}
        </View>
      );
    });
  };

  // Render card content
  const renderCardContent = (profile: Profile, isTopCard: boolean) => {
    return (
      <>
        <Image
          source={{ uri: profile.image }}
          style={styles.cardBackground}
          resizeMode="cover"
          fadeDuration={0}
          onLoad={() => {
            if (isTopCard) {
              setImagesLoaded(prev => ({...prev, [profile.id]: true}));
            }
          }}
          onError={() => {
            console.log('Error loading image:', profile.image);
          }}
        />
        
        {isTopCard && (
          <>
            <Animated.View 
              style={[
                styles.overlayLabel, 
                styles.likeLabel,
                {
                  opacity: likeOpacity
                }
              ]}
            >
              <Text style={[styles.overlayText, { color: '#6BFF90' }]}>LIKE</Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.overlayLabel, 
                styles.nopeLabel,
                {
                  opacity: nopeOpacity
                }
              ]}
            >
              <Text style={[styles.overlayText, { color: '#F41857' }]}>NOPE</Text>
            </Animated.View>
          </>
        )}
        
        <BlurView 
          intensity={80} 
          tint="dark" 
          style={styles.cardInfo}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileLocation}>{profile.location}</Text>
            </View>
            <View style={styles.matchPercent}>
              <Text style={styles.matchPercentText}>{profile.matchPercent}%</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.cardDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{profile.type === 'band' ? 'Band' : 'Artist'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Distance</Text>
                <Text style={styles.detailValue}>{profile.distance} mi</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Monthly Views</Text>
                <Text style={styles.detailValue}>{profile.monthlyViews}</Text>
              </View>
            </View>
            
            <View style={styles.genreContainer}>
              {profile.genres.map((genre, idx) => (
                <View key={idx} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
            
            {profile.bio && (
              <Text style={styles.bio}>{profile.bio}</Text>
            )}
            
            <View style={styles.commonMatches}>
              <Text style={styles.commonMatchesText}>
                {profile.commonMatches} common {profile.commonMatches === 1 ? 'match' : 'matches'}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={(event) => {
              event.stopPropagation();
              const navigateToProfile = (profile: Profile) => {
                // Navigate to the appropriate profile screen based on the profile type
                const route = profile.type === 'band' ? '/(profiles)/band-profile' : '/(profiles)/artist-profile';
                router.navigate(route as any);
              };
              navigateToProfile(profile);
            }}
          >
            <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </BlurView>
      </>
    );
  };

  // Preload images
  const preloadImages = async () => {
    const images = [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop'
    ];
    
    await Promise.all(images.map(image => Image.prefetch(image)));
  };

  // Preload images and extract colors
  useEffect(() => {
    const initialLoadedState = profiles.reduce((acc, profile) => {
      acc[profile.id] = false;
      return acc;
    }, {} as {[key: string]: boolean});
    
    setImagesLoaded(initialLoadedState);
    
    preloadImages();
    
    setTimeout(() => {
      setInitialLoading(false);
      
      // Reset animations
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
      likeOpacity.value = 0;
      nopeOpacity.value = 0;
      nextCardScale.value = 0.92;
      nextCardOpacity.value = 0.85;
    }, 800); // Increased timeout to allow color extraction
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#121212'}}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <TouchableOpacity onPress={() => router.navigate('/profile' as any)}>
                <Image 
                  source={{ uri: 'https://picsum.photos/32/32' }}
                  style={styles.userAvatar}
                />
              </TouchableOpacity>
              <View style={styles.userTexts}>
                <Text style={styles.greeting}>Hi Viktor 👋</Text>
                <Text style={styles.subgreeting}>Hope you had a great day!</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <G clipPath="url(#clip0_358_10140)">
                    <Path d="M14 25.667C15.2833 25.667 16.3333 24.617 16.3333 23.3337H11.6667C11.6667 24.617 12.7167 25.667 14 25.667ZM21 18.667V12.8337C21 9.25199 19.0983 6.25366 15.75 5.46033V4.66699C15.75 3.69866 14.9683 2.91699 14 2.91699C13.0317 2.91699 12.25 3.69866 12.25 4.66699V5.46033C8.91333 6.25366 7 9.24033 7 12.8337V18.667L4.66667 21.0003V22.167H23.3333V21.0003L21 18.667ZM18.6667 19.8337H9.33333V12.8337C9.33333 9.94033 11.095 7.58366 14 7.58366C16.905 7.58366 18.6667 9.94033 18.6667 12.8337V19.8337ZM8.84333 4.76033L7.175 3.09199C4.375 5.22699 2.53167 8.51699 2.36833 12.2503H4.70167C4.87667 9.15866 6.46333 6.45199 8.84333 4.76033ZM23.2983 12.2503H25.6317C25.4567 8.51699 23.6133 5.22699 20.825 3.09199L19.1683 4.76033C21.525 6.45199 23.1233 9.15866 23.2983 12.2503Z" fill="white" fillOpacity="0.48"/>
                  </G>
                  <Defs>
                    <ClipPath id="clip0_358_10140">
                      <Rect width="28" height="28" fill="white"/>
                    </ClipPath>
                  </Defs>
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                const openFilters = () => {
                  // Navigate to the filters screen
                  router.navigate('/(settings)/filters' as any);
                };
                openFilters();
              }}>
                <Svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <Path d="M9.83333 14C9.50278 14 9.22569 13.8882 9.00208 13.6646C8.77847 13.441 8.66667 13.1639 8.66667 12.8333C8.66667 12.5028 8.77847 12.2257 9.00208 12.0021C9.22569 11.7785 9.50278 11.6667 9.83333 11.6667H12.1667C12.4972 11.6667 12.7743 11.7785 12.9979 12.0021C13.2215 12.2257 13.3333 12.5028 13.3333 12.8333C13.3333 13.1639 13.2215 13.441 12.9979 13.6646C12.7743 13.8882 12.4972 14 12.1667 14H9.83333ZM5.16667 8.16667C4.83611 8.16667 4.55903 8.05486 4.33542 7.83125C4.11181 7.60764 4 7.33056 4 7C4 6.66944 4.11181 6.39236 4.33542 6.16875C4.55903 5.94514 4.83611 5.83333 5.16667 5.83333H16.8333C17.1639 5.83333 17.441 5.94514 17.6646 6.16875C17.8882 6.39236 18 6.66944 18 7C18 7.33056 17.8882 7.60764 17.6646 7.83125C17.441 8.05486 17.1639 8.16667 16.8333 8.16667H5.16667ZM1.66667 2.33333C1.33611 2.33333 1.05903 2.22153 0.835417 1.99792C0.611806 1.77431 0.5 1.49722 0.5 1.16667C0.5 0.836111 0.611806 0.559028 0.835417 0.335417C1.05903 0.111806 1.33611 0 1.66667 0H20.3333C20.6639 0 20.941 0.111806 21.1646 0.335417C21.3882 0.559028 21.5 0.836111 21.5 1.16667C21.5 1.49722 21.3882 1.77431 21.1646 1.99792C20.941 2.22153 20.6639 2.33333 20.3333 2.33333H1.66667Z" fill="white" fillOpacity="0.48"/>
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rewindButton]}
            onPress={() => {
              if (!swiping && currentIndex > 0) {
                setSwiping(true);
                setCurrentIndex(currentIndex - 1);
                
                // Reset animation values
                translateX.value = 0;
                translateY.value = 0;
                rotate.value = 0;
                likeOpacity.value = 0;
                nopeOpacity.value = 0;
                nextCardScale.value = 0.92;
                nextCardOpacity.value = 0.85;
                
                setTimeout(() => setSwiping(false), 300);
              }
            }}
          >
            <Ionicons name="play-skip-back" size={28} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.nopeButton]}
            onPress={() => !swiping && forceSwipe('left')}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={44} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.superLikeButton]}
            onPress={() => !swiping && forceSwipe('up')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-up" size={44} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.likeButton]}
            onPress={() => !swiping && forceSwipe('right')}
            activeOpacity={0.7}
          >
            <Ionicons name="heart" size={44} color="#121212" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.boostButton]}
            activeOpacity={0.7}
          >
            <Ionicons name="flash" size={28} color="#121212" />
          </TouchableOpacity>
        </View>
        
        {renderCards()}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCardsText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  resetButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },
  resetButtonText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  hero: {
    flex: 1,
    backgroundColor: '#733B2C',
    paddingTop: 100,
  },
  cardContainer: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 9000,
    elevation: 9000,
    paddingBottom: 100,
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#333', // Fallback color while image loads
    elevation: 9999,
  },
  overlayLabel: {
    position: 'absolute',
    padding: 10,
    borderWidth: 4,
    borderRadius: 10,
    zIndex: 2,
  },
  likeLabel: {
    top: 20,
    left: 20,
    borderColor: '#6BFF90',
    transform: [{ rotate: '-30deg' }],
  },
  nopeLabel: {
    top: 20,
    right: 20,
    borderColor: '#F41857',
    transform: [{ rotate: '30deg' }],
  },
  overlayText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: 110,
    left: 0,
    top: 0,
    paddingTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 267,
    height: 32,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 17,
  },
  userTexts: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
    width: 150,
    height: 28,
  },
  greeting: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subgreeting: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: 76,
    height: 28,
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    width: '100%',
    height: 32,
    zIndex: 2,
  },
  titleWithImg: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedIcon: {
    width: 24,
    height: 24,
  },
  titleTexts: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  verifiedText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  matchPercentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
    borderRadius: 100,
  },
  percentText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    zIndex: 2,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  nameText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 44,
    lineHeight: 60,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  distanceText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
    opacity: 0.64,
  },
  matchesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  matchAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  matchesText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    color: '#FFFFFF',
  },
  viewsText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    borderRadius: 16,
  },
  genreText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 11,
    color: '#FFFFFF',
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bioText: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
  moreButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedTextBadge: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  matchPercent: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
  },
  matchPercentText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 110 : 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    zIndex: 8000,
    elevation: 8000,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  rewindButton: {
    width: 54,
    height: 54,
    backgroundColor: '#FF4B4B',
    transform: [{ rotate: '-180deg' }],
  },
  nopeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#F41857',
  },
  superLikeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#007AFF',
    transform: [{ rotate: '-90deg' }],
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#1ED760',
  },
  boostButton: {
    width: 54,
    height: 54,
    backgroundColor: '#8400E7',
    transform: [{ rotate: '-180deg' }],
  },
  overlayTop: {
    position: 'absolute',
    width: '100%',
    height: 120,
    left: 0,
    top: 0,
    zIndex: 1,
  },
  overlayBottom: {
    position: 'absolute',
    width: '100%',
    height: 280,
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333', // Add background color to prevent transparent flashing
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    zIndex: 10000,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileLocation: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.64,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    marginBottom: 16,
  },
  cardDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  detailItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.64,
  },
  detailValue: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    borderRadius: 16,
  },
  genreText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 11,
    color: '#FFFFFF',
  },
  bio: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  commonMatches: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  commonMatchesText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    color: '#FFFFFF',
  },
  moreButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
