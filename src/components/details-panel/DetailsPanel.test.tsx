import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCharacterById } from '~/api/rick-morty.api';
import { mockCharacter } from '~/api/rick-morty.mock';
import { createTestQueryClient } from '~/test-utils/createTestQueryClient';

import { DetailsPanel } from './DetailsPanel';

vi.mock('~/api/rick-morty.api');

const mockGetCharacterById = vi.mocked(getCharacterById);

const renderDetailsPanel = (initialEntries = ['/details/1'], queryClient?: QueryClient) => {
  const client = queryClient ?? createTestQueryClient();

  return {
    queryClient: client,
    ...render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/details/:characterId" element={<DetailsPanel />} />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    ),
  };
};

describe('DetailsPanel', () => {
  beforeEach(() => {
    mockGetCharacterById.mockResolvedValue(mockCharacter);
  });

  describe('loading state', () => {
    it('should show loading state initially', () => {
      mockGetCharacterById.mockReturnValue(new Promise(vi.fn()));

      renderDetailsPanel();

      expect(screen.getByText('Loading character details...')).toBeInTheDocument();
    });

    it('should hide loading state after successful response', async () => {
      let resolve!: (value: typeof mockCharacter) => void;
      mockGetCharacterById.mockReturnValue(
        new Promise((res) => {
          resolve = res;
        }),
      );

      renderDetailsPanel();

      expect(screen.getByText('Loading character details...')).toBeInTheDocument();

      resolve(mockCharacter);

      await waitFor(() => {
        expect(screen.queryByText('Loading character details...')).not.toBeInTheDocument();
      });
    });

    it('should hide loading state after failed response', async () => {
      let reject!: (reason: Error) => void;
      mockGetCharacterById.mockReturnValue(
        new Promise((_, rej) => {
          reject = rej;
        }),
      );

      renderDetailsPanel();

      expect(screen.getByText('Loading character details...')).toBeInTheDocument();

      reject(new Error('Failed to load'));

      await waitFor(() => {
        expect(screen.queryByText('Loading character details...')).not.toBeInTheDocument();
      });
    });
  });

  describe('success state', () => {
    it('should display character data after loading', async () => {
      renderDetailsPanel();

      await waitFor(() => {
        expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
      });
    });

    it('should render character image with correct src and alt', async () => {
      renderDetailsPanel();

      await waitFor(() => {
        const img = screen.getByRole('img', { name: mockCharacter.name });
        expect(img).toHaveAttribute('src', mockCharacter.image);
      });
    });
  });

  describe('error state', () => {
    it('should display error message on failed request', async () => {
      mockGetCharacterById.mockRejectedValue(new Error('Failed to load'));

      renderDetailsPanel();

      await waitFor(() => {
        expect(screen.getByText('Failed to load')).toBeInTheDocument();
      });
    });

    it('should not display character data when request fails', async () => {
      mockGetCharacterById.mockRejectedValue(new Error('Server error'));

      renderDetailsPanel();

      await waitFor(() => {
        expect(screen.getByText('Server error')).toBeInTheDocument();
      });

      expect(screen.queryByText(mockCharacter.name)).not.toBeInTheDocument();
    });
  });

  describe('caching behavior', () => {
    it('should use cached data without network request when character was already fetched', () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false, staleTime: Infinity, gcTime: Infinity },
        },
      });
      queryClient.setQueryData(['character', 1], mockCharacter);

      renderDetailsPanel(['/details/1'], queryClient);

      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(mockGetCharacterById).not.toHaveBeenCalled();
    });

    it('should make a new network request when characterId changes', async () => {
      const secondCharacter = { ...mockCharacter, id: 2, name: 'Morty Smith' };
      mockGetCharacterById
        .mockResolvedValueOnce(mockCharacter)
        .mockResolvedValueOnce(secondCharacter);

      const { createMemoryRouter, RouterProvider } = await import('react-router');
      const queryClient = createTestQueryClient();

      const router = createMemoryRouter(
        [
          { path: '/details/:characterId', element: <DetailsPanel /> },
          { path: '/', element: <div>Home</div> },
        ],
        { initialEntries: ['/details/1'] },
      );

      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(mockGetCharacterById).toHaveBeenCalledWith(1);
      });

      await router.navigate('/details/2');

      await waitFor(() => {
        expect(mockGetCharacterById).toHaveBeenCalledWith(2);
      });

      expect(mockGetCharacterById).toHaveBeenCalledTimes(2);
    });
  });

  describe('navigation', () => {
    it('should close panel and navigate home when close button is clicked', async () => {
      const user = userEvent.setup();

      renderDetailsPanel();

      await waitFor(() => {
        expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText('Close details');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
      });
    });

    it('should navigate to correct page when close button is clicked with page param', async () => {
      const user = userEvent.setup();

      renderDetailsPanel(['/details/1?page=3']);

      await waitFor(() => {
        expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText('Close details');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
      });
    });

    it('should return null if no characterId in route', () => {
      renderDetailsPanel(['/details/']);

      expect(screen.queryByText('Loading character details...')).not.toBeInTheDocument();
    });
  });
});
