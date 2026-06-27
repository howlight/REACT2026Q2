'use client';

import { useEffect, useState } from 'react';

export const useLocalStorage = <T extends string>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const saved = localStorage.getItem(key);
    return (saved as T) ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
