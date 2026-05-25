import { useSelectedStore } from '~/app/store/useSelectedStore';

import styles from './Flyout.module.css';

export const Flyout = () => {
  const selectedIds = useSelectedStore((state) => state.selectedIds);
  const unselectAll = useSelectedStore((state) => state.unselectAll);

  const count = selectedIds.length;

  if (count === 0) return null;

  const handleDownload = () => {
    console.log('Download selected items:', selectedIds);
  };

  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutInfo}>
        <span className={styles.flyoutCount}>{count}</span>
        <span>{count === 1 ? 'item selected' : 'items selected'}</span>
      </div>
      <div className={styles.flyoutActions}>
        <button className={`${styles.flyoutBtn} ${styles.flyoutBtnUnselect}`} onClick={unselectAll}>
          Unselect all
        </button>
        <button
          className={`${styles.flyoutBtn} ${styles.flyoutBtnDownload}`}
          onClick={handleDownload}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};
