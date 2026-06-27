import { useAppStore } from './index';

export const useSelectedCharacters = () => useAppStore((state) => state.selectedCharacters);

export const useSelectedCount = () => useAppStore((state) => state.selectedCharacters.length);

export const useIsSelected = (id: number) =>
  useAppStore((state) => state.selectedCharacters.some((item) => item.id === id));
