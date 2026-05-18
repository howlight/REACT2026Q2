import './MainPage.css';

import { useEffect, useState } from 'react';

import { getCharacters } from '~/api/rick-morty.api';
import type { Character } from '~/api/rick-morty.types';
import { Pagination } from '~/components/pagination';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { usePaginationParams } from '~/hooks/usePaginationParams';

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');
  const [lastSearchTerm, setLastSearchTerm] = useState(searchTerm);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentPage, setPage, resetPage } = usePaginationParams();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    void fetchCharacters(lastSearchTerm, currentPage);
  }, [lastSearchTerm, currentPage]);

  const handleSearchSubmit = () => {
    const trimmed = searchTerm.trim();

    if (trimmed === lastSearchTerm) return;

    setSearchTerm(trimmed);
    setLastSearchTerm(trimmed);
    resetPage();
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setPage(page);
  };

  const fetchCharacters = async (term: string, page: number) => {
    setLoading(true);
    setError(null);

    try {
      const { characters, totalPages } = await getCharacters(term, page);

      setCharacters(characters);
      setTotalPages(totalPages);
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

      {characters.length > 0 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ResultsSection characters={characters} loading={loading} error={error} />
    </div>
  );
};
