'use client';

import { useAppStore } from '~/store';
import { useSelectedCharacters, useSelectedCount } from '~/store/selectors';
import { downloadCharactersCsv } from '~/utils/downloadCsv';

import styles from './Flyout.module.css';

export function Flyout() {
  const selectedCharacters = useSelectedCharacters();
  const count = useSelectedCount();
  const unselectAll = useAppStore((state) => state.unselectAll);

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
}
