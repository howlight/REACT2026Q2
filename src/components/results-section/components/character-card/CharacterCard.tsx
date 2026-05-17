import './CharacterCard.css';

import type { Character } from '~/api/rick-morty.types';

type Props = Omit<Character, 'id'>;

export const CharacterCard = ({ name, image, status, species }: Props) => (
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
