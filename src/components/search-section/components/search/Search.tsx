import './Search.css';

import type { ChangeEvent, FormEvent } from 'react';

import loupeIcon from './assets/loupe.svg';
import type { SearchProps } from './types';

export const Search = ({ value, onChange, onSubmit }: SearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        value={value}
        onChange={handleChange}
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
};
