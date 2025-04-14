import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

// This is a simple redirect file that will send users to the login screen
export default function OnboardingIndex() {
  useEffect(() => {
    // Redirect to the login screen
    router.replace('/onboarding/login');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
      <ActivityIndicator size="large" color="#FF3B30" />
    </View>
  );
}
