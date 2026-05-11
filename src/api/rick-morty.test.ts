import { describe, expect, test, vi } from 'vitest';

import { getCharacters } from './rick-morty.api';
import { API_URLS, ERROR_MESSAGES, TERMS } from './rick-morty.constants';
import { mockCharacter, mockResponse } from './rick-morty.mock';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('getCharacters', () => {
  test('should return an array of characters on successful request without searchTerm', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCharacters('');

    expect(result).toEqual([mockCharacter]);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(API_URLS.CHARACTERS_ENDPOINT);
  });

  test('should return an array of characters on successful request with searchTerm', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCharacters(TERMS.VALID);

    expect(result).toEqual([mockCharacter]);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URLS.CHARACTERS_ENDPOINT}${API_URLS.SEARCH_QUERY}${TERMS.VALID}`,
    );
  });

  test('should return an empty array on 404 status (no results found)', async () => {
    mockFetch.mockResolvedValue({
      status: 404,
      ok: false,
    });

    const result = await getCharacters(TERMS.NONEXISTENT);

    expect(result).toEqual([]);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('should throw "Too many requests" error on 429 status', async () => {
    mockFetch.mockResolvedValue({
      status: 429,
      ok: false,
    });

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.RATE_LIMIT);
  });

  test('should throw "Server error" for 5xx status codes (e.g., 500)', async () => {
    mockFetch.mockResolvedValue({
      status: 500,
      ok: false,
    });

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.SERVER_ERROR);
  });

  test('should throw error with status code for any other 4xx error (e.g., 403)', async () => {
    mockFetch.mockResolvedValue({
      status: 403,
      ok: false,
    });

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.httpError(403));
  });

  test('should throw error when network request fails', async () => {
    mockFetch.mockRejectedValue(new Error(ERROR_MESSAGES.NETWORK_ERROR));

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.NETWORK_ERROR);
  });

  test('should throw error for invalid data format', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ invalid: 'data' }),
    });

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.INVALID_DATA);
  });

  test('should escape special characters in searchTerm', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ results: [] }),
    });

    await getCharacters(TERMS.SPECIAL_CHARS);

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URLS.CHARACTERS_ENDPOINT}${API_URLS.SEARCH_QUERY}${encodeURIComponent(TERMS.SPECIAL_CHARS)}`,
    );
  });

  test('should handle empty results array from API', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ results: [] }),
    });

    const result = await getCharacters(TERMS.EMPTY_RESULT);

    expect(result).toEqual([]);
  });

  test('should throw error when response.results is missing', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ something: 'else' }),
    });

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.INVALID_DATA);
  });
});
