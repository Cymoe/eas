import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions, Image } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 18 18">
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
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M18.896 0H1.104C0.494 0 0 0.494 0 1.104v17.792C0 19.506 0.494 20 1.104 20h9.579v-7.745H8.076V9.237h2.607V7.01c0-2.584 1.578-3.99 3.883-3.99 1.104 0 2.052 0.082 2.329 0.119v2.7l-1.598 0.001c-1.254 0-1.496 0.596-1.496 1.47v1.927h2.989l-0.389 3.018h-2.6V20h5.096c0.61 0 1.104-0.494 1.104-1.104V1.104C20 0.494 19.506 0 18.896 0z"
      fill="#0D72EA"
    />
  </Svg>
);

const AppleIcon = () => (
  <Svg width={14} height={16} viewBox="0 0 14 16" fill="none">
    <Path
      d="M13.1013 5.45658C12.8438 5.65402 10.8525 6.85041 10.8525 9.28835C10.8525 12.1311 13.3587 13.2177 13.4675 13.2177C13.4675 13.2177 13.4134 14.1409 12.747 15.1738C12.1887 16.0427 11.5762 16.9116 10.6342 16.9116C9.69214 16.9116 9.36926 16.3158 8.26995 16.3158C7.17064 16.3158 6.74161 16.9116 5.90787 16.9116C4.96581 16.9116 4.29941 15.9879 3.74103 15.1189C3.01852 14.0323 2.40625 12.3943 2.40625 10.8659C2.40625 8.117 4.18941 6.65256 5.88062 6.65256C6.82269 6.65256 7.60028 7.30322 8.18591 7.30322C8.77154 7.30322 9.66761 6.59766 10.7669 6.59766C11.195 6.59766 12.2933 6.63256 13.1013 5.45658ZM9.58366 2.795C10.0136 2.27917 10.2983 1.57363 10.2983 0.868099C10.2983 0.758313 10.2983 0.648526 10.2711 0.56874C9.39223 0.60363 8.35961 1.16443 7.81848 1.74014C7.4147 2.1323 7.0747 2.80294 7.0747 3.53575C7.0747 3.65556 7.10194 3.77536 7.11557 3.80026C7.17007 3.81273 7.2519 3.82519 7.33372 3.82519C8.10045 3.82519 9.12219 3.2892 9.58366 2.795Z"
      fill="white"
    />
  </Svg>
);

export default function Login() {
  const handleSignUp = () => {
    router.push('/onboarding/email');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // For now, just navigate to the main app
    router.replace('/(tabs)');
  };

  const handleLogin = () => {
    router.push('/onboarding/email');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="musical-notes" size={40} color="#FF3B30" />
          <Text style={styles.logoText}>WindSurf</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        
        <View style={styles.socialButtons}>
          <Pressable 
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Google')}
          >
            <GoogleIcon />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </Pressable>
          
          <Pressable 
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Facebook')}
          >
            <FacebookIcon />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </Pressable>
          
          <Pressable 
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Apple')}
          >
            <AppleIcon />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </Pressable>
        </View>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <Pressable 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Sign in with email</Text>
        </Pressable>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.signUpText} onPress={handleSignUp}>Sign up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.04,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Abril Fatface',
    fontSize: 28,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 32,
    textAlign: 'center',
  },
  socialButtons: {
    width: '100%',
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  socialButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 16,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#FF3B30',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signUpText: {
    color: '#FF3B30',
    fontWeight: '500',
  },
});
