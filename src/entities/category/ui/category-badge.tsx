import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Category } from '../model/category-types';

interface CategoryBadgeProps {
  category: Category;
}

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: category.color || theme.colors.primaryContainer }]}>
      <Text variant="labelSmall" style={[styles.text, { color: theme.colors.onPrimaryContainer }]}>
        {category.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
  },
});
