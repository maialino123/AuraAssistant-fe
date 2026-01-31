import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '@shared/ui';

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (text: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ searchTerm, onSearchTermChange, placeholder = 'Search tasks...' }: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        label="Search"
        value={searchTerm}
        onChangeText={onSearchTermChange}
        placeholder={placeholder}
        // Add a search icon
        // right={<PaperTextInput.Icon icon="magnify" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
