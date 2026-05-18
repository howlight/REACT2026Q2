import { describe, expect, test, vi } from 'vitest';

import { getCharacters } from './rick-morty.api';
import { API_URLS, ERROR_MESSAGES, TERMS } from './rick-morty.constants';
import {
  mockCharactersResponse,
  mockEmptyCharactersResponse,
  mockEmptyResponse,
  mockResponse,
} from './rick-morty.mock';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('getCharacters', () => {
  test('should return characters response on successful request without searchTerm', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCharacters('');

    expect(result).toEqual(mockCharactersResponse);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URLS.CHARACTERS_ENDPOINT}?${API_URLS.PARAM_KEYS.PAGE}=1`,
    );
  });

  test('should return characters response on successful request with searchTerm', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCharacters(TERMS.VALID);

    expect(result).toEqual(mockCharactersResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URLS.CHARACTERS_ENDPOINT}?${API_URLS.PARAM_KEYS.NAME}=${TERMS.VALID}&${API_URLS.PARAM_KEYS.PAGE}=1`,
    );
  });

  test('should return empty response on 404 status', async () => {
    mockFetch.mockResolvedValue({
      status: 404,
      ok: false,
    });

    const result = await getCharacters(TERMS.NONEXISTENT);

    expect(result).toEqual(mockEmptyCharactersResponse);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('should throw "Too many requests" error on 429 status', async () => {
    mockFetch.mockResolvedValue({
      status: 429,
      ok: false,
    });

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.RATE_LIMIT);
  });

  test('should throw "Server error" for 5xx status codes', async () => {
    mockFetch.mockResolvedValue({
      status: 500,
      ok: false,
    });

    await expect(getCharacters(TERMS.VALID)).rejects.toThrow(ERROR_MESSAGES.SERVER_ERROR);
  });

  test('should throw error with status code for other 4xx errors', async () => {
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
      json: () => Promise.resolve(mockEmptyResponse),
    });

    await getCharacters(TERMS.SPECIAL_CHARS);

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URLS.CHARACTERS_ENDPOINT}?${API_URLS.PARAM_KEYS.NAME}=${encodeURIComponent(TERMS.SPECIAL_CHARS)}&page=1`,
    );
  });

  test('should handle empty results array from API', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockEmptyResponse),
    });

    const result = await getCharacters(TERMS.EMPTY_RESULT);

    expect(result).toEqual(mockEmptyCharactersResponse);
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
