import { mmkvStorage, storage } from '../mmkv-storage';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  })),
  Storage: jest.fn().mockImplementation(function() {
    return new this.MMKV();
  }),
}));

describe('mmkvStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize MMKV with correct id and encryption key', () => {
    // mmkvStorage is already initialized at module load
    expect(mmkvStorage).toBeDefined();
    expect(mmkvStorage.constructor).toHaveBeenCalledWith({
      id: 'aura-assistant-storage',
      encryptionKey: 'your-encryption-key-here',
    });
  });
});

describe('storage utility', () => {
  it('getItem should call mmkvStorage.getString', () => {
    storage.getItem('testKey');
    expect(mmkvStorage.getString).toHaveBeenCalledWith('testKey');
  });

  it('setItem should call mmkvStorage.set', () => {
    storage.setItem('testKey', 'testValue');
    expect(mmkvStorage.set).toHaveBeenCalledWith('testKey', 'testValue');
  });

  it('removeItem should call mmkvStorage.delete', () => {
    storage.removeItem('testKey');
    expect(mmkvStorage.delete).toHaveBeenCalledWith('testKey');
  });

  it('clearAll should call mmkvStorage.clearAll', () => {
    storage.clearAll();
    expect(mmkvStorage.clearAll).toHaveBeenCalledTimes(1);
  });
});
