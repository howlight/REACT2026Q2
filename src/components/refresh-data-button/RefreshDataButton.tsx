'use client';

import { useQueryClient } from '@tanstack/react-query';

import styles from './RefreshDataButton.module.css';

export function RefreshDataButton() {
  const queryClient = useQueryClient();

  const handleDataRefresh = () => {
    void queryClient.invalidateQueries();
  };

  return (
    <button
      className={styles.refreshDataBtn}
      onClick={handleDataRefresh}
      aria-label="Refresh all data"
    >
      ⟳ Refresh Data
    </button>
  );
}
