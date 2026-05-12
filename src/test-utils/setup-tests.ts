import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

function createLocalStorageMock() {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string): string | null => store[key] ?? null),
    setItem: vi.fn((key: string, value: string): void => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string): void => {
      const { [key]: _, ...rest } = store;
      store = rest;
    }),
    clear: vi.fn((): void => {
      store = {};
    }),
    _reset: () => {
      store = {};
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
