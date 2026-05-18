import './SearchSection.css';

import { Search } from './components/search';
import type { SearchProps } from './components/search/types';

export const SearchSection = (props: SearchProps) => (
  <section className="search">
    <h2 className="search-title">
      <span className="search-gradient">Search</span> Characters...
    </h2>
    <Search {...props} />
  </section>
);
