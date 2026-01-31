import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { HeaderWidget } from '../ui/header-widget';
import { PaperProvider } from 'react-native-paper'; // For PaperProvider context

// Mock react-native-paper's useTheme
jest.mock('react-native-paper', () => {
  const ActualPaper = jest.requireActual('react-native-paper');
  return {
    ...ActualPaper,
    useTheme: () => ({
      colors: {
        primary: '#6200EE',
        onSurface: '#000000',
        onSurfaceVariant: '#666666',
        surface: '#ffffff',
      },
    }),
  };
});


describe('HeaderWidget', () => {
  it('renders title correctly', () => {
    render(
      <PaperProvider>
        <HeaderWidget title="My App" />
      </PaperProvider>
    );
    expect(screen.getByText('My App')).toBeOnTheScreen();
  });

  it('renders subtitle correctly', () => {
    render(
      <PaperProvider>
        <HeaderWidget title="My App" subtitle="Dashboard" />
      </PaperProvider>
    );
    expect(screen.getByText('Dashboard')).toBeOnTheScreen();
  });

  it('renders back action when showBackAction is true', () => {
    render(
      <PaperProvider>
        <HeaderWidget title="My App" showBackAction={true} onBackPress={jest.fn()} />
      </PaperProvider>
    );
    // Assuming Paper Appbar.BackAction creates a touchable element with accessibilityRole 'button'
    expect(screen.getByRole('button')).toBeOnTheScreen();
  });

  it('calls onBackPress when back action is pressed', () => {
    const onBackPressMock = jest.fn();
    render(
      <PaperProvider>
        <HeaderWidget title="My App" showBackAction={true} onBackPress={onBackPressMock} />
      </PaperProvider>
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onBackPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders right actions', () => {
    const TestRightAction = () => <Text>Right</Text>;
    render(
      <PaperProvider>
        <HeaderWidget title="My App" rightActions={<TestRightAction />} />
      </PaperProvider>
    );
    expect(screen.getByText('Right')).toBeOnTheScreen();
  });
});
