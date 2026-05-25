import { useSelectedStore } from '~/app/store/useSelectedStore';
import { downloadCharactersCsv } from '~/utils/downloadCsv';

import styles from './Flyout.module.css';

export const Flyout = () => {
  const selectedCharacters = useSelectedStore((state) => state.selectedCharacters);
  const unselectAll = useSelectedStore((state) => state.unselectAll);

  const count = selectedCharacters.length;

  if (count === 0) return null;

  const handleDownload = () => {
    downloadCharactersCsv(selectedCharacters);
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
