'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useCharacter } from '~/api/rick-morty.hooks';

import styles from './DetailsPanel.module.css';

type Props = {
  characterId: string;
  currentPage: string;
};

export function DetailsPanel({ characterId, currentPage }: Props) {
  console.log(characterId);
  const router = useRouter();

  const { data: character, isLoading, error } = useCharacter(Number(characterId));

  const handleClose = () => {
    router.push(`/?page=${currentPage}`);
  };

  return (
    <aside className={styles.detailsPanel}>
      <button className={styles.detailsClose} onClick={handleClose} aria-label="Close details">
        ×
      </button>

      {isLoading && (
        <div className={styles.detailsLoading}>
          <div className={styles.spinner}></div>
          <p>Loading character details...</p>
        </div>
      )}

      {error && (
        <div className={styles.detailsError}>
          <span className={styles.errorIcon}>⚠️</span>
          <p>{error.message}</p>
        </div>
      )}

      {character && !isLoading && (
        <div>
          <Image
            src={character.image}
            alt={character.name}
            className={styles.detailsImage}
            width={250}
            height={250}
          />
          <h2 className={styles.detailsName}>{character.name}</h2>

          <div className={styles.detailsInfo}>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Status:</span>
              <span className={`status-badge status-${character.status.toLowerCase()}`}>
                {character.status}
              </span>
            </div>

            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Species:</span>
              <span className="species-badge">{character.species}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
