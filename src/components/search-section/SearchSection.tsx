import './SearchSection.css';

import { Component } from 'react';

import { Search } from './components/search';

export class SearchSection extends Component {
  render() {
    return (
      <section className="search">
        <h2 className="search-title">
          <span className="search-gradient">Search</span> Items...
        </h2>
        <Search />
      </section>
    );
  }
}
