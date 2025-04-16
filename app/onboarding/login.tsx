import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions, Image, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  SharedValue,
  withSequence,
  interpolate,
  withDelay
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

// Sample images for the grid
const sampleImages = [
  require('../../assets/images/producers.png'),
  require('../../assets/images/model-casual.png'),
  require('../../assets/images/rocker.png'),
  require('../../assets/images/hoodie-model.png'),
  require('../../assets/images/fashion-model.png'),
  require('../../assets/images/guitarist.png'),
  require('../../assets/images/asian-model.png'),
  require('../../assets/images/futuristic.png'),
  require('../../assets/images/neon-model.png'),
];

const GoogleIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 18 18">
    <Path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      fill="#4285F4"
    />
    <Path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <Path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <Path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </Svg>
);

const FacebookIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Path
      d="M18.896 0H1.104C0.494 0 0 0.494 0 1.104v17.792C0 19.506 0.494 20 1.104 20h9.579v-7.745H8.076V9.237h2.607V7.01c0-2.584 1.578-3.99 3.883-3.99 1.104 0 2.052 0.082 2.329 0.119v2.7l-1.598 0.001c-1.254 0-1.496 0.596-1.496 1.47v1.927h2.989l-0.389 3.018h-2.6V20h5.096c0.61 0 1.104-0.494 1.104-1.104V1.104C20 0.494 19.506 0 18.896 0z"
      fill="#0D72EA"
    />
  </Svg>
);

const AppleIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 14 16" fill="none">
    <Path
      d="M13.1013 5.45658C12.8438 5.65402 10.8525 6.85041 10.8525 9.28835C10.8525 12.1311 13.3587 13.2177 13.4675 13.2177C13.4675 13.2177 13.4134 14.1409 12.747 15.1738C12.1887 16.0427 11.5762 16.9116 10.6342 16.9116C9.69214 16.9116 9.36926 16.3158 8.26995 16.3158C7.17064 16.3158 6.74161 16.9116 5.90787 16.9116C4.96581 16.9116 4.29941 15.9879 3.74103 15.1189C3.01852 14.0323 2.40625 12.3943 2.40625 10.8659C2.40625 8.117 4.18941 6.65256 5.88062 6.65256C6.82269 6.65256 7.60028 7.30322 8.18591 7.30322C8.77154 7.30322 9.66761 6.59766 10.7669 6.59766C11.195 6.59766 12.2933 6.63256 13.1013 5.45658ZM9.58366 2.795C10.0136 2.27917 10.2983 1.57363 10.2983 0.868099C10.2983 0.758313 10.2983 0.648526 10.2711 0.56874C9.39223 0.60363 8.35961 1.16443 7.81848 1.74014C7.4147 2.1323 7.0747 2.80294 7.0747 3.53575C7.0747 3.65556 7.10194 3.77536 7.11557 3.80026C7.17007 3.81273 7.2519 3.82519 7.33372 3.82519C8.10045 3.82519 9.12219 3.2892 9.58366 2.795Z"
      fill="white"
    />
  </Svg>
);

// BandMate logo - Using icon from assets
const BandMateLogo = () => (
  <Image 
    source={require('../../assets/images/icon.png')}
    style={styles.standardLogo}
    resizeMode="contain"
  />
);

interface ImageRowProps {
  isFirstRow: boolean;
  scrollX: SharedValue<number>;
}

interface ImageRowResult {
  images: JSX.Element[];
  indices: number[];
}

const calculateImagesNeeded = () => {
  const imageWidth = width / 5.2; // Width of each image container
  const gap = 8; // Gap between images
  const screensToFill = 3; // Fill 3 screens worth to ensure no gaps
  return Math.ceil((width * screensToFill) / (imageWidth + gap)) + 2; // Add 2 buffer images
};

const generateImageRow = (isFirstRow: boolean, previousRow: number[] = []): ImageRowResult => {
  const imagesNeeded = calculateImagesNeeded();
  const images: JSX.Element[] = [];
  const sequence: number[] = [];
  let lastThreeIndices = [-1, -1, -1];
  
  // Generate initial sequence avoiding nearby duplicates
  for (let i = 0; i < imagesNeeded; i++) {
    let randomIndex;
    let attempts = 0;
    do {
      randomIndex = Math.floor(Math.random() * sampleImages.length);
      attempts++;
      if (attempts > 20) {
        lastThreeIndices = [-1, -1, -1];
      }
    } while (
      lastThreeIndices.includes(randomIndex) ||
      (previousRow && previousRow[i] === randomIndex) ||
      (previousRow && previousRow[Math.max(0, i - 1)] === randomIndex) ||
      (previousRow && previousRow[Math.min(previousRow.length - 1, i + 1)] === randomIndex)
    );
    
    sequence.push(randomIndex);
    lastThreeIndices.shift();
    lastThreeIndices.push(randomIndex);
  }
  
  // Create the image elements with proper spacing
  sequence.forEach((index, i) => {
    images.push(
      <View 
        key={`${isFirstRow ? 'row1' : 'row2'}-${i}`} 
        style={[
          styles.userImageContainer,
          { marginRight: i === sequence.length - 1 ? 0 : 8 }
        ]}
      >
        <Image 
          source={sampleImages[index]} 
          style={styles.userImage}
          resizeMode="cover"
        />
      </View>
    );
  });
  
  return { images, indices: sequence };
};

