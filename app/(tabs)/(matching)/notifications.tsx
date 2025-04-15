import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type NotificationSection = {
  title: string;
  notifications: Notification[];
};

type Notification = {
  id: string;
  platform: string;
  timestamp: string;
  date: string;
  message: string;
  verified: boolean;
  image: any;
};

export default function NotificationsScreen() {
  const [sections] = useState<NotificationSection[]>([
    {
      title: 'Today',
      notifications: [
        {
          id: '1',
          platform: 'Spotify',
          timestamp: '11:08pm',
          date: '18 Mar 2025',
          message: "You've got a new match!",
          verified: true,
          image: require('../../../assets/images/avatar.png')
        },
        {
          id: '2',
          platform: 'SoundCloud',
          timestamp: '4:32pm',
          date: '18 Mar 2025',
          message: "Travis Barker liked your profile",
          verified: true,
          image: require('../../../assets/images/drummer.png')
        },
        {
          id: '3',
          platform: 'System',
          timestamp: '2:15pm',
          date: '18 Mar 2025',
          message: "Your jam session with Arctic Monkeys is confirmed for tomorrow at 7pm",
          verified: false,
          image: require('../../../assets/images/artic.png')
        }
      ]
    },
    {
      title: 'Yesterday',
      notifications: [
        {
          id: '4',
          platform: 'Apple Music',
          timestamp: '9:45pm',
          date: '17 Mar 2025',
          message: "Arctic Monkeys invited you to a studio session",
          verified: true,
          image: require('../../../assets/images/artic.png')
        },
        {
          id: '5',
          platform: 'System',
          timestamp: '3:20pm',
          date: '17 Mar 2025',
          message: "Your profile has been viewed 43 times in the last 24 hours",
          verified: false,
          image: require('../../../assets/images/avatar.png')
        }
      ]
    },
    {
      title: 'Last week',
      notifications: [
        {
          id: '6',
          platform: 'YouTube',
          timestamp: '11:08pm',
          date: '15 Mar 2025',
          message: "Travis Barker commented on your latest video",
          verified: true,
          image: require('../../../assets/images/drummer.png')
        },
        {
          id: '7',
          platform: 'Spotify',
          timestamp: '5:30pm',
          date: '14 Mar 2025',
          message: "Your monthly listeners increased by 15%",
          verified: true,
          image: require('../../../assets/images/avatar.png')
        },
        {
          id: '8',
          platform: 'System',
          timestamp: '10:15am',
          date: '12 Mar 2025',
          message: "Your subscription will renew in 7 days",
          verified: false,
          image: require('../../../assets/images/avatar.png')
        }
      ]
    },
    {
      title: 'Earlier',
      notifications: [
        {
          id: '9',
          platform: 'Instagram',
          timestamp: '7:45pm',
          date: '8 Mar 2025',
          message: "Arctic Monkeys tagged you in a post",
          verified: true,
          image: require('../../../assets/images/artic.png')
        },
        {
          id: '10',
          platform: 'System',
          timestamp: '9:20am',
          date: '5 Mar 2025',
          message: "You've used all your Super Likes for this month",
          verified: false,
          image: require('../../../assets/images/avatar.png')
        }
      ]
    }
  ]);

  // Active tab state
  const [activeTab, setActiveTab] = useState<'General' | 'System'>('System');

  // Filter notifications based on active tab
  const getFilteredSections = () => {
    if (activeTab === 'General') {
      return sections.map(section => ({
        ...section,
        notifications: section.notifications.filter(notification => notification.platform !== 'System')
      })).filter(section => section.notifications.length > 0);
    } else {
      return sections.map(section => ({
        ...section,
        notifications: section.notifications.filter(notification => notification.platform === 'System')
      })).filter(section => section.notifications.length > 0);
    }
  };

  // Render a notification item
  const renderNotification = (notification: Notification, index: number, isLast: boolean) => {
    // Determine if notification needs a specific action button
    const showLikeBack = notification.message.includes('liked your profile');
    const showViewProfile = notification.message.includes('viewed') || notification.message.includes('commented');
    const showAccept = notification.message.includes('invited');
    const showRenew = notification.message.includes('subscription');
    
    return (
      <View key={notification.id} style={styles.notificationContainer}>
        <View style={styles.notificationHeader}>
          <View style={styles.platformContainer}>
            <Image source={notification.image} style={styles.platformImage} />
            <View style={styles.platformTitleContainer}>
              <Text style={styles.platformTitle}>{notification.platform}</Text>
              {notification.verified && (
                <View style={styles.verifiedIcon}>
                  <Ionicons name="checkmark-circle" size={14} color="#6BFF90" />
                </View>
              )}
            </View>
          </View>
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>{notification.timestamp}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.timestamp}>{notification.date}</Text>
          </View>
        </View>
        
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{notification.message}</Text>
        </View>
        
        <View style={styles.actionContainer}>
          {!showRenew && !showAccept && (
            <TouchableOpacity style={styles.replyButton}>
              <Ionicons name="arrow-undo-outline" size={16} color="#F8F9FB" />
              <Text style={styles.replyText}>Reply</Text>
            </TouchableOpacity>
          )}
          
          {showLikeBack && (
            <TouchableOpacity style={styles.likeBackButton}>
              <Text style={styles.likeBackText}>Like back</Text>
            </TouchableOpacity>
          )}
          
          {showViewProfile && (
            <TouchableOpacity style={styles.likeBackButton}>
              <Text style={styles.likeBackText}>View profile</Text>
            </TouchableOpacity>
          )}
          
          {showAccept && (
            <TouchableOpacity style={[styles.likeBackButton, { backgroundColor: 'rgba(107, 255, 144, 0.16)' }]}>
              <Text style={[styles.likeBackText, { color: '#6BFF90' }]}>Accept</Text>
            </TouchableOpacity>
          )}
          
          {showRenew && (
            <TouchableOpacity style={[styles.likeBackButton, { backgroundColor: 'rgba(255, 59, 48, 0.16)' }]}>
              <Text style={[styles.likeBackText, { color: '#FF3B30' }]}>Renew now</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {!isLast && <View style={styles.divider} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="#F8F9FB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Your Socials</Text>
        <View style={styles.rightPlaceholder} />
      </View>
      
      {/* Tab selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'General' ? styles.activeTab : null]}
          onPress={() => setActiveTab('General')}
        >
          <Text style={[styles.tabText, activeTab === 'General' ? styles.activeTabText : null]}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'System' ? styles.activeTab : null]}
          onPress={() => setActiveTab('System')}
        >
          <Text style={[styles.tabText, activeTab === 'System' ? styles.activeTabText : null]}>System</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.markAsReadButton}>
          <Ionicons name="mail-open-outline" size={16} color="#F8F9FB" />
          <Text style={styles.markAsReadText}>Mark as read</Text>
        </TouchableOpacity>
      </View>
      
      {/* Notification sections */}
      <ScrollView style={styles.scrollContainer}>
        {getFilteredSections().map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Ionicons name="chevron-down" size={24} color="rgba(255, 255, 255, 0.48)" />
            </View>
            
            {section.notifications.map((notification, index) => 
              renderNotification(
                notification, 
                index, 
                index === section.notifications.length - 1
              )
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 24,
    lineHeight: 29,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  rightPlaceholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 20,
  },
  tabButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#313131',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  activeTabText: {
    color: '#000000',
  },
  markAsReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
  },
  markAsReadText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  section: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: '#FFFFFF',
  },
  notificationContainer: {
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  platformImage: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  platformTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  platformTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  verifiedIcon: {
    width: 14,
    height: 14,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 17,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    color: 'rgba(255, 255, 255, 0.16)',
    fontSize: 10,
  },
  messageContainer: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    marginBottom: 8,
  },
  message: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    paddingLeft: 10,
    gap: 4,
    height: 30,
    backgroundColor: '#262626',
    borderRadius: 71.4286,
  },
  replyText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#F8F9FB',
    textAlign: 'center',
  },
  likeBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    height: 30,
    backgroundColor: '#262626',
    borderRadius: 71.4286,
  },
  likeBackText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#F8F9FB',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 12,
  },
});
