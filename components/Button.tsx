import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from './ThemedText';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  label: string;
  onPress: () => void;
  disabled?: boolean;
  compact?: boolean;
  style?: ViewStyle;
}

export const Button = ({
  variant = 'primary',
  label,
  onPress,
  disabled = false,
  compact = false,
  style,
}: ButtonProps) => {
  const opacity = disabled ? 0.48 : 1;
  const height = compact ? 40 : 48;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height,
      paddingHorizontal: 16,
      borderRadius: 9999, // Fully rounded as per design system
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: '#FF4B4B',
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: `rgba(255, 75, 75, ${opacity})`,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: compact ? 14 : 16,
      fontWeight: '600',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: '#FFFFFF',
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: '#FF4B4B',
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: '#A0A0A0',
        };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.64} // As per design system hover state
    >
      <ThemedText style={getTextStyle()}>{label}</ThemedText>
    </TouchableOpacity>
  );
}; 