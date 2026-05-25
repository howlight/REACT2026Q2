import type { Character } from '~/api/rick-morty.types';

export const downloadCharactersCsv = (characters: Character[]) => {
  const headers = ['id', 'name', 'status', 'species'];

  const rows = characters.map((character) => [
    character.id,
    character.name,
    character.status,
    character.species,
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${characters.length}_characters.csv`;
  document.body.append(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
