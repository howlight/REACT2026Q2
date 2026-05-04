const BASE_URL = 'https://rickandmortyapi.com/api';
const CHARACTERS_ENDPOINT = `${BASE_URL}/character`;

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

const isApiResponse = (data: unknown): data is { results: unknown } =>
  data !== null && typeof data === 'object' && 'results' in data;

const isCharacterArray = (data: unknown): data is Character[] =>
  Array.isArray(data) && data.length > 0 && 'id' in data[0] && 'name' in data[0];

export const getCharacters = async (searchTerm: string): Promise<Character[]> => {
  const url = searchTerm ? `${CHARACTERS_ENDPOINT}/?name=${searchTerm}` : `${CHARACTERS_ENDPOINT}`;

  const response = await fetch(url);

  if (response.status === 404) return [];
  if (!response.ok) throw new Error('Failed to fetch characters');

  const data: unknown = await response.json();

  if (isApiResponse(data) && isCharacterArray(data.results)) {
    return data.results;
  }

  throw new Error('Incorrect data structure');
};
