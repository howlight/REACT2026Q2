'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import styles from './RefreshDataButton.module.css';

export function RefreshDataButton() {
  const t = useTranslations('RefreshButton');
  const queryClient = useQueryClient();

  const handleDataRefresh = () => {
    void queryClient.invalidateQueries();
  };

  return (
    <button
      className={styles.refreshDataBtn}
      onClick={handleDataRefresh}
      aria-label={t('ariaLabel')}
    >
      {t('refresh')}
    </button>
  );
}
