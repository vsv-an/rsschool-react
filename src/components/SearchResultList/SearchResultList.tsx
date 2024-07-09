import { Component } from 'react';
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

interface State {
  pokemon: Pokemon[];
  loading: boolean;
  error?: boolean;
  nextPageUrl: string | null;
  currentPage: number;
}

class SearchResultList extends Component<Props, State> {
  state: State = {
    pokemon: [],
    loading: true,
    error: false,
    nextPageUrl: null,
    currentPage: 1,
  };

  componentDidMount() {
    this.fetchPokemonCards(this.props.query);
  }

  componentDidUpdate(previousProps: Props) {
    if (previousProps.query === this.props.query) return;
    this.fetchPokemonCards(this.props.query);
  }

  fetchPokemonCards(query: string, page: number = 1) {
    const limit: number = 20;
    const offset: number = (page - 1) * limit;
    const apiUrl: string = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    axios
      .get<ApiResponse>(apiUrl)
      .then(async (response) => {
        const persons = response.data.results
          .filter((item: ApiPokemon) => item.name.includes(query))
          .map(async (item: ApiPokemon) => {
            const pokemonInfo = await axios.get(item.url);
            return {
              name: item.name,
              image: pokemonInfo.data.sprites.front_default,
            };
          });

        const fetchedPokemonCards = await Promise.all(persons);
        this.setState((prevState) => ({
          pokemon: [...prevState.pokemon, ...fetchedPokemonCards],
          loading: false,
          nextPageUrl: response.data.next,
          currentPage: page,
        }));
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
        this.setState({ loading: false, error: true });
      });
  }
  render() {
    return (
      <div className="result-container">
        <div>{this.state.loading && <Loader />}</div>
        <h3>Result:</h3>
        <div className="search-result-list">
          {this.state.pokemon.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchResultList;
