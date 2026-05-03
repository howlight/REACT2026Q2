import './SearchSection.css';

import { Component } from 'react';

import { Search } from './components/search';
import type { SearchProps } from './components/search/types';

export class SearchSection extends Component<SearchProps> {
  render() {
    return (
      <section className="search">
        <h2 className="search-title">
          <span className="search-gradient">Search</span> Items...
        </h2>
        <Search {...this.props} />
      </section>
    );
  }
}
