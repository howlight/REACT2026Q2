import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { ErrorTestButton } from './ErrorTestButton';

describe('ErrorTestButton', () => {
  test('should render button with correct text', () => {
    render(<ErrorTestButton />);

    expect(screen.getByRole('button', { name: /test error boundary/i })).toBeInTheDocument();
  });

  test('should throw error when clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorTestButton />);

    const button = screen.getByRole('button', {
      name: /test error boundary/i,
    });

    await expect(user.click(button)).rejects.toThrow('Test error triggered by user!');
  });
});
