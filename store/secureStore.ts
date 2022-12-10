import * as SecureStore from "expo-secure-store";

export default function createSecureStorage() {
  const options: SecureStore.SecureStoreOptions = {
    keychainAccessible: SecureStore.WHEN_UNLOCKED,
  };

  return {
    getItem: (key: string) =>
      SecureStore.getItemAsync(defaultReplacer(key), options),
    setItem: (key: string, value: string) =>
      SecureStore.setItemAsync(defaultReplacer(key), value, options),
    removeItem: (key: string) =>
      SecureStore.deleteItemAsync(defaultReplacer(key), options),
  };
}

const defaultReplacer = (key: string): string => {
  const replaceChar = "_";
  return key.replace(/[^a-z0-9.\-_]/gi, replaceChar);
};
