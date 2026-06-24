'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from './layout.module.css';

type Props = {
  children: ReactNode;
  details: ReactNode;
};

export default function MainLayout({ children, details }: Props) {
  const pathname = usePathname();
  const isDetailsOpened = pathname?.startsWith('/details/');

  return (
    <div className={`${styles.mainPageLayout} ${isDetailsOpened ? styles.split : ''}`}>
      <div className={styles.mainPage}>{children}</div>
      <div className={styles.detailsWrapper}>{details}</div>
    </div>
  );
}
