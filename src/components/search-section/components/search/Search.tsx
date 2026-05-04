import './Search.css';

import { Component } from 'react';

import loupeIcon from './assets/loupe.svg';
import type { SearchProps } from './types';

export class Search extends Component<SearchProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const { value } = this.props;

    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          className="search-input"
          value={value}
          onChange={this.handleChange}
          type="text"
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
