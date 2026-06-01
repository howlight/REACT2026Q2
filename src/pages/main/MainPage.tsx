import './MainPage.css';

import { useState } from 'react';
import { Outlet, useMatch } from 'react-router';

import { useCharacters } from '~/api/rick-morty.hooks';
import { Pagination } from '~/components/pagination';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { usePaginationParams } from '~/hooks/usePaginationParams';

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('search', '');
  const [lastSearchTerm, setLastSearchTerm] = useState(searchTerm);
  const { currentPage, setPage, resetPage } = usePaginationParams();
  const isDetailsOpened = useMatch('/details/:characterId');

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
    <div className={`main-page-layout ${isDetailsOpened ? 'main-page-layout--split' : ''}`}>
      <div className="main-page">
        <SearchSection value={searchTerm} onChange={setSearchTerm} onSubmit={handleSearchSubmit} />

        {characters.length > 0 && !isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <ResultsSection characters={characters} loading={isLoading} error={error} />
      </div>
      {isDetailsOpened && (
        <div className="details-wrapper">
          <Outlet />
        </div>
      )}
    </div>
  );
};
