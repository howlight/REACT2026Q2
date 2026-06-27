'use client';

import type { ReactNode } from 'react';

import { ErrorBoundary } from '~/providers/error-boundary';
import { QueryProvider } from '~/providers/query-provider';
import { ThemeProvider } from '~/providers/theme';

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
