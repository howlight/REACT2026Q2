import './CharacterCard.css';

import { Link, useSearchParams } from 'react-router';

import type { Character } from '~/api/rick-morty.types';
import { useSelectedStore } from '~/app/store/useSelectedStore';

type Props = Character;

export const CharacterCard = ({ id, name, image, status, species }: Props) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? '1';

  const isSelected = useSelectedStore((state) => state.isSelected(id));
  const toggleSelected = useSelectedStore((state) => state.toggleSelected);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleSelected({ id, name, image, status, species });
  };

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
          <div>
            <input
              className="character-checkbox"
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Select ${name}`}
            />
          </div>
        </div>
      </article>
    </Link>
  );
};
