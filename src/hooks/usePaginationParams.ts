'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_PAGE = 1;

export const usePaginationParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get('page'));

  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : DEFAULT_PAGE;

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetPage = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(DEFAULT_PAGE));

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    currentPage,
    setPage,
    resetPage,
  };
};
