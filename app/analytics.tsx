import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

// WindSurf Design System Constants
const windsurf = {
  colors: {
    // Primary Colors
    accent: '#FF3B30',
    white: '#FFFFFF',
    night: '#121212',
    redFlag: '#F41857',
    greenFlag: '#6BFF90',
    orangeFlag: '#FFA726',
    
    // Opacity Functions
    withOpacity: (color: string, opacity: number) => {
      // Convert hex to rgba
      let r, g, b;
      if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return color;
    },
    
    // Opacity Levels
    opacityActive: 1,
    opacityInactive: 0.48,
    opacityHovered: 0.64,
    opacityBgNormal: 0.08,
    opacityBgHover: 0.16,
  }
};

// Mock data for analytics
const mockUserData = {
  totalTimeSpent: '42h 15m',
  sessionsPerDay: 4.2,
  sessionsPerWeek: 28,
  sessionsPerMonth: 112,
  sharedProfileCount: 32,
  profileViewsCount: 187,
  averageSessionDuration: '28m',
  
  // Matching Analytics
  profilesViewed: 843,
  swipeBehavior: {
    rewindCount: 24,
    notInterestedCount: 621,
    superLikeCount: 15,
    interestedCount: 183,
    boostCount: 8
  },
  matchesMade: 47,
  commonGenres: ['Rock', 'Indie', 'Alternative', 'Jazz', 'Pop'],
  commonInstruments: ['Guitar', 'Piano', 'Drums', 'Bass', 'Vocals'],
  engagementRate: 68,
  genderDistribution: {
    male: 65,
    female: 35
  },
  averageAge: 27.4,
  responseTime: '2h 18m',
  topCities: ['New York', 'Los Angeles', 'London', 'Berlin', 'Tokyo'],
  topCountries: ['United States', 'United Kingdom', 'Germany', 'Japan', 'Australia']
};

