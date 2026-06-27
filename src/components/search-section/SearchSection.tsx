import { Search } from './components/search';
import type { SearchProps } from './components/search/types';
import styles from './SearchSection.module.css';

export function SearchSection(props: SearchProps) {
  return (
    <section className={styles.search}>
      <Search {...props} />
    </section>
  );
}
