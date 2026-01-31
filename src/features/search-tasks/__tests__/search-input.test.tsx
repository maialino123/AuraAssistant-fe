import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SearchInput } from '../ui/search-input';
import { PaperProvider } from 'react-native-paper'; // For PaperProvider context

// Mock react-native-paper's useTheme
jest.mock('react-native-paper', () => {
  const ActualPaper = jest.requireActual('react-native-paper');
  return {
    ...ActualPaper,
    useTheme: () => ({
      colors: {
        primary: '#6200EE',
        accent: '#03DAC4',
        background: '#f6f6f6',
        surface: '#ffffff',
        text: '#000000',
        onSurface: '#000000',
        onBackground: '#000000',
        error: '#B00020',
      },
    }),
  };
});

describe('SearchInput', () => {
  const mockOnSearchTermChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default placeholder', () => {
    render(
      <PaperProvider>
        <SearchInput searchTerm="" onSearchTermChange={mockOnSearchTermChange} />
      </PaperProvider>
    );
    expect(screen.getByPlaceholderText('Search tasks...')).toBeOnTheScreen();
  });

  it('renders correctly with custom placeholder', () => {
    render(
      <PaperProvider>
        <SearchInput searchTerm="" onSearchTermChange={mockOnSearchTermChange} placeholder="Find your tasks" />
      </PaperProvider>
    );
    expect(screen.getByPlaceholderText('Find your tasks')).toBeOnTheScreen();
  });

  it('displays the current search term', () => {
    render(
      <PaperProvider>
        <SearchInput searchTerm="grocery" onSearchTermChange={mockOnSearchTermChange} />
      </PaperProvider>
    );
    expect(screen.getByDisplayValue('grocery')).toBeOnTheScreen();
  });

  it('calls onSearchTermChange when text is entered', () => {
    render(
      <PaperProvider>
        <SearchInput searchTerm="" onSearchTermChange={mockOnSearchTermChange} />
      </PaperProvider>
    );
    fireEvent.changeText(screen.getByLabelText('Search'), 'new query');
    expect(mockOnSearchTermChange).toHaveBeenCalledWith('new query');
  });
});
