import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCharacters } from '~/api/rick-morty.api';
import { mockCharacters } from '~/api/rick-morty.mock';

import { MainPage } from './MainPage';

vi.mock('~/api/rick-morty.api');
vi.mock('~/components/error-test-button', () => ({
  ErrorTestButton: () => <button>Test Error Boundary</button>,
}));

const mockGetCharacters = vi.mocked(getCharacters);

describe('MainPage', () => {
  beforeEach(() => {
    mockGetCharacters.mockResolvedValue(mockCharacters);
  });

  describe('initialization', () => {
    it('should render main sections', async () => {
      render(<MainPage />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));
    });

    it('should call getCharacters with empty string on mount when localStorage is empty', async () => {
      render(<MainPage />);

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledWith('');
      });
    });

    it('should use saved search term from localStorage on mount', async () => {
      localStorage.setItem('search', 'Rick');

      render(<MainPage />);

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledWith('Rick');
      });

      expect(screen.getByRole('textbox')).toHaveValue('Rick');
    });
  });

  describe('search', () => {
    it('should perform search on form submit', async () => {
      const user = userEvent.setup();
      render(<MainPage />);

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Morty');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockGetCharacters).toHaveBeenCalledWith('Morty');
      });
    });

    it('should save trimmed search term to localStorage on submit', async () => {
      const user = userEvent.setup();
      render(<MainPage />);

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

    it('should not call getCharacters again if search term unchanged', async () => {
      const user = userEvent.setup();
      localStorage.setItem('search', 'Rick');

      render(<MainPage />);

      await waitFor(() => expect(mockGetCharacters).toHaveBeenCalledTimes(1));

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Rick');

      const submitButton = screen.getByRole('button', { name: /search items/i });
      await user.click(submitButton);

      expect(mockGetCharacters).toHaveBeenCalledTimes(1);
    });
  });

  describe('loading and results', () => {
    it('should display error message on failed request', async () => {
      mockGetCharacters.mockRejectedValueOnce(new Error('Server error'));

      render(<MainPage />);

      await waitFor(() => {
        expect(screen.getByText('Server error')).toBeInTheDocument();
      });
    });
  });
});
