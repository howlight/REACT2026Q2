import { useQuery } from '@tanstack/react-query';

import { getCharacterById, getCharacters } from './rick-morty.api';

export const useCharacters = (searchTerm: string, page: number) =>
  useQuery({
    queryKey: ['characters', searchTerm, page],
    queryFn: () => getCharacters(searchTerm, page),
  });

export const useCharacter = (id: number) =>
  useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
  });
