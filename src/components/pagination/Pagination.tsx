'use client';

import { useTranslations } from 'next-intl';

import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const t = useTranslations('Pagination');

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {t('prev')}
      </button>

      <span className={styles.paginationPages}>{t('page', { currentPage, totalPages })}</span>

      <button
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t('next')}
      </button>
    </div>
  );
}