const ImageRow: React.FC<ImageRowProps> = ({ isFirstRow, scrollX }) => {
  const { images } = generateImageRow(isFirstRow);
  return <>{images}</>;
};

export default function Login() {
  // Animation values for row movement
  const topRowOffset = useSharedValue(0);
  const bottomRowOffset = useSharedValue(0);
  
  // Animation configuration
  const ANIMATION_DURATION = 20000; // Increase duration for smoother animation
  const ANIMATION_DISTANCE = width * 2; // Increase distance to ensure smooth looping
  
  // Add gradient animation value
  const gradientRock = useSharedValue(0);
  
  useEffect(() => {
    // Create smooth infinite animations
    const animateRow = (offset: SharedValue<number>, direction: 'left' | 'right') => {
      offset.value = 0; // Reset to start
      offset.value = withRepeat(
        withTiming(direction === 'left' ? -ANIMATION_DISTANCE : ANIMATION_DISTANCE, {
          duration: ANIMATION_DURATION,
          easing: Easing.linear,
        }),
        -1, // Infinite repeat
        false // Don't reverse
      );
    };

    animateRow(topRowOffset, 'left');
    animateRow(bottomRowOffset, 'right');

    // Add gentle rocking animation for gradient
    gradientRock.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
        }),
        withTiming(0, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
        })
      ),
      -1,
      true
    );
  }, []);
  
  // Animated styles for the rows
  const topRowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: topRowOffset.value }],
    };
  });
  
  const bottomRowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: bottomRowOffset.value }],
    };
  });

  const handleSignUp = () => {
    router.push('/onboarding/email');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // For now, just navigate to the main app
    router.replace('(tabs)' as any);
  };

  // Keep track of the indices used in the first row
  const [firstRowIndices, setFirstRowIndices] = useState<number[]>([]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Animated.View 
        style={[
          styles.gradientContainer,
          {
            transform: [{
              rotate: gradientRock.value ? '1deg' : '-1deg'
            }]
          }
        ]}
      >
        <LinearGradient
          colors={['#F27800', '#962402', '#2E0000', '#121212']}
          locations={[0, 0.12, 0.24, 0.32]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              {/* Image Rows */}
              <View style={styles.userGrid}>
                <Animated.View style={[styles.userGridRow, topRowAnimatedStyle]}>
                  {generateImageRow(true).images}
                </Animated.View>
                <Animated.View style={[styles.userGridRow, bottomRowAnimatedStyle]}>
                  {generateImageRow(false).images}
                </Animated.View>
              </View>
              
              {/* Logo and Tagline */}
              <View style={styles.logoSection}>
                <BandMateLogo />
                <Text style={styles.tagline}>Where True{'\n'}Legends meet</Text>
              </View>
              
              {/* Social Login Buttons */}
              <View style={styles.buttonSection}>
                <View style={styles.socialButtonsContainer}>
                  <Pressable 
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin('Google')}
                  >
                    <View style={styles.iconContainer}>
                      <GoogleIcon />
                    </View>
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin('Facebook')}
                  >
                    <View style={styles.iconContainer}>
                      <FacebookIcon />
                    </View>
                    <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin('Apple')}
                  >
                    <View style={styles.iconContainer}>
                      <AppleIcon />
                    </View>
                    <Text style={styles.socialButtonText}>Continue with Apple ID</Text>
                  </Pressable>
                </View>
                
                <Pressable 
                  style={styles.getStartedButton}
                  onPress={handleSignUp}
                >
                  <Text style={styles.getStartedButtonText}>Get started</Text>
                </Pressable>
              </View>
            </View>
            
            {/* Home Indicator */}
            <View style={styles.homeIndicatorContainer}>
              <View style={styles.homeIndicator} />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transformOrigin: 'center bottom',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 48,
    gap: 48,
  },
  userGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: width,
    maxHeight: 328,
    overflow: 'hidden',
  },
  userGridRow: {
    flexDirection: 'row',
    height: 160,
    width: 'auto',
  },
  userImageContainer: {
    width: width / 5.2, // Slightly adjust width to ensure no gaps
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
    width: 246,
    height: 146,
  },
  tagline: {
    width: 246,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    letterSpacing: -1.7,
    color: '#FFFFFF',
  },
  buttonSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 12,
    gap: 12,
    width: width,
  },
  socialButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
  },
  socialButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 40,
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 100,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 11,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  getStartedButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 40,
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  getStartedButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    color: '#121212',
  },
  homeIndicatorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 21,
    paddingBottom: 8,
    width: width,
    height: 34,
  },
  homeIndicator: {
    width: 140,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  standardLogo: {
    width: 51,
    height: 44,
  },
});
