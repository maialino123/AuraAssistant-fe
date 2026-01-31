import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';

// Define fonts
const fontConfig = {
  // Add custom fonts here if needed
  // default: {
  //   fontFamily: 'Roboto',
  //   fontWeight: 'normal',
  // },
};

export const lightTheme = {
  ...DefaultTheme,
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
  colors: {
    ...DefaultTheme.colors,
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    accent: '#03DAC4',
    background: '#f6f6f6',
    surface: '#ffffff',
    text: '#000000',
    onSurface: '#000000',
    onBackground: '#000000',
    error: '#B00020',
  },
};

export const darkTheme = {
  ...DarkTheme,
  ...MD3DarkTheme,
  fonts: configureFonts({config: fontConfig}),
  colors: {
    ...DarkTheme.colors,
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    accent: '#03DAC5',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#ffffff',
    onSurface: '#ffffff',
    onBackground: '#ffffff',
    error: '#CF6679',
  },
};
