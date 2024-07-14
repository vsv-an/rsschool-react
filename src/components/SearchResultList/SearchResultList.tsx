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
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPokemonCards(query);
  }, [query]);

  const fetchPokemonCards = async (query: string, page: number = 1) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    try {
      const response = await axios.get<ApiResponse>(apiUrl);
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
      );

      setPokemon((prev) => [...prev, ...filteredPokemon]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="result-container">
      {loading && <Loader />}
      <h3>Result:</h3>
      <div className="search-result-list">
        {pokemon.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultList;
