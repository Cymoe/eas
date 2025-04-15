import { View, Text, StyleSheet } from 'react-native';

export default function Filters() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Filters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
}); 