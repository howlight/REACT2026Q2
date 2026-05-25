import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import { mockCharacter } from '~/api/rick-morty.mock';
import { useAppStore } from '~/app/store';

import { CharacterCard } from './CharacterCard';

const renderCharacterCard = (character = mockCharacter) => {
  render(
    <MemoryRouter>
      <CharacterCard {...character} />
    </MemoryRouter>,
  );
};

describe('CharacterCard', () => {
  beforeEach(() => {
    useAppStore.setState({ selectedCharacters: [] });
  });

  test('should render the character name', () => {
    renderCharacterCard();

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });

  test('should render the character status', () => {
    renderCharacterCard();

    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
  });

  test('should render the character species', () => {
    renderCharacterCard();

    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
  });

  test('should render the image with the correct attributes', () => {
    renderCharacterCard();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(image).toHaveAttribute('alt', mockCharacter.name);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  test.each([
    { status: 'Alive', expectedClass: 'status-alive' },
    { status: 'Dead', expectedClass: 'status-dead' },
    { status: 'unknown', expectedClass: 'status-unknown' },
  ])('should apply $expectedClass class for $status status', ({ status, expectedClass }) => {
    const character = { ...mockCharacter, status };
    renderCharacterCard(character);

    const statusBadge = screen.getByText(status);
    expect(statusBadge).toHaveClass(expectedClass);
  });

  test('should toggle selection on checkbox click', async () => {
    renderCharacterCard();

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(useAppStore.getState().selectedCharacters).toHaveLength(1);

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(useAppStore.getState().selectedCharacters).toHaveLength(0);
  });
});
