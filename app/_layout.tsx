import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TranslationProvider } from '../context/TranslationContext';
import { SplashScreen } from '../components/SplashScreen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  // Handle splash screen finish
  const handleSplashFinish = () => {
    setIsReady(true);
  };

  if (!isReady) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <TranslationProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack 
          screenOptions={{
            headerShown: false,
            animation: 'none'
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="profile" 
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="email" 
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="email-verification" 
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="onboarding" 
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="filters" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TranslationProvider>
  );
}
