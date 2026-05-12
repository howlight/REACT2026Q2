export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export type ApiResponse = {
  results: Character[];
};

export const isApiResponse = (data: unknown): data is { results: unknown } =>
  data !== null && typeof data === 'object' && 'results' in data;

export const isCharacterArray = (data: unknown): data is Character[] => {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true;

  const firstItem = data[0] as unknown;
  return (
    firstItem !== null && typeof firstItem === 'object' && 'id' in firstItem && 'name' in firstItem
  );
};
