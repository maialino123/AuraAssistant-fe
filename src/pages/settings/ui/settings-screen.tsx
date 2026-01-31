import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import { HeaderWidget } from '@widgets/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router'; // Assuming Expo Router navigation

export const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [isDarkMode, setIsDarkMode] = useState(theme.dark); // Use actual theme.dark state
  const [receiveNotifications, setReceiveNotifications] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode); // This would need to update the actual theme state
  const toggleNotifications = () => setReceiveNotifications(!receiveNotifications);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <HeaderWidget title="Settings" showBackAction onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Appearance
          </Text>
          <View style={styles.settingRow}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Notifications
          </Text>
          <View style={styles.settingRow}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>Receive Notifications</Text>
            <Switch value={receiveNotifications} onValueChange={toggleNotifications} />
          </View>
          {/* Add more notification settings here */}
        </View>

        {/* Add more settings sections */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Data
          </Text>
          <View style={styles.settingRow}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>Export Data</Text>
            {/* Implement export functionality */}
            <Text>JSON</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'transparent', // Ensure it doesn't hide background color
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    // Add separator
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc', // Use theme.colors.outline or similar
  },
});
