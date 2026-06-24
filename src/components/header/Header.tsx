'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ThemeToggle } from '../theme-toggle';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
        <Image src="/img/logo.webp" alt="Logotype Rick & Morty" width={200} height={61} priority />
        <ThemeToggle />
      </div>
    </header>
  );
}
