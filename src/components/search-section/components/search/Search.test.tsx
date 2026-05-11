import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Search } from './Search';
import type { SearchProps } from './types';

const renderSearch = (props?: Partial<SearchProps>) => {
  const defaultProps: SearchProps = {
    value: '',
    onChange: vi.fn(),
    onSubmit: vi.fn(),
  };

  const finalProps = { ...defaultProps, ...props };
  render(<Search {...finalProps} />);

  return {
    onChange: finalProps.onChange,
    onSubmit: finalProps.onSubmit,
  };
};

describe('Search', () => {
  test('should render the input field and search button', () => {
    renderSearch();

    expect(screen.getByRole('textbox', { name: /search query/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search items/i })).toBeInTheDocument();
  });

  test('should display the value from the props', () => {
    const value = 'Rick Sanchez';
    renderSearch({ value });

    const input = screen.getByRole('textbox', { name: /search query/i });
    expect(input).toHaveValue(value);
  });

  test('should call onChange on every typed character', async () => {
    const user = userEvent.setup();
    const { onChange } = renderSearch();

    const input = screen.getByRole('textbox', {
      name: /search query/i,
    });

    await user.type(input, 'morty');

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).toHaveBeenLastCalledWith('y');
  });

  test('should call onSubmit when the button is clicked', async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderSearch({ value: 'rick' });

    const button = screen.getByRole('button', { name: /search items/i });
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('should call onSubmit when Enter is pressed', async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderSearch({ value: 'morty' });

    const input = screen.getByRole('textbox', { name: /search query/i });
    await user.type(input, '{enter}');

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
