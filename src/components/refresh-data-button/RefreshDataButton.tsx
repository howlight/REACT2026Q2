import { useQueryClient } from '@tanstack/react-query';

import styles from './RefreshDataButton.module.css';

export const RefreshDataButton = () => {
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
      ⟳ Refetch
    </button>
  );
};
