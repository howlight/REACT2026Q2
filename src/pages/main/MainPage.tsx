import './MainPage.css';

import { useEffect, useState } from 'react';

import { getCharacters } from '~/api/rick-morty.api';
import type { Character } from '~/api/rick-morty.types';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';
import { useLocalStorage } from '~/hooks/useLocalStorage';

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');
  const [lastSearchTerm, setLastSearchTerm] = useState(searchTerm);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchCharacters(lastSearchTerm);
  }, [lastSearchTerm]);

  const handleSearchSubmit = () => {
    const trimmed = searchTerm.trim();

    if (trimmed === lastSearchTerm) return;

    setSearchTerm(trimmed);
    setLastSearchTerm(trimmed);
  };

  const fetchCharacters = async (term: string) => {
    setLoading(true);
    setError(null);

    try {
      const characters = await getCharacters(term);

      setCharacters(characters);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

      setCharacters([]);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-page">
      <SearchSection value={searchTerm} onChange={setSearchTerm} onSubmit={handleSearchSubmit} />

      <ResultsSection characters={characters} loading={loading} error={error} />
    </div>
  );
};
