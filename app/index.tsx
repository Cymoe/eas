import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';

// WindSurf Design System Constants
const windsurf = {
  colors: {
    accent: '#FF3B30',
    white: '#FFFFFF',
    night: '#121212',
    withOpacity: (color: string, opacity: number) => {
      let r, g, b;
      if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return color;
    },
    opacityInactive: 0.48,
    opacityBgNormal: 0.08
  }
};

export default function HomeScreen() {
  const handleNavigation = (route: 'onboarding' | 'main') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (route === 'onboarding') {
      router.navigate('/onboarding/login');
    } else {
      router.navigate('/(tabs)/matching');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WindSurf</Text>
        <Text style={styles.headerSubtitle}>Welcome to WindSurf</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.navigationCard}
          onPress={() => handleNavigation('onboarding')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: windsurf.colors.accent }]}>
            <Ionicons 
              name="log-in-outline"
              size={24} 
              color={windsurf.colors.white} 
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Get Started</Text>
            <Text style={styles.cardDescription}>Create a new account or sign in</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive)} 
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigationCard}
          onPress={() => handleNavigation('main')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#1ED760' }]}>
            <Ionicons 
              name="home-outline"
              size={24} 
              color={windsurf.colors.white} 
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Enter App</Text>
            <Text style={styles.cardDescription}>Go to matching and conversations</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive)} 
          />
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            WindSurf • {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: windsurf.colors.night,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: windsurf.colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  content: {
    flex: 1,
    padding: 16,
  },
  navigationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: windsurf.colors.white,
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  }
}); 