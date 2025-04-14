import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function MatchingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#FFFFFF',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="matching" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="artist-profile" 
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerBackTitle: Platform.OS === 'ios' ? ' ' : undefined,
          headerBackVisible: true,
        }}
      />
      <Stack.Screen 
        name="band-profile" 
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerBackTitle: Platform.OS === 'ios' ? ' ' : undefined,
          headerBackVisible: true,
        }}
      />
      <Stack.Screen 
        name="filters" 
        options={{
          headerShown: true,
          headerTitle: 'Filters',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
          },
        }}
      />
    </Stack>
  );
} 