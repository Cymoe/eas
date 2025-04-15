import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

export default function OnboardingLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#121212' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="email" />
        <Stack.Screen name="email-verification" />
        <Stack.Screen name="create-password" />
        <Stack.Screen name="confirm-password" />
        <Stack.Screen name="user-type" />
        <Stack.Screen name="band-name" />
        <Stack.Screen name="band-members" />
        <Stack.Screen name="full-name" />
        <Stack.Screen name="gender" />
        <Stack.Screen name="age-range" />
        <Stack.Screen name="date-of-birth" />
        <Stack.Screen name="location" />
        <Stack.Screen name="about-you" />
        <Stack.Screen name="pictures" />
        <Stack.Screen name="artists" />
        <Stack.Screen name="genres" />
        <Stack.Screen name="instruments" />
        <Stack.Screen name="level" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="success" />
        <Stack.Screen name="welcome" />
      </Stack>
    </View>
  );
}
