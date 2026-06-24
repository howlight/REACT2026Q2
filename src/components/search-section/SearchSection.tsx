import { Search } from './components/search';
import type { SearchProps } from './components/search/types';
import styles from './SearchSection.module.css';

export function SearchSection(props: SearchProps) {
  return (
    <section className={styles.search}>
      <h2 className={styles.searchTitle}>
        <span className={styles.searchGradient}>Search</span> Characters...
      </h2>
      <Search {...props} />
    </section>
  );
}
