import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import './SearchResultList.css';
import { useSearchParams } from 'react-router-dom';

interface ApiResponse {
  results: ApiPokemon[];
  next: string;
  previous: string;
}

interface ApiPokemon {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
}

interface Props {
  query: string;
}

const SearchResultList: React.FC<Props> = ({ query }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') as string) || 1;
  const [prevUrl, setPrevUrl] = useState<string>('');
  const [nextUrl, setNextUrl] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const changePage = useCallback(
    (page: number) => {
      setSearchParams(`page=${page}`);
    },
    [setSearchParams],
  );

  console.log(searchParams.toString());

  const fetchPokemonCards = useCallback(
    async (query: string, url: string, page: number) => {
      try {
        setLoading(true);
        const {
          data: { results, next, previous },
        } = await axios.get<ApiResponse>(
          `${url}?limit=20&offset=${(page - 1) * 20}`,
        );

        setNextUrl(next);
        setPrevUrl(previous);

        const filteredResults = results.filter((item) =>
          item.name.includes(query),
        );
        const fetchedPokemonData = await Promise.all(
          filteredResults.map(async (item) => {
            const { data } = await axios.get<Pokemon>(item.url);
            return data;
          }),
        );

        setPokemonData(fetchedPokemonData.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPokemonCards(query, url, page);
  }, [query, url, page, fetchPokemonCards]);

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setSearchParams(`page=${page}&deatails=${pokemon.name}`);
  };

  const handleClosePokemonInfo = () => {
    setSelectedPokemon(null);
    setSearchParams(`page=${page}`);
  };

  return (
    <div className="result-container">
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => {
            if (prevUrl) {
              setUrl(prevUrl);
              changePage(page - 1);
            }
          }}
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          onClick={() => {
            if (nextUrl) {
              setUrl(nextUrl);
              changePage(page + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>Result:</h3>
          <div className="search-result-list">
            {pokemonData.map((item) => (
              <Card
                key={item.id}
                data={item}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>
        </>
      )}
      {selectedPokemon && (
        <PokemonInfo
          pokemon={selectedPokemon}
          onClose={handleClosePokemonInfo}
        />
      )}
    </div>
  );
};

export default SearchResultList;
