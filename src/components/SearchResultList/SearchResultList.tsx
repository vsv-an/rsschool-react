import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import './SearchResultList.css';

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
  const [prevUrl, setPrevUrl] = useState();
  const [nextUrl, setNextUrl] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const currentPageIncrement = () => {
    setCurrentPage(currentPage + 1);
  };

  const currentPageDecrement = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchPokemonCards(query, url);
  }, [query, url]);

  const fetchPokemonCards = async (query: string, url: string) => {
    try {
      const response = await axios.get<ApiResponse>(url);
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
      {loading && <Loader />}
      <div className="pagination">
        {prevUrl && (
          <button
            onClick={() => {
              setPokemonData([]);
              setUrl(prevUrl);
              {
                currentPageDecrement();
              }
            }}
          >
            Prev
          </button>
        )}
        <span>{currentPage}</span>
        {nextUrl && (
          <button
            onClick={() => {
              setPokemonData([]);
              setUrl(nextUrl);
              {
                currentPageIncrement();
              }
            }}
          >
            Next
          </button>
        )}
      </div>

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
