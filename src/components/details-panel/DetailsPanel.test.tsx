import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

import { getCharacterById } from '~/api/rick-morty.api';
import { mockCharacter } from '~/api/rick-morty.mock';

import { DetailsPanel } from './DetailsPanel';

vi.mock('~/api/rick-morty.api');

const mockGetCharacterById = vi.mocked(getCharacterById);

const renderWithRouter = (initialEntries = ['/details/1']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/details/:characterId" element={<DetailsPanel />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe('DetailsPanel', () => {
  test('should show loading state initially', () => {
    renderWithRouter();

    expect(screen.getByText('Loading character details...')).toBeInTheDocument();
  });

  test('should display character data after loading', async () => {
    mockGetCharacterById.mockResolvedValue(mockCharacter);
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
      expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    });
  });

  test('should display error message on failure', async () => {
    mockGetCharacterById.mockRejectedValue(new Error('Failed to load'));
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });
  });

  test('should close panel when close button is clicked', async () => {
    mockGetCharacterById.mockResolvedValue(mockCharacter);
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Close details');
    closeButton.click();
  });

  test('should return null if no characterId', () => {
    renderWithRouter(['/details/']);
    expect(screen.queryByText('Loading character details...')).not.toBeInTheDocument();
  });
});
