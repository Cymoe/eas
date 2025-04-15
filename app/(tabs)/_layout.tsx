import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { TabIcon } from '@/components/ui/TabIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: Colors[colorScheme ?? 'dark'].tabBar,
            borderTopWidth: 0,
          },
          default: {
            backgroundColor: Colors[colorScheme ?? 'dark'].tabBar,
            borderTopWidth: 0,
          },
        }),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.48)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="(matching)"
        options={{
          title: 'Match',
          tabBarIcon: ({ color }) => <TabIcon name="match" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="(chat)/chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <TabIcon name="chat" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="(events)/events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <TabIcon name="calendar" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
