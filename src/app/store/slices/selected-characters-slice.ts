import type { StateCreator } from 'zustand';

import type { Character } from '~/api/rick-morty.types';

export type SelectedCharactersSlice = {
  selectedCharacters: Character[];
  toggleSelected: (character: Character) => void;
  unselectAll: VoidFunction;
};

export const createSelectedCharactersSlice: StateCreator<SelectedCharactersSlice> = (set) => ({
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

  unselectAll: () => set({ selectedCharacters: [] }),
});
