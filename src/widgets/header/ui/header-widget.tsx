import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { StyleProp, ViewStyle, Platform } from 'react-native';

interface HeaderWidgetProps {
  title: string;
  subtitle?: string;
  showBackAction?: boolean;
  onBackPress?: () => void;
  rightActions?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const HeaderWidget = ({
  title,
  subtitle,
  showBackAction = false,
  onBackPress,
  rightActions,
  style,
}: HeaderWidgetProps) => {
  const theme = useTheme();

  return (
    <Appbar.Header style={[{ backgroundColor: theme.colors.surface }, style]}>
      {showBackAction && onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content
        title={title}
        subtitle={subtitle}
        titleStyle={{ color: theme.colors.onSurface }}
        subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
      />
      {rightActions}
    </Appbar.Header>
  );
};
