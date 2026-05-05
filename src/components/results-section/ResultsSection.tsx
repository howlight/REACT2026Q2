import './ResultsSection.css';

import { Component } from 'react';

import type { Character } from '~/api/rick-morty';

type Props = {
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
            <div className="spinner"></div>
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
            <article key={character.id} className="character-card">
              <img
                src={character.image}
                alt={character.name}
                className="character-image"
                loading="lazy"
              />
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <div className="character-details">
                  <span className={`status-badge status-${character.status.toLowerCase()}`}>
                    {character.status}
                  </span>
                  <span className="species-badge">{character.species}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
}
