import { ExpoConfig } from 'expo/config';

require('dotenv').config();

export default {
  name: "eas",
  slug: "eas",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "com.cymoe.eas",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#121212"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.cymoe.eas",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSLocationWhenInUseUsageDescription: "We need your location to show you nearby venues and music spots.",
      NSLocationAlwaysAndWhenInUseUsageDescription: "We need your location to show you nearby venues and music spots."
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.cymoe.eas"
  },
  web: {
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router"
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: "ee17305f-c1cb-4fcf-a1b1-394613ac1619"
    }
  }
}; 