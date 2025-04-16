import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Pressable, Platform, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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
import { Swipeable } from 'react-native-gesture-handler';
import ReportConfirmationModal from '../../../components/ui/ReportConfirmationModal';
import { Profile } from '../../../types/profile';
import { testUsers } from '../../../data/testUsers';

// Default avatar for fallback
const defaultAvatar = require('../../../assets/images/avatar.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;
const SWIPE_OUT_DURATION = 250;
const ROTATION_ANGLE = 8;

const LIKE_COLOR = '#6BFF90'; // WindSurf greenFlag color
const NOPE_COLOR = '#F41857'; // WindSurf redFlag color
const SUPER_LIKE_COLOR = '#007AFF'; // Existing super like color

const sharedStyles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    color: '#FFFFFF',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default function MatchingScreen() {
  const { action } = useLocalSearchParams<{ action?: 'like' | 'dislike' | 'superlike' }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [swiping, setSwiping] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [profileToReport, setProfileToReport] = useState<Profile | null>(null);

  // Define profiles from testUsers
  const profiles = testUsers;

  // Animated values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const likeOpacity = useSharedValue(0);
  const nopeOpacity = useSharedValue(0);
  const nextCardScale = useSharedValue(0.92);
  const nextCardOpacity = useSharedValue(0.85);
  const superLikeOpacity = useSharedValue(0);

  // Reset animation state
  const resetAnimationState = () => {
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
    likeOpacity.value = 0;
    nopeOpacity.value = 0;
    nextCardScale.value = 0.92;
    nextCardOpacity.value = 0.85;
    superLikeOpacity.value = 0;
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

  const handleLike = () => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Update index
    setCurrentIndex(prevIndex => prevIndex + 1);
    
    // Reset animations
    resetAnimationState();
  };

  const handlePass = () => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Update index
    setCurrentIndex(prevIndex => prevIndex + 1);
    
    // Reset animations
    resetAnimationState();
  };

  const handleSwipeComplete = (direction: 'right' | 'left' | 'up') => {
    if (direction === 'right') {
      handleLike();
    } else if (direction === 'left') {
      handlePass();
    } else if (direction === 'up') {
      // Super like
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setCurrentIndex(prevIndex => prevIndex + 1);
      resetAnimationState();
    }
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
    if (direction === 'right' || direction === 'left') {
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
          runOnJS(handleSwipingEnd)();
        }
      );
    } else if (direction === 'up') {
      translateY.value = withSpring(
        y, 
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
          runOnJS(handleSwipingEnd)();
        }
      );
    }
  };

  // Function to navigate to profile
  const navigateToProfile = (profile: Profile) => {
    if (!profile?.id || !profile?.name || !profile?.type) return;
    
    // Prevent navigation during swipe animations
    if (swiping) return;
    
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Navigate to the appropriate profile screen based on type
    const route = profile.type === 'artist' ? '/artist-profile' : '/band-profile';
    router.push({
      pathname: route,
      params: { 
        id: profile.id,
        name: profile.name
      }
    });
  };

  // Function to handle card tap
  const handleCardTap = () => {
    const profile = profiles[currentIndex];
    if (profile) {
      navigateToProfile(profile);
    }
  };

  // Function to handle the end of swiping
  const handleSwipingEnd = () => {
    setSwiping(false);
  };

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .enabled(true)
    .minDistance(5)
    .onTouchesDown(() => {
      'worklet';
      runOnJS(Haptics.selectionAsync)();
    })
    .onStart(() => {
      runOnJS(setSwiping)(true);
    })
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX * 0.95;
      translateY.value = event.translationY * 0.95;
      rotate.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
        Extrapolate.CLAMP
      );

      if (Math.abs(event.translationY) > Math.abs(event.translationX) && event.translationY < 0) {
        superLikeOpacity.value = interpolate(
          -event.translationY,
          [0, SCREEN_HEIGHT * 0.1, SCREEN_HEIGHT * 0.2],
          [0, 0.5, 1],
          Extrapolate.CLAMP
        );
        likeOpacity.value = withTiming(0, {duration: 100});
        nopeOpacity.value = withTiming(0, {duration: 100});
      } else if (event.translationX > 0) {
        likeOpacity.value = interpolate(
          event.translationX,
          [0, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.2],
          [0, 0.5, 1],
          Extrapolate.CLAMP
        );
        nopeOpacity.value = withTiming(0, {duration: 100});
        superLikeOpacity.value = withTiming(0, {duration: 100});
      } else if (event.translationX < 0) {
        nopeOpacity.value = interpolate(
          -event.translationX,
          [0, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.2],
          [0, 0.5, 1],
          Extrapolate.CLAMP
        );
        likeOpacity.value = withTiming(0, {duration: 100});
        superLikeOpacity.value = withTiming(0, {duration: 100});
      }
      
      nextCardScale.value = interpolate(
        Math.abs(event.translationX),
        [0, SCREEN_WIDTH * 0.4],
        [0.92, 1],
        Extrapolate.CLAMP
      );
      
      nextCardOpacity.value = interpolate(
        Math.abs(event.translationX),
        [0, SCREEN_WIDTH * 0.4],
        [0.85, 1],
        Extrapolate.CLAMP
      );
    })
    .onEnd((event) => {
      'worklet';
      const velocity = Math.sqrt(event.velocityX * event.velocityX + event.velocityY * event.velocityY);
      
      // Determine swipe direction with improved logic
      let direction: 'right' | 'left' | 'up' | null = null;
      
      if (Math.abs(event.translationY) > Math.abs(event.translationX) * 1.5 && event.translationY < -SCREEN_HEIGHT * 0.15) {
        direction = 'up'; // Super like
      } else if (event.translationX > SCREEN_WIDTH * 0.2) {
        direction = 'right'; // Like
      } else if (event.translationX < -SCREEN_WIDTH * 0.2) {
        direction = 'left'; // Nope
      }

      // More responsive swipe detection with progressive thresholds
      const swipeThreshold = velocity > 800 ? 0.1 : velocity > 400 ? 0.2 : 0.25;
      
      if (direction) {
        // Provide haptic feedback based on the action
        if (direction === 'right') {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        } else if (direction === 'left') {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        } else if (direction === 'up') {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
        }
        
        // Animate the card out with improved spring physics
        if (direction === 'up') {
          translateY.value = withSpring(-SCREEN_HEIGHT * 1.2, {
            velocity: event.velocityY,
            stiffness: 200,
            damping: 15,
            mass: 0.6,
            overshootClamping: false
          }, () => runOnJS(handleSwipeComplete)('up'));
        } else {
          translateX.value = withSpring(
            direction === 'right' ? SCREEN_WIDTH * 1.2 : -SCREEN_WIDTH * 1.2, 
            {
              velocity: event.velocityX,
              stiffness: 200,
              damping: 15,
              mass: 0.6,
              overshootClamping: false
            }, 
            () => runOnJS(handleSwipeComplete)(direction)
          );
        }
      } else {
        // Spring back to center with enhanced physics for more natural feel
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        
        translateX.value = withSpring(0, {
          velocity: event.velocityX,
          stiffness: 200,
          damping: 17,
          mass: 0.7,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2
        });
        
        translateY.value = withSpring(0, {
          velocity: event.velocityY,
          stiffness: 200,
          damping: 17,
          mass: 0.7,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2
        });
        
        rotate.value = withSpring(0, {
          stiffness: 200,
          damping: 17
        });
        
        // Fade out indicators with smooth timing
        likeOpacity.value = withTiming(0, {duration: 200});
        nopeOpacity.value = withTiming(0, {duration: 200});
        superLikeOpacity.value = withTiming(0, {duration: 200});
        
        // Reset next card scale/opacity
        nextCardScale.value = withSpring(0.92);
        nextCardOpacity.value = withSpring(0.85);
      }
      
      runOnJS(handleSwipingEnd)();
    });

  // Tap gesture handler
  const tapGesture = Gesture.Tap()
    .enabled(true)
    .numberOfTaps(1)
    .maxDistance(10)
    .onStart(() => {
      'worklet';
      runOnJS(handleCardTap)();
    });

  // Allow both gestures to work independently
  const combinedGesture = Gesture.Simultaneous(
    tapGesture,
    panGesture
  );

  // Card animated style
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value || 0 },
      { translateY: translateY.value || 0 },
      { rotate: `${rotate.value || 0}deg` },
    ],
    zIndex: 1000,
  }));

  // Next card animated style
  const nextCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: nextCardScale.value || 0.92 }
      ],
      opacity: nextCardOpacity.value || 0.85
    };
  });

  // Simplified preloading function
  useEffect(() => {
    // Simple timeout to allow the UI to initialize
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
    }, 500);
  }, []);

  useEffect(() => {
    if (action) {
      switch (action) {
        case 'like':
          forceSwipe('right');
          break;
        case 'dislike':
          forceSwipe('left');
          break;
        case 'superlike':
          forceSwipe('up');
          break;
      }
    }
  }, [action]);

  // Simplified card rendering
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

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {profiles.map((profile, index) => {
          if (index < currentIndex || index > currentIndex + 1) return null;
          
          // Safety check for profile
          if (!profile) return null;
          
          const isCurrentCard = index === currentIndex;
          const cardStyle = isCurrentCard ? 
            [styles.card, cardAnimatedStyle] : 
            [styles.card, nextCardAnimatedStyle];
          
          // Ensure we have a valid image reference
          const imageSource = profile.image || defaultAvatar;
          
          return (
            <View 
              key={profile.id} 
              style={[
                styles.cardContainer, 
                { zIndex: profiles.length - index }
              ]}
            >
              {isCurrentCard ? (
                <GestureDetector gesture={combinedGesture}>
                  <Animated.View style={cardStyle}>
                    <Image
                      source={imageSource}
                      style={styles.cardBackground}
                      resizeMode="cover"
                      fadeDuration={0}
                    />
                    {renderOverlays(isCurrentCard)}
                    {renderCardContent(profile, isCurrentCard)}
                  </Animated.View>
                </GestureDetector>
              ) : (
                <Animated.View style={cardStyle}>
                  <Image
                    source={imageSource}
                    style={styles.cardBackground}
                    resizeMode="cover"
                    fadeDuration={0}
                  />
                  {renderCardContent(profile, isCurrentCard)}
                </Animated.View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  // Simplified card content rendering to match the Figma design exactly
  const renderCardContent = (profile: Profile, isTopCard: boolean) => {
    return (
      <>
        {/* Verified badge */}
        <View style={styles.verifiedContainer}>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={18} color="#0D72EA" />
          </View>
          <Text style={styles.verifiedText}>VERIFIED {profile.type.toUpperCase()}</Text>
        </View>
        
        {/* Profile info at bottom of card */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.profileGradient}
        >
          <View style={styles.profileInfoContainer}>
            {/* Name and age */}
            <View style={styles.nameContainer}>
              <Text style={styles.profileName}>{profile.name}</Text>
            </View>
            
            {/* Location with icon */}
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#EBEAEC" />
              <Text style={styles.locationText}>{profile.location}</Text>
              <Text style={styles.distanceText}>{profile.distance} km</Text>
            </View>
            
            {/* Monthly views */}
            <Text style={styles.monthlyViewsText}>
              {profile.monthlyViews?.toLocaleString()} monthly profile views
            </Text>
            
            {/* Genres */}
            <View style={styles.genreContainer}>
              {profile.genres.map((genre, idx) => (
                <View key={idx} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
            
            {/* Bio */}
            <View style={styles.bioContainer}>
              <Text style={styles.bio}>
                {profile.bio}
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" style={styles.bioArrow} />
            </View>
            
            {/* Report button */}
            <TouchableOpacity 
              style={styles.reportButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setProfileToReport(profile);
                setReportModalVisible(true);
              }}
            >
              <Ionicons name="flag-outline" size={16} color="rgba(255, 255, 255, 0.48)" />
              <Text style={styles.reportButtonText}>Report this musician</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </>
    );
  };

  const renderOverlays = (isTopCard: boolean) => {
    if (!isTopCard) return null;
    
    return (
      <>
        <Animated.View 
          style={[
            styles.overlayContainer,
            {
              opacity: likeOpacity.value || 0,
              borderColor: LIKE_COLOR,
            }
          ]}
        >
          <Text style={[styles.overlayText, { color: LIKE_COLOR }]}>LIKE</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.overlayContainer,
            {
              opacity: nopeOpacity.value || 0,
              borderColor: NOPE_COLOR,
            }
          ]}
        >
          <Text style={[styles.overlayText, { color: NOPE_COLOR }]}>NOPE</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.overlayContainer,
            {
              opacity: superLikeOpacity.value || 0,
              borderColor: SUPER_LIKE_COLOR,
            }
          ]}
        >
          <Text style={[styles.overlayText, { color: SUPER_LIKE_COLOR }]}>SUPER LIKE</Text>
        </Animated.View>
      </>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#121212'}}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* Header with backdrop blur */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <TouchableOpacity onPress={() => router.navigate('/profile' as any)}>
                <Image 
                  source={require('../../../assets/images/avatar.png')}
                  style={styles.userAvatar}
                />
              </TouchableOpacity>
              <View style={styles.userTexts}>
                <Text style={styles.greeting}>Hi Viktor 👋</Text>
                <Text style={styles.subgreeting}>Hope you had a great day!</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push('/(tabs)/(matching)/notifications');
                }}
              >
                <Ionicons name="notifications" size={24} color="rgba(255, 255, 255, 0.48)" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => router.push('/filters')}
              >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path d="M10 18H14C14.55 18 15 17.55 15 17C15 16.45 14.55 16 14 16H10C9.45 16 9 16.45 9 17C9 17.55 9.45 18 10 18ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7ZM6 13H18C18.55 13 19 12.55 19 12C19 11.45 18.55 11 18 11H6C5.45 11 5 11.45 5 12C5 12.55 5.45 13 6 13Z" fill="white" fillOpacity="0.48"/>
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Cards Container - Move it above action buttons */}
        <View style={styles.cardsContainer}>
          {renderCards()}
        </View>
        
        {/* Action buttons */}
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
      </View>
      
      {/* Report Confirmation Modal - Moved outside the container View */}
      {profileToReport && (
        <ReportConfirmationModal
          isVisible={reportModalVisible}
          onClose={() => setReportModalVisible(false)}
          userName={profileToReport.name}
          userType={profileToReport.type === 'band' ? 'Band' : 'Solo Artist'}
        />
      )}
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
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  hero: {
    flex: 1,
    backgroundColor: '#733B2C',
    paddingTop: 100,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80, // Reduced from 130 to lift cards higher
  },
  cardContainer: {
    position: 'absolute',
    top: 80, // Reduced from 130 to lift cards higher
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 100,
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#121212',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 3,
    borderRadius: 10,
  },
  overlayLabel: {
    position: 'absolute',
    top: '40%',
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    zIndex: 10,
  },
  likeLabel: {
    right: 20,
    borderColor: '#6BFF90',
    transform: [{ rotate: '30deg' }],
  },
  nopeLabel: {
    left: 20,
    borderColor: '#F41857',
    transform: [{ rotate: '-30deg' }],
  },
  overlayText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    transform: [{ rotate: '-30deg' }],
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 104,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    zIndex: 10000,
    elevation: 10000,
    paddingTop: 64,
    paddingHorizontal: 12,
    paddingBottom: 12,
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
    flex: 1,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userTexts: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
  },
  greeting: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subgreeting: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    opacity: 0.64,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 10000,
    elevation: 10000,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  rewindButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FF4B4B',
    transform: [{ rotate: '-180deg' }],
  },
  nopeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#F41857',
    transform: [{ rotate: '-180deg' }],
  },
  superLikeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#007AFF',
    transform: [{ rotate: '-90deg' }],
  },
  likeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#1ED760',
  },
  boostButton: {
    width: 48,
    height: 48,
    backgroundColor: '#8400E7',
    transform: [{ rotate: '-180deg' }],
  },
  verifiedContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 10,
  },
  verifiedBadge: {
    marginRight: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  profileGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 280,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'flex-end',
  },
  profileInfoContainer: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Abril Fatface',
  },
  profileAge: {
    fontSize: 36,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Abril Fatface',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  distanceText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  monthlyViewsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bio: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  bioArrow: {
    marginLeft: 8,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 9999, // Fully rounded per WindSurf design system
  },
  reportButtonText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 4,
  },
});
