import './CharacterCard.css';

import { Link, useSearchParams } from 'react-router';

import type { Character } from '~/api/rick-morty.types';

type Props = Character;

export const CharacterCard = ({ id, name, image, status, species }: Props) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? '1';

  return (
    <Link to={`/details/${id}?page=${currentPage}`}>
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
    </Link>
  );
};
