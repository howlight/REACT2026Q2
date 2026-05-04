import './ResultsSection.css';

import { Component } from 'react';

import type { Character } from '~/api/rick-morty';

type Props = {
  characters: Character[];
};

export class ResultsSection extends Component<Props> {
  render() {
    const { characters } = this.props;

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
