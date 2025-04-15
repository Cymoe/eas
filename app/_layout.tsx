import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TranslationProvider } from '../context/TranslationContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen after a short delay
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, []);

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
