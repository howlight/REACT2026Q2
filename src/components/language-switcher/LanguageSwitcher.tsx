'use client';

import { useLocale } from 'next-intl';

import { Link, usePathname } from '~/i18n/navigation';

import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={styles.switcher}>
      <Link
        href={pathname}
        locale="en"
        className={`${styles.btn} ${locale === 'en' ? styles.active : ''}`}
        aria-label="Switch to English"
      >
        EN
      </Link>

      <Link
        href={pathname}
        locale="ru"
        className={`${styles.btn} ${locale === 'ru' ? styles.active : ''}`}
        aria-label="Switch to Russian"
      >
        RU
      </Link>
    </div>
  );
}
