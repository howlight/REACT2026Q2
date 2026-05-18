import type { ApiResponse, Character, CharactersResponse } from './rick-morty.types';

export const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

export const mockCharacters: Character[] = [mockCharacter];

export const mockResponse: ApiResponse = {
  info: {
    pages: 10,
  },
  results: [mockCharacter],
};

export const mockEmptyResponse: ApiResponse = {
  info: {
    pages: 0,
  },
  results: [],
};

export const mockCharactersResponse: CharactersResponse = {
  characters: [mockCharacter],
  totalPages: mockResponse.info.pages,
};

export const mockEmptyCharactersResponse: CharactersResponse = {
  characters: [],
  totalPages: 0,
};
