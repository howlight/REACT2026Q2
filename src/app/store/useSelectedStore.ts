import { create } from 'zustand';

import type { Character } from '~/api/rick-morty.types';

type SelectedStore = {
  selectedCharacters: Character[];
  toggleSelected: (character: Character) => void;
  unselectAll: VoidFunction;
  isSelected: (id: number) => boolean;
  getSelectedCount: () => number;
};

export const useSelectedStore = create<SelectedStore>((set, get) => ({
  selectedCharacters: [],

  toggleSelected: (character) =>
    set((state) => {
      const isSelected = state.selectedCharacters.some((item) => item.id === character.id);

      return {
        selectedCharacters: isSelected
          ? state.selectedCharacters.filter((item) => item.id !== character.id)
          : [...state.selectedCharacters, character],
      };
    }),

  unselectAll: () =>
    set(() => ({
      selectedCharacters: [],
    })),

  isSelected: (id) => {
    const state = get();
    return state.selectedCharacters.some((item) => item.id === id);
  },

  getSelectedCount: () => {
    const state = get();
    return state.selectedCharacters.length;
  },
}));
