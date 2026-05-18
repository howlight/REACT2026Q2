import { API_URLS, ERROR_MESSAGES } from './rick-morty.constants';
import {
  type Character,
  type CharactersResponse,
  isApiResponse,
  isCharacter,
} from './rick-morty.types';

export const getCharacters = async (searchTerm: string, page = 1): Promise<CharactersResponse> => {
  const url = searchTerm
    ? `${API_URLS.CHARACTERS_ENDPOINT}?${API_URLS.PARAM_KEYS.NAME}=${encodeURIComponent(searchTerm)}&${API_URLS.PARAM_KEYS.PAGE}=${page}`
    : `${API_URLS.CHARACTERS_ENDPOINT}?${API_URLS.PARAM_KEYS.PAGE}=${page}`;

  const response = await fetch(url);

  if (response.status === 404) {
    return {
      characters: [],
      totalPages: 0,
    };
  }

  if (!response.ok) {
    if (response.status === 429) throw new Error(ERROR_MESSAGES.RATE_LIMIT);
    if (response.status >= 500) throw new Error(ERROR_MESSAGES.SERVER_ERROR);

    throw new Error(ERROR_MESSAGES.httpError(response.status));
  }

  const data: unknown = await response.json();

  if (isApiResponse(data)) {
    return {
      characters: data.results,
      totalPages: data.info.pages,
    };
  }

  throw new Error(ERROR_MESSAGES.INVALID_DATA);
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const url = `${API_URLS.CHARACTERS_ENDPOINT}/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.httpError(response.status));
  }

  const data: unknown = await response.json();

  if (isCharacter(data)) {
    return data;
  }

  throw new Error(ERROR_MESSAGES.INVALID_DATA);
};
