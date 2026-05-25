import { useTheme } from '~/app/providers/theme/useTheme';

import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Switch theme">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};
