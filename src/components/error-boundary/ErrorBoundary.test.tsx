import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { ErrorBoundary } from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

const SafeComponent = () => <div>Safe content</div>;

const renderWithError = () =>
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>,
  );

describe('ErrorBoundary', () => {
  test('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  test('should display fallback UI when error occurs', () => {
    renderWithError();

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('💥')).toBeInTheDocument();
  });

  test('should show technical details', () => {
    renderWithError();

    expect(screen.getByText('Technical details')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('should log error to console', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderWithError();

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
