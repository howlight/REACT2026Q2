'use client';

import { useTranslations } from 'next-intl';

import { useAppStore } from '~/store';
import { useSelectedCharacters, useSelectedCount } from '~/store/selectors';
import { downloadCharactersCsv } from '~/utils/downloadCsv';

import styles from './Flyout.module.css';

export function Flyout() {
  const t = useTranslations('Flyout');

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
        <span>{t('selected', { count })}</span>
      </div>
      <div className={styles.flyoutActions}>
        <button className={`${styles.flyoutBtn} ${styles.flyoutBtnUnselect}`} onClick={unselectAll}>
          {t('unselect')}
        </button>
        <button
          className={`${styles.flyoutBtn} ${styles.flyoutBtnDownload}`}
          onClick={handleDownload}
        >
          {t('download')}
        </button>
      </div>
    </div>
  );
}
