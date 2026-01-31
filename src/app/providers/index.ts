import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from '@shared/config/theme';
import { useColorScheme } from 'react-native'; // Keep for now if App component uses it directly

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  // Theme selection should ideally be in RootLayout or a theme context
  // For now, it remains here to prevent breaking previous components
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </QueryClientProvider>
  );
}
