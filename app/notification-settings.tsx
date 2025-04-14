import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import NotificationService, { NotificationSettings } from '@/services/notifications';

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

type NotificationCategory = {
  title: string;
  description: string;
  settings: NotificationSetting[];
};

export default function NotificationSettingsScreen() {
  const insets = useSafeAreaInsets();
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationCategory[]>([
    {
      title: 'Matching',
      description: 'Control notifications about new matches and potential collaborators',
      settings: [
        { id: 'new_match', title: 'New Matches', description: 'When someone matches with you', enabled: true },
        { id: 'profile_likes', title: 'Profile Likes', description: 'When someone likes your profile', enabled: true },
        { id: 'nearby_musicians', title: 'Nearby Musicians', description: 'When potential collaborators are in your area', enabled: true },
        { id: 'instrument_match', title: 'Instrument Matches', description: 'When someone is looking for your instrument', enabled: true }
      ]
    },
    {
      title: 'Subscription & Offers',
      description: 'Updates about your subscription and special deals',
      settings: [
        { id: 'subscription_status', title: 'Subscription Status', description: 'Updates about your subscription', enabled: true },
        { id: 'special_offers', title: 'Special Offers', description: 'Exclusive deals and discounts', enabled: false },
        { id: 'premium_features', title: 'Premium Features', description: 'Updates about new premium features', enabled: true }
      ]
    },
    {
      title: 'Events & Updates',
      description: 'Stay informed about app updates and local events',
      settings: [
        { id: 'app_updates', title: 'App Updates', description: 'New features and improvements', enabled: true },
        { id: 'local_events', title: 'Local Events', description: 'Music events in your area', enabled: true },
        { id: 'jam_sessions', title: 'Jam Sessions', description: 'Upcoming jam session reminders', enabled: true }
      ]
    },
    {
      title: 'Engagement',
      description: 'Activity updates and profile engagement',
      settings: [
        { id: 'profile_views', title: 'Profile Views', description: 'When someone views your profile', enabled: true },
        { id: 'messages', title: 'Messages', description: 'New messages from matches', enabled: true },
        { id: 'activity_reminders', title: 'Activity Reminders', description: 'Reminders to check new matches', enabled: false }
      ]
    },
    {
      title: 'Collaboration',
      description: 'Updates about your music projects and collaborations',
      settings: [
        { id: 'project_updates', title: 'Project Updates', description: 'Changes to shared projects', enabled: true },
        { id: 'feedback', title: 'Feedback', description: 'When someone comments on your work', enabled: true },
        { id: 'studio_sessions', title: 'Studio Sessions', description: 'Reminders about scheduled sessions', enabled: true }
      ]
    }
  ]);

  // Load saved settings
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await NotificationService.getSettings();
      
      setNotificationSettings(prev => 
        prev.map(category => ({
          ...category,
          settings: category.settings.map(setting => ({
            ...setting,
            enabled: savedSettings[setting.id] ?? setting.enabled
          }))
        }))
      );
    };

    loadSettings();
  }, []);

  const toggleSetting = async (categoryIndex: number, settingId: string) => {
    setNotificationSettings(prev => {
      const newSettings = [...prev];
      const category = newSettings[categoryIndex];
      const settingIndex = category.settings.findIndex(s => s.id === settingId);
      
      if (settingIndex !== -1) {
        category.settings[settingIndex] = {
          ...category.settings[settingIndex],
          enabled: !category.settings[settingIndex].enabled
        };
      }
      
      return newSettings;
    });

    // Save settings to storage
    const allSettings = notificationSettings.reduce((acc, category) => {
      category.settings.forEach(setting => {
        acc[setting.id] = setting.enabled;
      });
      return acc;
    }, {} as NotificationSettings);

    await NotificationService.saveSettings(allSettings);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Notifications</Text>
          <View style={styles.subtitleRow}>
            <Ionicons name="notifications-outline" size={16} color="#828186" />
            <Text style={styles.subtitle}>Choose which notifications you'd like to receive</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="close-outline" size={24} color="#F8F9FB" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {notificationSettings.map((category, categoryIndex) => (
          <View key={category.title} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
            
            <View style={styles.settingsList}>
              {category.settings.map((setting) => (
                <View key={setting.id} style={styles.setting}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                    <Text style={styles.settingDescription}>{setting.description}</Text>
                  </View>
                  <Switch
                    value={setting.enabled}
                    onValueChange={() => toggleSetting(categoryIndex, setting.id)}
                    trackColor={{ false: '#3B3B3B', true: '#0D72EA' }}
                    thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : setting.enabled ? '#FFFFFF' : '#FFFFFF'}
                    ios_backgroundColor="#3B3B3B"
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 34,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 15,
    color: '#828186',
    marginBottom: 32,
  },
  category: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  categoryDescription: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 13,
    color: '#828186',
    marginBottom: 16,
  },
  settingsList: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 17,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 13,
    color: '#828186',
  },
}); 