import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '../button';
import { PaperProvider } from 'react-native-paper';

describe('Button', () => {
  it('renders correctly', () => {
    render(
      <PaperProvider>
        <Button onPress={() => {}}>Test Button</Button>
      </PaperProvider>
    );
    expect(screen.getByText('Test Button')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(
      <PaperProvider>
        <Button onPress={onPressMock}>Test Button</Button>
      </PaperProvider>
    );
    fireEvent.press(screen.getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <PaperProvider>
        <Button onPress={() => {}} disabled>Disabled Button</Button>
      </PaperProvider>
    );
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });
});
