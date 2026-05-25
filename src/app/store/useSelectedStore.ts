import { create } from 'zustand';

type SelectedStore = {
  selectedIds: number[];
  toggleSelected: (id: number) => void;
  unselectAll: VoidFunction;
  isSelected: (id: number) => boolean;
  getSelectedCount: () => number;
};

export const useSelectedStore = create<SelectedStore>((set, get) => ({
  selectedIds: [],

  toggleSelected: (id) =>
    set((state) => {
      const isSelected = state.selectedIds.includes(id);
      return {
        selectedIds: isSelected
          ? state.selectedIds.filter((i) => i !== id)
          : [...state.selectedIds, id],
      };
    }),

  unselectAll: () =>
    set(() => ({
      selectedIds: [],
    })),

  isSelected: (id) => {
    const state = get();
    return state.selectedIds.includes(id);
  },

  getSelectedCount: () => {
    const state = get();
    return state.selectedIds.length;
  },
}));
