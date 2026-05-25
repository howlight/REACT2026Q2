import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { mockCharacter } from '~/api/rick-morty.mock';
import { useAppStore } from '~/app/store';
import * as downloadUtils from '~/utils/downloadCsv';

import { Flyout } from './Flyout';

describe('Flyout', () => {
  beforeEach(() => {
    useAppStore.setState({
      selectedCharacters: [],
    });
  });

  test('should not render when no items selected', () => {
    render(<Flyout />);

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  test('should render selected items count', () => {
    useAppStore.setState({
      selectedCharacters: [mockCharacter],
    });

    render(<Flyout />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('item selected')).toBeInTheDocument();
  });

  test('should unselect all items', async () => {
    useAppStore.setState({
      selectedCharacters: [mockCharacter],
    });

    render(<Flyout />);

    const button = screen.getByText('Unselect all');
    await userEvent.click(button);

    expect(useAppStore.getState().selectedCharacters).toEqual([]);
  });

  test('should download csv', async () => {
    const downloadSpy = vi.spyOn(downloadUtils, 'downloadCharactersCsv');

    useAppStore.setState({
      selectedCharacters: [mockCharacter],
    });

    render(<Flyout />);

    const button = screen.getByText('Download CSV');
    await userEvent.click(button);

    expect(downloadSpy).toHaveBeenCalledWith([mockCharacter]);
  });
});
