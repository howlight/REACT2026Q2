export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export type CharactersResponse = {
  characters: Character[];
  totalPages: number;
};

export type ApiResponse = {
  info: {
    pages: number;
  };
  results: Character[];
};

export const isCharacter = (data: unknown): data is Character => {
  if (data === null || typeof data !== 'object') {
    return false;
  }

  return (
    'id' in data &&
    typeof data.id === 'number' &&
    'name' in data &&
    typeof data.name === 'string' &&
    'status' in data &&
    typeof data.status === 'string' &&
    'species' in data &&
    typeof data.species === 'string' &&
    'image' in data &&
    typeof data.image === 'string'
  );
};

export const isCharacterArray = (data: unknown): data is Character[] =>
  Array.isArray(data) && data.every(isCharacter);

export const isApiResponse = (data: unknown): data is ApiResponse => {
  if (data === null || typeof data !== 'object') {
    return false;
  }

  if (!('info' in data) || !('results' in data)) {
    return false;
  }

  const { info, results } = data;

  return (
    info !== null &&
    typeof info === 'object' &&
    'pages' in info &&
    typeof info.pages === 'number' &&
    isCharacterArray(results)
  );
};
