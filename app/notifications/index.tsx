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
          image: require('../../assets/images/avatar.png')
        },
        {
          id: '2',
          platform: 'Spotify',
          timestamp: '11:08pm',
          date: '18 Mar 2025',
          message: "You've got a new match!",
          verified: true,
          image: require('../../assets/images/avatar.png')
        }
      ]
    },
    {
      title: 'Last week',
      notifications: [
        {
          id: '3',
          platform: 'Spotify',
          timestamp: '11:08pm',
          date: '18 Mar 2025',
          message: "You've got a new match!",
          verified: true,
          image: require('../../assets/images/avatar.png')
        },
        {
          id: '4',
          platform: 'Spotify',
          timestamp: '11:08pm',
          date: '18 Mar 2025',
          message: "You've got a new match!",
          verified: true,
          image: require('../../assets/images/avatar.png')
        }
      ]
    }
  ]);

  // Render a notification item
  const renderNotification = (notification: Notification, index: number, isLast: boolean) => {
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
          <TouchableOpacity style={styles.replyButton}>
            <Ionicons name="arrow-undo-outline" size={16} color="#F8F9FB" />
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
          {index === 1 && (
            <TouchableOpacity style={styles.likeBackButton}>
              <Text style={styles.likeBackText}>Like back</Text>
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
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>System</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.markAsReadButton}>
          <Ionicons name="mail-open-outline" size={16} color="#F8F9FB" />
          <Text style={styles.markAsReadText}>Mark as read</Text>
        </TouchableOpacity>
      </View>
      
      {/* Notification sections */}
      <ScrollView style={styles.scrollContainer}>
        {sections.map((section, sectionIndex) => (
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
