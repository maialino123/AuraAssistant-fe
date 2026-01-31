import { AppProviders } from './providers';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AppProviders>
      {/* For now, just a placeholder. Navigation will go here. */}
      <View style={styles.container}>
        <Text>Welcome to AuraAssistant!</Text>
        <StatusBar style="auto" />
      </View>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
