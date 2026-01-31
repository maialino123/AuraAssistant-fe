import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: boolean;
  helperText?: string;
}

export const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error = false,
  helperText,
}: TextInputProps) => {
  return (
    <PaperTextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      error={error}
      style={styles.input}
      mode="outlined"
      dense
      {...(helperText && { right: <PaperTextInput.Affix text={helperText} /> })}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
});
