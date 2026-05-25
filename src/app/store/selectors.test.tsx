import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { mockCharacter } from '~/api/rick-morty.mock';

import { useAppStore } from './index';
import { useIsSelected, useSelectedCharacters, useSelectedCount } from './selectors';

describe('store selectors', () => {
  beforeEach(() => {
    useAppStore.setState({ selectedCharacters: [] });
  });

  test('useSelectedCharacters should update when store changes', () => {
    const { result } = renderHook(() => useSelectedCharacters());

    expect(result.current).toEqual([]);

    act(() => {
      useAppStore.getState().toggleSelected(mockCharacter);
    });

    expect(result.current).toEqual([mockCharacter]);
  });

  test('useSelectedCount should react to selected items changes', () => {
    const { result } = renderHook(() => useSelectedCount());

    expect(result.current).toBe(0);

    act(() => {
      useAppStore.getState().toggleSelected(mockCharacter);
    });

    expect(result.current).toBe(1);

    act(() => {
      useAppStore.getState().toggleSelected(mockCharacter);
    });

    expect(result.current).toBe(0);
  });

  test('useIsSelected should react to selection changes', () => {
    const { result } = renderHook(() => useIsSelected(mockCharacter.id));

    expect(result.current).toBe(false);

    act(() => {
      useAppStore.getState().toggleSelected(mockCharacter);
    });

    expect(result.current).toBe(true);

    act(() => {
      useAppStore.getState().toggleSelected(mockCharacter);
    });

    expect(result.current).toBe(false);
  });
});
