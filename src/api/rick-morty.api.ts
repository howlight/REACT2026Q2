import { API_URLS, ERROR_MESSAGES } from './rick-morty.constants';
import { type Character, isApiResponse, isCharacterArray } from './rick-morty.types';

export const getCharacters = async (searchTerm: string): Promise<Character[]> => {
  const url = searchTerm
    ? `${API_URLS.CHARACTERS_ENDPOINT}${API_URLS.SEARCH_QUERY}${encodeURIComponent(searchTerm)}`
    : `${API_URLS.CHARACTERS_ENDPOINT}`;

  const response = await fetch(url);

  if (response.status === 404) return [];

  if (!response.ok) {
    if (response.status === 429) throw new Error(ERROR_MESSAGES.RATE_LIMIT);
    if (response.status >= 500) throw new Error(ERROR_MESSAGES.SERVER_ERROR);

    throw new Error(ERROR_MESSAGES.httpError(response.status));
  }

  const data: unknown = await response.json();

  if (isApiResponse(data) && isCharacterArray(data.results)) {
    return data.results;
  }

  throw new Error(ERROR_MESSAGES.INVALID_DATA);
};
