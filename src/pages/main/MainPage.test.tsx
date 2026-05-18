import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCharacters } from '~/api/rick-morty.api';
import { mockCharactersResponse } from '~/api/rick-morty.mock';

import { MainPage } from './MainPage';

vi.mock('~/api/rick-morty.api');

const mockGetCharacters = vi.mocked(getCharacters);

const renderMainPage = () => {
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>,
  );
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

    it('should not call getCharacters again if search term unchanged', async () => {
      const user = userEvent.setup();
      localStorage.setItem('search', 'Rick');
      mockGetCharacters.mockResolvedValue(mockCharactersResponse);

      renderMainPage();

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

      renderMainPage();

      await waitFor(() => {
        expect(screen.getByText('Server error')).toBeInTheDocument();
      });
    });
  });
});
