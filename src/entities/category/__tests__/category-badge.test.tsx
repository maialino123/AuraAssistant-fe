import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { CategoryBadge } from '../ui/category-badge';
import { Category } from '../model/category-types';
import { PaperProvider } from 'react-native-paper'; // Import PaperProvider for context

// Mock useTheme from react-native-paper
jest.mock('react-native-paper', () => {
  const RealModule = jest.requireActual('react-native-paper');
  return {
    ...RealModule,
    useTheme: () => ({
      colors: {
        primaryContainer: '#EADDFF',
        onPrimaryContainer: '#21005D',
      },
    }),
  };
});

describe('CategoryBadge', () => {
  const mockCategory: Category = {
    id: '1',
    name: 'Work',
    color: '#1A73E8',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  it('renders category name correctly', () => {
    render(
      <PaperProvider>
        <CategoryBadge category={mockCategory} />
      </PaperProvider>
    );
    expect(screen.getByText('Work')).toBeOnTheScreen();
  });

  it('applies custom color if provided', () => {
    render(
      <PaperProvider>
        <CategoryBadge category={mockCategory} />
      </PaperProvider>
    );
    const badgeElement = screen.getByText('Work').parent;
    expect(badgeElement?.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ backgroundColor: '#1A73E8' })]));
  });

  it('applies default color if no custom color', () => {
    const defaultCategory = { ...mockCategory, color: undefined };
    render(
      <PaperProvider>
        <CategoryBadge category={defaultCategory} />
      </PaperProvider>
    );
    const badgeElement = screen.getByText('Work').parent;
    expect(badgeElement?.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ backgroundColor: '#EADDFF' })]));
  });
});
