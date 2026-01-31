import { APP_NAME, API_URL, DEFAULT_LANGUAGE, DEFAULT_THEME } from '../constants';

describe('Constants', () => {
  it('APP_NAME should be defined', () => {
    expect(APP_NAME).toBe('AuraAssistant');
  });

  it('API_URL should be defined', () => {
    // Depending on whether EXPO_PUBLIC_API_URL is set in the environment
    // This test might need to be adjusted or mocked
    expect(API_URL).toBeDefined();
    expect(API_URL).toMatch(/^http/); // Expect it to be a URL
  });

  it('DEFAULT_LANGUAGE should be "en"', () => {
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it('DEFAULT_THEME should be "light"', () => {
    expect(DEFAULT_THEME).toBe('light');
  });
});
