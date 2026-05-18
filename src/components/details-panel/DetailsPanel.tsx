import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import { getCharacterById } from '~/api/rick-morty.api';
import type { Character } from '~/api/rick-morty.types';

import styles from './DetailsPanel.module.css';

export const DetailsPanel = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? '1';

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);

      try {
        const character = await getCharacterById(Number(characterId));
        setCharacter(character);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load character';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    void fetchCharacter();
  }, [characterId]);

  const handleClose = () => {
    void navigate(`/?page=${currentPage}`);
  };

  return (
    <aside className={styles.detailsPanel}>
      <button className={styles.detailsClose} onClick={handleClose} aria-label="Close details">
        ×
      </button>

      {loading && (
        <div className={styles.detailsLoading}>
          <div className={styles.spinner}></div>
          <p>Loading character details...</p>
        </div>
      )}

      {error && (
        <div className={styles.detailsError}>
          <span className={styles.errorIcon}>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {character && !loading && (
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
