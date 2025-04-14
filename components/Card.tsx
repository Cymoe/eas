import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'dialog' | 'menu';
  withGradient?: boolean;
  style?: ViewStyle;
}

export const Card = ({
  children,
  variant = 'standard',
  withGradient = false,
  style,
}: CardProps) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12, // Maximum 12px as per design system
      overflow: 'hidden',
    };

    switch (variant) {
      case 'dialog':
        return {
          ...baseStyle,
          padding: 24,
          backgroundColor: '#121212',
        };
      case 'menu':
        return {
          ...baseStyle,
          padding: 12,
          backgroundColor: '#121212',
        };
      default:
        return {
          ...baseStyle,
          padding: 16,
          backgroundColor: 'rgba(255,255,255,0.08)',
        };
    }
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
      {withGradient && (
        <LinearGradient
          colors={['rgba(255,75,75,0.08)', 'rgba(30,215,96,0.08)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
}); 