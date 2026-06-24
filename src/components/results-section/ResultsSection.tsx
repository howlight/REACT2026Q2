import type { Character } from '~/api/rick-morty.types';

import { CharacterCard } from './components/character-card';
import styles from './ResultsSection.module.css';

export type Props = {
  characters: Character[];
  loading: boolean;
  error: Error | null;
};

export function ResultsSection({ characters, loading, error }: Props) {
  if (loading) {
    return (
      <section className={styles.results}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} role="status" />
          <p className={styles.loadingText}>Loading characters...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.results}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>❗</div>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>
      </section>
    );
  }

  if (characters.length === 0) {
    return (
      <section className={styles.results}>
        <p className={styles.noResults}>No results found for your search.</p>
      </section>
    );
  }

  return (
    <section className={styles.results}>
      <div className={styles.charactersGrid}>
        {characters.map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>
    </section>
  );
}
