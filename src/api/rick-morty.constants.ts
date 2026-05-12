export const API_URLS = {
  CHARACTERS_ENDPOINT: 'https://rickandmortyapi.com/api/character',
  SEARCH_QUERY: '?name=',
} as const;

export const TERMS = {
  VALID: 'rick',
  NONEXISTENT: 'nonexistent',
  EMPTY_RESULT: 'empty',
  SPECIAL_CHARS: 'Rick & Morty',
} as const;

export const ERROR_MESSAGES = {
  RATE_LIMIT: 'Too many requests. Please wait.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_DATA: 'Invalid data format received from server',
  NETWORK_ERROR: 'Network error',
  httpError: (status: number) => `Failed to load characters, status code: ${status}`,
} as const;
