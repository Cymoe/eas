import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from './ThemedText';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  success?: string;
  style?: ViewStyle;
}

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  success,
  style,
}: InputProps) => {
  const getHelperColor = () => {
    if (error) return '#F41857';
    if (success) return '#6BFF90';
    return 'rgba(255,255,255,0.48)';
  };

  const getHelperText = () => {
    if (error) return error;
    if (success) return success;
    return '';
  };

  return (
    <View style={[styles.container, style]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View
        style={[
          styles.inputContainer,
          error && styles.errorInput,
          success && styles.successInput,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.48)"
          style={[
            styles.input,
            { color: value ? '#FFFFFF' : 'rgba(255,255,255,0.48)' },
          ]}
        />
      </View>
      {(error || success) && (
        <ThemedText style={[styles.helperText, { color: getHelperColor() }]}>
          {getHelperText()}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.48)',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  inputContainer: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    height: '100%',
    padding: 0, // Remove default padding
  },
  errorInput: {
    backgroundColor: 'rgba(244,24,87,0.08)',
  },
  successInput: {
    backgroundColor: 'rgba(107,255,144,0.08)',
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
}); 