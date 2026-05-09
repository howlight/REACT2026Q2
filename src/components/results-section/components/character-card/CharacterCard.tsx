import './CharacterCard.css';

import { Component } from 'react';

import type { Character } from '~/api/rick-morty';

type Props = Omit<Character, 'id'>;

export class CharacterCard extends Component<Props> {
  render() {
    const { name, image, status, species } = this.props;

    return (
      <article className="character-card">
        <img src={image} alt={name} className="character-image" loading="lazy" />
        <div className="character-info">
          <h3 className="character-name">{name}</h3>
          <div className="character-details">
            <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>
            <span className="species-badge">{species}</span>
          </div>
        </div>
      </article>
    );
  }
}
