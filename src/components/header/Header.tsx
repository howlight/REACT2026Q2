import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '~/i18n/navigation';

import { LanguageSwitcher } from '../language-switcher';
import { ThemeToggle } from '../theme-toggle';
import styles from './Header.module.css';

export function Header() {
  const t = useTranslations('Header');

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <Link href="/">{t('home')}</Link>
          <Link href="/about">{t('about')}</Link>
        </nav>
        <Image src="/img/logo.webp" alt="Logotype Rick & Morty" width={200} height={61} priority />
        <div className={styles.actions}>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
