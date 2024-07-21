import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('renders the Not Found message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(screen.getByText('Not Found 404')).toBeInTheDocument();
  });

  it('renders the Home link', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
