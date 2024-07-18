import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './MainPage';
import { describe, vi, expect } from 'vitest';
import useStoredQuery from '../../hooks/useStoredQuery';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../hooks/useStoredQuery', () => ({
  default: vi.fn(),
}));

describe('MainPage', () => {
  const mockUseStoredQuery = useStoredQuery as jest.Mock;

  beforeEach(() => {
    mockUseStoredQuery.mockReturnValue(['', vi.fn()]);
  });

  it('renders MainPage component correctly', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /throw error/i }),
    ).toBeInTheDocument();
  });

  it('throws error when error button is clicked', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: /throw error/i }));
    }).toThrow('I crashed');
  });
});
