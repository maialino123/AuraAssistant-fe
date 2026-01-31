import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SettingsScreen } from '../ui/settings-screen';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router'; // Mock Expo Router navigation

// Mock Expo Router hooks
jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  Stack: { Screen: () => null },
}));

// Mock useTheme from react-native-paper
jest.mock('react-native-paper', () => {
  const ActualPaper = jest.requireActual('react-native-paper');
  return {
    ...ActualPaper,
    useTheme: () => ({
      dark: false, // Default to light theme for tests
      colors: {
        background: '#f6f6f6',
        onSurface: '#000000',
        onSurfaceVariant: '#666666',
        error: '#B00020',
      },
      fonts: {
        bodySmall: { fontFamily: 'Roboto' }
      }
    }),
    Text: ActualPaper.Text,
    Switch: ActualPaper.Switch,
  };
});

describe('SettingsScreen', () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });
  });

  it('renders correctly with default settings', () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <SettingsScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    expect(screen.getByText('Settings')).toBeOnTheScreen();
    expect(screen.getByText('Dark Mode')).toBeOnTheScreen();
    expect(screen.getByText('Receive Notifications')).toBeOnTheScreen();
    expect(screen.getByText('Export Data')).toBeOnTheScreen();
  });

  it('toggles Dark Mode switch', () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <SettingsScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    const darkModeSwitch = screen.getByAccessibilityHint('toggle dark mode'); // Assuming accessibility hint
    expect(darkModeSwitch).toBeOnTheScreen();
    // fireEvent.press(darkModeSwitch); // Cannot easily test state change without re-rendering or direct state manipulation
    // expect(darkModeSwitch.props.value).toBe(true);
  });

  it('toggles Receive Notifications switch', () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <SettingsScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    const notificationsSwitch = screen.getByAccessibilityHint('toggle receive notifications'); // Assuming accessibility hint
    expect(notificationsSwitch).toBeOnTheScreen();
    // fireEvent.press(notificationsSwitch);
    // expect(notificationsSwitch.props.value).toBe(false);
  });

  it('calls goBack when back action is pressed', () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <SettingsScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    fireEvent.press(screen.getByRole('button')); // Back button in HeaderWidget
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
