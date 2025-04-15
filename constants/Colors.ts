/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    tabBar: 'rgba(18, 18, 18)',
    tabBarBorder: '#121212',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    tabBar: 'rgba(18, 18, 18)',
    tabBarBorder: '#121212',
  },
  // Add base colors
  white: '#FFFFFF',
  black: '#121212',
  accent: '#FF4B4B',
  red: '#F41857',
  green: '#6BFF90',
  orange: '#FFA726',
};
