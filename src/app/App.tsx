import './App.css';

import { useEffect, useState } from 'react';

import { getCharacters } from '~/api/rick-morty.api';
import type { Character } from '~/api/rick-morty.types';
import { ErrorTestButton } from '~/components/error-test-button';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('search') ?? '');
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

    localStorage.setItem('search', trimmed);

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
    <main className="main container">
      <SearchSection value={searchTerm} onChange={setSearchTerm} onSubmit={handleSearchSubmit} />

      <ResultsSection characters={characters} loading={loading} error={error} />

      <ErrorTestButton />
    </main>
  );
};
