import { useNavigate, useParams, useSearchParams } from 'react-router';

import { useCharacter } from '~/api/rick-morty.hooks';

import styles from './DetailsPanel.module.css';

export const DetailsPanel = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? '1';

  const { data: character, isLoading, error } = useCharacter(Number(characterId));

  const handleClose = () => {
    void navigate(`/?page=${currentPage}`);
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
          <img src={character.image} alt={character.name} className={styles.detailsImage} />
          <h2 className={styles.detailsName}>{character.name}</h2>

          <div className={styles.detailsInfo}>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Status:</span>
              <span className={`${styles.statusBadge} status-${character.status.toLowerCase()}`}>
                {character.status}
              </span>
            </div>

            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Species:</span>
              <span>{character.species}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
