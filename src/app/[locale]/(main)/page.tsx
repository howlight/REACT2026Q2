'use client';

import { useState } from 'react';

import { useCharacters } from '~/api/rick-morty.hooks';
import { Pagination } from '~/components/pagination';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { usePaginationParams } from '~/hooks/usePaginationParams';

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('search', '');
  const [lastSearchTerm, setLastSearchTerm] = useState(searchTerm);
  const { currentPage, setPage, resetPage } = usePaginationParams();

  const { data, isLoading, error } = useCharacters(lastSearchTerm, currentPage);
  const characters = data?.characters ?? [];
  const totalPages = data?.totalPages ?? 0;

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

  return (
    <>
      <SearchSection value={searchTerm} onChange={setSearchTerm} onSubmit={handleSearchSubmit} />

      {characters.length > 0 && !isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ResultsSection characters={characters} loading={isLoading} error={error} />
    </>
  );
}
