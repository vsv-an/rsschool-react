import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import SearchResultList from './SearchResultList';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPokemonData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `pokemon${index + 1}`,
  sprites: { front_default: `url_to_image${index + 1}` },
}));

const mockApiResponse = {
  data: {
    results: mockPokemonData.map((pokemon) => ({
      name: pokemon.name,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
    })),
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: null,
  },
};

const mock = new axiosMock(axios);

const renderComponent = (query: string) => {
  render(
    <MemoryRouter>
      <SearchResultList query={query} />
    </MemoryRouter>,
  );
};

describe('SearchResultList', () => {
  it('renders 20 cards on the page', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockApiResponse);
    mockPokemonData.forEach((pokemon) => {
      mockedAxios.get.mockResolvedValueOnce({ data: pokemon });
    });

    render(
      <MemoryRouter>
        <SearchResultList query="" />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const cards = screen.getAllByRole('img');
      expect(cards).toHaveLength(20);
    });
  });

  it('Should rendered two buttons', () => {
    render(
      <MemoryRouter>
        <SearchResultList query="" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /Prev/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Next/i })).toBeDefined();
  });

  it('renders loader while fetching data', async () => {
    mock
      .onGet('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .reply(200, {
        results: [],
        next: '',
        previous: '',
      });

    renderComponent('');

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles loading state correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchResultList query="pokemon" />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
