import './ResultsSection.css';

import { Component } from 'react';

import type { Character } from '~/api/rick-morty.types';

import { CharacterCard } from './components/character-card';

export type Props = {
  characters: Character[];
  loading: boolean;
  error: string | null;
};

export class ResultsSection extends Component<Props> {
  render() {
    const { characters, loading, error } = this.props;

    if (loading) {
      return (
        <section className="results">
          <div className="loading-container">
            <div className="spinner" role="status" />
            <p className="loading-text">Loading characters...</p>
          </div>
        </section>
      );
    }

    if (error) {
      return (
        <section className="results">
          <div className="error-container">
            <div className="error-icon">❗</div>
            <p className="error-message">{error}</p>
          </div>
        </section>
      );
    }

    if (characters.length === 0) {
      return (
        <section className="results">
          <p className="no-results">No results found for your search.</p>
        </section>
      );
    }

    return (
      <section className="results">
        <div className="characters-grid">
          {characters.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      </section>
    );
  }
}
