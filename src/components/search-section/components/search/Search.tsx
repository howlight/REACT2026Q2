import './Search.css';

import { Component } from 'react';

import loupeIcon from './assets/loupe.svg';

export class Search extends Component {
  render() {
    return (
      <form className="search-form">
        <input
          className="search-input"
          type="text"
          id="search"
          name="search"
          placeholder="Enter search term..."
          aria-label="Search query"
        />
        <button className="search-button" aria-label="search items" type="submit">
          <img className="search-icon" src={loupeIcon} alt="search" width="25" height="25" />
        </button>
      </form>
    );
  }
}
