import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';

import { ThemeProvider } from '~/app/providers/theme/ThemeProvider';

import { ThemeToggle } from './ThemeToggle';

const renderWithTheme = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  test('should render toggle button', () => {
    renderWithTheme();

    expect(screen.getByRole('button', { name: 'Switch theme' })).toBeInTheDocument();
  });

  test('should show dark mode button initially', () => {
    renderWithTheme();

    expect(screen.getByRole('button', { name: 'Switch theme' })).toHaveTextContent('🌙 Dark');
  });

  test('should toggle theme when clicked', async () => {
    renderWithTheme();

    const button = screen.getByRole('button', {
      name: 'Switch theme',
    });

    await userEvent.click(button);

    expect(button).toHaveTextContent('☀️ Light');
  });

  test('should apply light theme initially', () => {
    renderWithTheme();

    expect(document.documentElement.dataset.theme).toBe('light');
  });

  test('should apply dark theme after toggle', async () => {
    renderWithTheme();

    const button = screen.getByRole('button', {
      name: 'Switch theme',
    });

    await userEvent.click(button);

    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
