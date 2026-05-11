import { type ApiResponse, type Character } from './rick-morty.types';

export const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
} as const;

export const mockResponse: ApiResponse = {
  results: [mockCharacter],
} as const;
