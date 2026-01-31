import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  mode?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({ onPress, children, mode = 'contained', disabled = false, loading = false }: ButtonProps) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={styles.button}
      labelStyle={styles.label}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  label: {
    paddingVertical: 4,
  },
});
