import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

function createLocalStorageMock() {
  const store = new Map<string, string>();

  return {
    getItem: vi.fn((key: string): string | null => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string): void => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string): void => {
      store.delete(key);
    }),
    clear: vi.fn((): void => {
      store.clear();
    }),
    _reset: () => {
      store.clear();
    },
  };
}

const localStorageMock = createLocalStorageMock();
vi.stubGlobal('localStorage', localStorageMock);

afterEach(() => {
  cleanup();
  localStorageMock._reset();
  vi.clearAllMocks();
});
