import { useEffect } from 'react';

import { useLocalStorage } from '~/hooks/useLocalStorage';

import type { Theme } from './theme.types';
import { ThemeContext } from './theme-context';

type Props = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'theme';

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEY, 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
