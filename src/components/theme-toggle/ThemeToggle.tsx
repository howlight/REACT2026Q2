'use client';

import { useTranslations } from 'next-intl';

import { useTheme } from '~/providers/theme/useTheme';

import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('ThemeToggle');

  return (
    <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Switch theme">
      {theme === 'light' ? t('dark') : t('light')}
    </button>
  );
}
