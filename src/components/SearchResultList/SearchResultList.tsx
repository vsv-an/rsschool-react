import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import './SearchResultList.css';
import { useSearchParams } from 'react-router-dom';

interface ApiResponse {
  results: ApiPokemon[];
  next: string | null;
}

interface ApiPokemon {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  image: string;
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
  const [prevUrl, setPrevUrl] = useState(`${url}?limit=20&offset=${page}`);
  const [nextUrl, setNextUrl] = useState(`${url}?limit=20&offset=${page}`);

  const changePage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    fetchPokemonCards(query, url, page);
  }, [query, url, page]);

  const fetchPokemonCards = async (
    query: string,
    url: string,
    page: number,
  ) => {
    try {
      const response = await axios.get<ApiResponse>(
        `${url}?limit=20&offset=${page}`,
      );
      const filteredPokemon = await Promise.all(
        response.data.results
          .filter((item: ApiPokemon) => item.name.includes(query))
          .map(async (item: ApiPokemon) => {
            const pokemonInfo = await axios.get(item.url);
            return {
              name: item.name,
              image: pokemonInfo.data.sprites.front_default,
            };
          }),
        setNextUrl(response.data.next),
        setPrevUrl(response.data.previous),
      );

      setPokemonData((prev) => [...prev, ...filteredPokemon]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="result-container">
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => {
            setPokemonData([]);
            setUrl(prevUrl);
            {
              changePage(page - 1);
            }
          }}
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          onClick={() => {
            setPokemonData([]);
            setUrl(nextUrl);
            {
              changePage(page + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      {loading && <Loader />}
      <h3>Result:</h3>
      <div className="search-result-list">
        {pokemonData.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultList;
