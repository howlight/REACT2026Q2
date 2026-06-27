'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ChangeEvent, FormEvent } from 'react';

import styles from './Search.module.css';
import type { SearchProps } from './types';

export function Search({ value, onChange, onSubmit }: SearchProps) {
  const t = useTranslations('Search');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        type="text"
        name="search"
        placeholder={t('placeholder')}
        aria-label="Search query"
      />
      <button className={styles.searchButton} aria-label="search items" type="submit">
        <Image
          className={styles.searchIcon}
          src="/img/loupe.svg"
          alt="search"
          width={25}
          height={25}
        />
      </button>
    </form>
  );
}
