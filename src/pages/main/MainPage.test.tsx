import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCharacters } from '~/api/rick-morty.api';
import { mockCharactersResponse } from '~/api/rick-morty.mock';
import { createTestQueryClient } from '~/test-utils/createTestQueryClient';

import { MainPage } from './MainPage';

vi.mock('~/api/rick-morty.api');

const mockGetCharacters = vi.mocked(getCharacters);

const renderMainPage = (queryClient?: QueryClient) => {
  const client = queryClient ?? createTestQueryClient();

  return {
    queryClient: client,
    ...render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </QueryClientProvider>,
    ),
  };
};

describe('MainPage', () => {
  beforeEach(() => {
    mockGetCharacters.mockResolvedValue(mockCharactersResponse);
  });

  describe('initialization', () => {
    it('should render main sections', async () => {
      renderMainPage();

      expect(screen.getByRole('textbox')).toBeInTheDocument();

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));
    });

    it('should call getCharacters with empty string on mount when localStorage is empty', async () => {
      renderMainPage();

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledWith('', 1);
      });
    });

    it('should use saved search term from localStorage on mount', async () => {
      localStorage.setItem('search', 'Rick');
      renderMainPage();

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledWith('Rick', 1);
      });

      expect(screen.getByRole('textbox')).toHaveValue('Rick');
    });
  });

  describe('loading state', () => {
    it('should pass loading=true to ResultsSection while request is in flight', async () => {
      mockGetCharacters.mockReturnValue(new Promise(vi.fn()));

      renderMainPage();

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledTimes(1);
      });

      expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });

    it('should resolve loading state and render results after successful response', async () => {
      let resolve!: (value: typeof mockCharactersResponse) => void;
      mockGetCharacters.mockReturnValue(
        new Promise((res) => {
          resolve = res;
        }),
      );

      renderMainPage();

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));

      resolve(mockCharactersResponse);

      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('error state', () => {
    it('should display error message on failed request', async () => {
      mockGetCharacters.mockRejectedValueOnce(new Error('Server error'));

      renderMainPage();

      await waitFor(() => {
        expect(screen.getByText('Server error')).toBeInTheDocument();
      });
    });

    it('should display network error message', async () => {
      mockGetCharacters.mockRejectedValueOnce(new Error('Network Error'));

      renderMainPage();

      await waitFor(() => {
        expect(screen.getByText('Network Error')).toBeInTheDocument();
      });
    });

    it('should clear error and show results after successful search following an error', async () => {
      mockGetCharacters
        .mockRejectedValueOnce(new Error('Temporary error'))
        .mockResolvedValueOnce(mockCharactersResponse);

      const user = userEvent.setup();
      renderMainPage();

      await waitFor(() => {
        expect(screen.getByText('Temporary error')).toBeInTheDocument();
      });

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Morty');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Temporary error')).not.toBeInTheDocument();
      });
    });
  });

  describe('caching behavior', () => {
    it('should not call getCharacters again if search term unchanged', async () => {
      const user = userEvent.setup();
      localStorage.setItem('search', 'Rick');

      renderMainPage();

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Rick');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      expect(mockGetCharacters).toHaveBeenCalledTimes(1);
    });

    it('should use cached data without network request when queryKey was already fetched', async () => {
      const user = userEvent.setup();

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false, staleTime: Infinity, gcTime: Infinity },
        },
      });
      queryClient.setQueryData(['characters', 'Rick', 1], mockCharactersResponse);

      renderMainPage(queryClient);

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledWith('', 1));

      const callsAfterMount = mockGetCharacters.mock.calls.length;

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Rick');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockGetCharacters.mock.calls.length).toBe(callsAfterMount);
      });
    });

    it('should make a new network request when search term changes', async () => {
      const user = userEvent.setup();
      renderMainPage();

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledWith('', 1));

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Morty');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledWith('Morty', 1);
      });

      expect(mockGetCharacters).toHaveBeenCalledTimes(2);
    });
  });

  describe('search', () => {
    it('should perform search on form submit', async () => {
      const user = userEvent.setup();
      renderMainPage();

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Morty');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledWith('Morty', 1);
      });
    });

    it('should save trimmed search term to localStorage on submit', async () => {
      const user = userEvent.setup();
      renderMainPage();

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '  Morty  ');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      await waitFor(() => {
        const setItem = vi.mocked(localStorage['setItem']);
        expect(setItem).toHaveBeenCalledWith('search', 'Morty');
      });
    });
  });
});
