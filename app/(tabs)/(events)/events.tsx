import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
      </View>
      
      {/* Coming Soon Content */}
      <View style={styles.comingSoonContainer}>
        <BlurView intensity={16} tint="dark" style={styles.comingSoonCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={64} color="#FF3B30" />
          </View>
          
          <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
          
          <Text style={styles.comingSoonDescription}>
            We're working on an exciting new Events feature that will help you discover and connect with local music events, jams, and opportunities.
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="musical-notes" size={24} color="#FF3B30" />
              <Text style={styles.featureText}>Local concerts and gigs</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="people" size={24} color="#FF3B30" />
              <Text style={styles.featureText}>Jam sessions and open mics</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="briefcase" size={24} color="#FF3B30" />
              <Text style={styles.featureText}>Audition opportunities</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="star" size={24} color="#FF3B30" />
              <Text style={styles.featureText}>Featured artist showcases</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.notifyButton}>
            <Text style={styles.notifyButtonText}>Notify Me When Available</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
      
      {/* Wave Decoration - Using a View with gradient instead of image */}
      <View style={styles.waveDecoration} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 28,
    color: '#FFFFFF',
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  comingSoonCard: {
    width: '100%',
    borderRadius: 12,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 59, 48, 0.16)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  comingSoonTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  comingSoonDescription: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.64)',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresList: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  notifyButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  waveDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(255, 59, 48, 0.08)',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
