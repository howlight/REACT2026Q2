import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '~/api/rick-morty.mock';
import type { Character } from '~/api/rick-morty.types';

import { type Props, ResultsSection } from './ResultsSection';

vi.mock('./components/character-card/CharacterCard', () => ({
  CharacterCard: ({ name, status }: Character) => (
    <article>
      <h3>{name}</h3>
      <div>{status}</div>
    </article>
  ),
}));

const renderResultsSection = (props?: Partial<Props>) => {
  const defaultProps: Props = {
    characters: [],
    loading: false,
    error: null,
  };

  const finalProps = { ...defaultProps, ...props };
  render(<ResultsSection {...finalProps} />);
};

describe('ResultsSection', () => {
  describe('when loading', () => {
    test('should render loading spinner', () => {
      const message = 'Loading characters...';
      renderResultsSection({ loading: true });

      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('when error', () => {
    test('should render error message', () => {
      const error = new Error('Failed to load characters');
      renderResultsSection({ error });

      expect(screen.getByText('Failed to load characters')).toBeInTheDocument();
      expect(screen.getByText('❗')).toBeInTheDocument();
    });
  });

  describe('when characters array is empty', () => {
    test('should render "no results" message', () => {
      renderResultsSection({ characters: [] });
      const message = 'No results found for your search.';

      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  describe('when characters exist', () => {
    test('should render character cards', () => {
      renderResultsSection({ characters: mockCharacters });

      expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
    });
  });
});
