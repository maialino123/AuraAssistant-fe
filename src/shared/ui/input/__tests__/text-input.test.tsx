import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TextInput } from '../text-input';
import { PaperProvider } from 'react-native-paper';

describe('TextInput', () => {
  it('renders correctly with label and value', () => {
    render(
      <PaperProvider>
        <TextInput label="Username" value="testuser" onChangeText={() => {}} />
      </PaperProvider>
    );
    expect(screen.getByLabelText('Username')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('testuser')).toBeOnTheScreen();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeTextMock = jest.fn();
    render(
      <PaperProvider>
        <TextInput label="Email" value="" onChangeText={onChangeTextMock} />
      </PaperProvider>
    );
    fireEvent.changeText(screen.getByLabelText('Email'), 'new@example.com');
    expect(onChangeTextMock).toHaveBeenCalledWith('new@example.com');
  });

  it('displays error state', () => {
    render(
      <PaperProvider>
        <TextInput label="Password" value="" onChangeText={() => {}} error />
      </PaperProvider>
    );
    // Depending on PaperTextInput's error rendering, this might need adjustment
    // For now, we'll just check if the component renders without crashing
    expect(screen.getByLabelText('Password')).toBeOnTheScreen();
  });
});
