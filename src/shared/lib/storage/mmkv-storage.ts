import { Storage } from 'react-native-mmkv';

export const mmkvStorage = new Storage({
  id: 'aura-assistant-storage',
  encryptionKey: 'your-encryption-key-here', // TODO: Use a secure, generated key
});

export const storage = {
  getItem: (key: string) => {
    return mmkvStorage.getString(key);
  },
  setItem: (key: string, value: string) => {
    mmkvStorage.set(key, value);
  },
  removeItem: (key: string) => {
    mmkvStorage.delete(key);
  },
  clearAll: () => {
    mmkvStorage.clearAll();
  },
};
