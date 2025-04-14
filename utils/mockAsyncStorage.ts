/**
 * Mock AsyncStorage implementation for development
 * This helps avoid the AsyncStorage errors during development
 */

class MockAsyncStorage {
  private storage: Record<string, string> = {};

  async getItem(key: string): Promise<string | null> {
    return this.storage[key] || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.storage[key] = value;
  }

  async removeItem(key: string): Promise<void> {
    delete this.storage[key];
  }

  async clear(): Promise<void> {
    this.storage = {};
  }

  async getAllKeys(): Promise<string[]> {
    return Object.keys(this.storage);
  }

  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    return keys.map(key => [key, this.storage[key] || null]);
  }

  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    keyValuePairs.forEach(([key, value]) => {
      this.storage[key] = value;
    });
  }

  async multiRemove(keys: string[]): Promise<void> {
    keys.forEach(key => {
      delete this.storage[key];
    });
  }
}

export default new MockAsyncStorage();
