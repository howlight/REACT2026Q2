const BASE_URL = 'https://rickandmortyapi.com/api';
const CHARACTERS_ENDPOINT = `${BASE_URL}/character`;
const SEARCH_QUERY = '?name=';

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
  const url = searchTerm
    ? `${CHARACTERS_ENDPOINT}${SEARCH_QUERY}${encodeURIComponent(searchTerm)}`
    : `${CHARACTERS_ENDPOINT}`;

  const response = await fetch(url);

  if (response.status === 404) return [];

  if (!response.ok) {
    if (response.status === 429) throw new Error('Too many requests. Please wait.');
    if (response.status >= 500) throw new Error('Server error. Please try again later.');

    throw new Error(`Failed to load characters, status code: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (isApiResponse(data) && isCharacterArray(data.results)) {
    return data.results;
  }

  throw new Error('Invalid data format received from server');
};
