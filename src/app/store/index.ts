import { create } from 'zustand';

import {
  createSelectedCharactersSlice,
  type SelectedCharactersSlice,
} from './slices/selected-characters-slice';

export type AppStore = SelectedCharactersSlice;

export const useAppStore = create<AppStore>((...a) => ({
  ...createSelectedCharactersSlice(...a),
}));
