'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import type { Character } from '~/api/rick-morty.types';
import { Link } from '~/i18n/navigation';
import { useAppStore } from '~/store';
import { useIsSelected } from '~/store/selectors';

import styles from './CharacterCard.module.css';

type Props = Character;

export function CharacterCard({ id, name, image, status, species }: Props) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') ?? '1';

  const isSelected = useIsSelected(id);
  const toggleSelected = useAppStore((state) => state.toggleSelected);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleSelected({ id, name, image, status, species });
  };

  return (
    <Link href={`/details/${id}?page=${currentPage}`}>
      <article className={styles.characterCard}>
        <Image
          src={image}
          alt={name}
          className={styles.characterImage}
          width={300}
          height={300}
          loading="eager"
        />
        <div className={styles.characterInfo}>
          <h3 className={styles.characterName}>{name}</h3>
          <div className={styles.characterDetails}>
            <span className={`status-badge status-${status.toLocaleLowerCase()}`}>{status}</span>
            <span className="species-badge">{species}</span>
          </div>
          <div>
            <input
              className={styles.characterCheckbox}
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
}
