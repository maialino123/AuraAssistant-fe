import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Card } from '../card';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <PaperProvider>
        <Card><Text>Card Content</Text></Card>
      </PaperProvider>
    );
    expect(screen.getByText('Card Content')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(
      <PaperProvider>
        <Card onPress={onPressMock}><Text>Pressable Card</Text></Card>
      </PaperProvider>
    );
    fireEvent.press(screen.getByText('Pressable Card'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
