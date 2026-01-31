import { lightTheme, darkTheme } from '../theme';

describe('Theme', () => {
  it('lightTheme should be defined', () => {
    expect(lightTheme).toBeDefined();
    expect(lightTheme.colors.primary).toBe('#6200EE');
  });

  it('darkTheme should be defined', () => {
    expect(darkTheme).toBeDefined();
    expect(darkTheme.colors.primary).toBe('#BB86FC');
  });

  it('lightTheme should use MD3LightTheme and DefaultTheme', () => {
    expect(lightTheme.colors.background).toBe('#f6f6f6');
  });

  it('darkTheme should use MD3DarkTheme and DarkTheme', () => {
    expect(darkTheme.colors.background).toBe('#121212');
  });
});
