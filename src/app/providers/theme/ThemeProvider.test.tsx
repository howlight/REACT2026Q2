import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';

import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span>Theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

const renderThemeProvider = () =>
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>,
  );

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  test('should initialize theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    renderThemeProvider();

    expect(screen.getByText('Theme: dark')).toBeInTheDocument();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('should provide light theme by default', () => {
    renderThemeProvider();

    expect(screen.getByText('Theme: light')).toBeInTheDocument();
  });

  test('should toggle theme when button clicked', async () => {
    renderThemeProvider();

    const button = screen.getByRole('button', { name: 'Toggle' });
    await userEvent.click(button);

    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
  });

  test('should apply data-theme attribute to html element', async () => {
    renderThemeProvider();

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    const button = screen.getByRole('button', { name: 'Toggle' });
    await userEvent.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('should save theme to localStorage', async () => {
    renderThemeProvider();

    const button = screen.getByRole('button', { name: 'Toggle' });
    await userEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