// Tab data for the analytics screen
const tabs = [
  { id: 'user', label: 'User Activity' },
  { id: 'matching', label: 'Matching' },
  { id: 'location', label: 'Location' }
];

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState('user');
  
  const handleTabPress = (tabId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tabId);
  };
  
  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color={windsurf.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={styles.backButton} />
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => handleTabPress(tab.id)}
          >
            <Text 
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'user' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>User Activity</Text>
            
            {/* Total Time Spent */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="time-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Total Time Spent</Text>
              </View>
              <Text style={styles.statValue}>{mockUserData.totalTimeSpent}</Text>
              <Text style={styles.cardDescription}>
                Tracks the cumulative time you've spent using the app
              </Text>
            </BlurView>
            
            {/* Sessions */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="calendar-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Sessions</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUserData.sessionsPerDay}</Text>
                  <Text style={styles.statLabel}>Per Day</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUserData.sessionsPerWeek}</Text>
                  <Text style={styles.statLabel}>Per Week</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUserData.sessionsPerMonth}</Text>
                  <Text style={styles.statLabel}>Per Month</Text>
                </View>
              </View>
            </BlurView>
            
            {/* Profile Sharing */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="share-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Profile Sharing</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUserData.sharedProfileCount}</Text>
                  <Text style={styles.statLabel}>Shared</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUserData.profileViewsCount}</Text>
                  <Text style={styles.statLabel}>Profile Views</Text>
                </View>
              </View>
            </BlurView>
            
            {/* Average Session */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="hourglass-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Average Session Duration</Text>
              </View>
              <Text style={styles.statValue}>{mockUserData.averageSessionDuration}</Text>
              <Text style={styles.cardDescription}>
                The average time you spend per session in the app
              </Text>
            </BlurView>
          </View>
        )}
        
        {activeTab === 'matching' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Matching Analytics</Text>
            
            {/* Profiles Viewed */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="eye-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Profiles Viewed</Text>
              </View>
              <Text style={styles.statValue}>{mockUserData.profilesViewed}</Text>
              <Text style={styles.cardDescription}>
                Total number of profiles you've viewed
              </Text>
            </BlurView>
            
            {/* Swipe Behavior */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="hand-left-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Swipe Behavior</Text>
              </View>
              <View style={styles.swipeStats}>
                <View style={styles.swipeStatItem}>
                  <View style={[styles.swipeIcon, { backgroundColor: windsurf.colors.withOpacity('#FFFFFF', 0.16) }]}>
                    <Ionicons name="refresh" size={16} color={windsurf.colors.white} />
                  </View>
                  <Text style={styles.swipeValue}>{mockUserData.swipeBehavior.rewindCount}</Text>
                  <Text style={styles.swipeLabel}>Rewinds</Text>
                </View>
                <View style={styles.swipeStatItem}>
                  <View style={[styles.swipeIcon, { backgroundColor: windsurf.colors.withOpacity(windsurf.colors.redFlag, 0.16) }]}>
                    <Ionicons name="close" size={16} color={windsurf.colors.redFlag} />
                  </View>
                  <Text style={styles.swipeValue}>{mockUserData.swipeBehavior.notInterestedCount}</Text>
                  <Text style={styles.swipeLabel}>Not Interested</Text>
                </View>
                <View style={styles.swipeStatItem}>
                  <View style={[styles.swipeIcon, { backgroundColor: windsurf.colors.withOpacity(windsurf.colors.accent, 0.16) }]}>
                    <Ionicons name="star" size={16} color={windsurf.colors.accent} />
                  </View>
                  <Text style={styles.swipeValue}>{mockUserData.swipeBehavior.superLikeCount}</Text>
                  <Text style={styles.swipeLabel}>SuperLikes</Text>
                </View>
                <View style={styles.swipeStatItem}>
                  <View style={[styles.swipeIcon, { backgroundColor: windsurf.colors.withOpacity(windsurf.colors.greenFlag, 0.16) }]}>
                    <Ionicons name="heart" size={16} color={windsurf.colors.greenFlag} />
                  </View>
                  <Text style={styles.swipeValue}>{mockUserData.swipeBehavior.interestedCount}</Text>
                  <Text style={styles.swipeLabel}>Interested</Text>
                </View>
                <View style={styles.swipeStatItem}>
                  <View style={[styles.swipeIcon, { backgroundColor: windsurf.colors.withOpacity(windsurf.colors.orangeFlag, 0.16) }]}>
                    <Ionicons name="flash" size={16} color={windsurf.colors.orangeFlag} />
                  </View>
                  <Text style={styles.swipeValue}>{mockUserData.swipeBehavior.boostCount}</Text>
                  <Text style={styles.swipeLabel}>Boosts</Text>
                </View>
              </View>
            </BlurView>
            
            {/* Matches */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="people-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Matches</Text>
              </View>
              <Text style={styles.statValue}>{mockUserData.matchesMade}</Text>
              <Text style={styles.cardDescription}>
                Total number of matches you've made
              </Text>
              
              <View style={styles.divider} />
              
              {/* Engagement Rate */}
              <View style={styles.engagementContainer}>
                <Text style={styles.engagementTitle}>Engagement Rate</Text>
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${mockUserData.engagementRate}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.engagementValue}>{mockUserData.engagementRate}%</Text>
                <Text style={styles.cardDescription}>
                  Percentage of matches that lead to conversations
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              {/* Gender Distribution */}
              <View style={styles.genderContainer}>
                <Text style={styles.genderTitle}>Gender Distribution</Text>
                <View style={styles.genderBar}>
                  <View 
                    style={[
                      styles.maleBar, 
                      { flex: mockUserData.genderDistribution.male }
                    ]} 
                  />
                  <View 
                    style={[
                      styles.femaleBar, 
                      { flex: mockUserData.genderDistribution.female }
                    ]} 
                  />
                </View>
                <View style={styles.genderLabels}>
                  <View style={styles.genderLabelItem}>
                    <View style={styles.maleDot} />
                    <Text style={styles.genderLabelText}>Male ({mockUserData.genderDistribution.male}%)</Text>
                  </View>
                  <View style={styles.genderLabelItem}>
                    <View style={styles.femaleDot} />
                    <Text style={styles.genderLabelText}>Female ({mockUserData.genderDistribution.female}%)</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              {/* Average Age */}
              <View style={styles.ageContainer}>
                <Text style={styles.ageTitle}>Average Age of Matches</Text>
                <Text style={styles.ageValue}>{mockUserData.averageAge}</Text>
              </View>
              
              <View style={styles.divider} />
              
              {/* Response Time */}
              <View style={styles.responseContainer}>
                <Text style={styles.responseTitle}>Average Response Time</Text>
                <Text style={styles.responseValue}>{mockUserData.responseTime}</Text>
                <Text style={styles.cardDescription}>
                  Average time to respond to messages
                </Text>
              </View>
            </BlurView>
            
            {/* Common Genres */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="musical-notes-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Most Common Genres</Text>
              </View>
              <View style={styles.tagContainer}>
                {mockUserData.commonGenres.map((genre, index) => (
                  <View 
                    key={`genre-${index}`} 
                    style={styles.tag}
                  >
                    <Text style={styles.tagText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
            
            {/* Common Instruments */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="musical-note" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Most Common Instruments</Text>
              </View>
              <View style={styles.tagContainer}>
                {mockUserData.commonInstruments.map((instrument, index) => (
                  <View 
                    key={`instrument-${index}`} 
                    style={styles.tag}
                  >
                    <Text style={styles.tagText}>{instrument}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </View>
        )}
        
        {activeTab === 'location' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Location Analytics</Text>
            
            {/* Top Cities */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="business-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Top Cities</Text>
              </View>
              <View style={styles.locationList}>
                {mockUserData.topCities.map((city, index) => (
                  <View key={`city-${index}`} style={styles.locationItem}>
                    <Text style={styles.locationRank}>{index + 1}</Text>
                    <Text style={styles.locationName}>{city}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
            
            {/* Top Countries */}
            <BlurView intensity={16} tint="dark" style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="globe-outline" size={20} color={windsurf.colors.white} />
                <Text style={styles.cardTitle}>Top Countries</Text>
              </View>
              <View style={styles.locationList}>
                {mockUserData.topCountries.map((country, index) => (
                  <View key={`country-${index}`} style={styles.locationItem}>
                    <Text style={styles.locationRank}>{index + 1}</Text>
                    <Text style={styles.locationName}>{country}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: windsurf.colors.night,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 24,
    color: windsurf.colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
  },
  activeTab: {
    backgroundColor: windsurf.colors.accent,
  },
  tabLabel: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  activeTabLabel: {
    fontWeight: '500',
    color: windsurf.colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  tabContent: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    color: windsurf.colors.white,
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityBgNormal),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: windsurf.colors.white,
    marginLeft: 8,
  },
  statValue: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    color: windsurf.colors.white,
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
    marginTop: 4,
  },
  swipeStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  swipeStatItem: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 12,
  },
  swipeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  swipeValue: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: windsurf.colors.white,
  },
  swipeLabel: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, 0.1),
    marginVertical: 16,
  },
  engagementContainer: {
    marginBottom: 8,
  },
  engagementTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: windsurf.colors.white,
    marginBottom: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.white, 0.1),
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: windsurf.colors.accent,
    borderRadius: 4,
  },
  engagementValue: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: windsurf.colors.white,
    marginBottom: 4,
  },
  genderContainer: {
    marginBottom: 8,
  },
  genderTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: windsurf.colors.white,
    marginBottom: 8,
  },
  genderBar: {
    height: 8,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  maleBar: {
    height: '100%',
    backgroundColor: windsurf.colors.accent,
  },
  femaleBar: {
    height: '100%',
    backgroundColor: windsurf.colors.orangeFlag,
  },
  genderLabels: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  genderLabelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  maleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: windsurf.colors.accent,
    marginRight: 4,
  },
  femaleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: windsurf.colors.orangeFlag,
    marginRight: 4,
  },
  genderLabelText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.withOpacity(windsurf.colors.white, windsurf.colors.opacityInactive),
  },
  ageContainer: {
    marginBottom: 8,
  },
  ageTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: windsurf.colors.white,
    marginBottom: 4,
  },
  ageValue: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    color: windsurf.colors.white,
  },
  responseContainer: {
    marginBottom: 8,
  },
  responseTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: windsurf.colors.white,
    marginBottom: 4,
  },
  responseValue: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    color: windsurf.colors.white,
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: windsurf.colors.withOpacity(windsurf.colors.accent, 0.16),
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: windsurf.colors.white,
  },
  locationList: {
    marginTop: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: windsurf.colors.withOpacity(windsurf.colors.white, 0.1),
  },
  locationRank: {
    fontFamily: 'Abril Fatface',
    fontSize: 18,
    color: windsurf.colors.accent,
    width: 24,
  },
  locationName: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: windsurf.colors.white,
  },
});
