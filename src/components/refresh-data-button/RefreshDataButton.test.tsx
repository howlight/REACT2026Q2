import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { RefreshDataButton } from './RefreshDataButton';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

const renderWithQueryClient = () => {
  const queryClient = createTestQueryClient();
  const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

  render(
    <QueryClientProvider client={queryClient}>
      <RefreshDataButton />
    </QueryClientProvider>,
  );

  return { invalidateQueriesSpy };
};

describe('RefreshDataButton', () => {
  test('should render button', () => {
    renderWithQueryClient();
    expect(screen.getByRole('button', { name: /Refresh all data/i })).toBeInTheDocument();
  });

  test('should call invalidateQueries when clicked', async () => {
    const { invalidateQueriesSpy } = renderWithQueryClient();

    const button = screen.getByRole('button', { name: /Refresh all data/i });
    await userEvent.click(button);

    expect(invalidateQueriesSpy).toHaveBeenCalled();
  });
});
