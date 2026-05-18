import { useSearchParams } from 'react-router';

const DEFAULT_PAGE = 1;

export const usePaginationParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get('page'));

  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : DEFAULT_PAGE;

  const setPage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const resetPage = () => {
    setSearchParams({ page: String(DEFAULT_PAGE) });
  };

  return {
    currentPage,
    setPage,
    resetPage,
  };
};
