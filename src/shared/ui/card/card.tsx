import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Card as PaperCard, useTheme } from 'react-native-paper';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  /**
   * Elevation for the card.
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const Card = ({ children, onPress, elevation = 1, style, ...rest }: CardProps) => {
  const theme = useTheme();
  return (
    <PaperCard
      elevation={elevation}
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.colors.surface }, style]}
      {...rest}
    >
      <View style={styles.content}>{children}</View>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  content: {
    padding: 16,
  },
});
