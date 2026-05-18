import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  test('should render about page content', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });
});
