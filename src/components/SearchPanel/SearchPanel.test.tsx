import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import SearchPanel from './SearchPanel';
import { MemoryRouter } from 'react-router-dom';

describe('SearchPanel', () => {
  it('renders the search input with the initial query', () => {
    // render(<SearchPanel initQuery="Pikachu" onSubmit={vi.fn()} />);
    render(
      <MemoryRouter>
        <SearchPanel initQuery="Pikachu" onSubmit={vi.fn()} />
      </MemoryRouter>,
    );
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Pikachu');
  });
});
