import { Component } from 'react';

import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResultList from './components/SearchResultList/SearchResultList';
import './App.css';

interface State {
  query: string;
  throwError: boolean;
}

type Props = Record<string, never>;
class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: localStorage.getItem('query') ?? '',
      throwError: false,
    };
  }

  onSearchSubmit = (query: string) => {
    localStorage.setItem('query', query);
    this.setState({ query });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('I crashed');
    }

    return (
      <div className="App">
        <h1>Hello!</h1>
        <div className="search-panel">
          <SearchPanel
            query={this.state.query}
            onSubmit={this.onSearchSubmit}
          />
        </div>
        <div className="search-result-list">
          <SearchResultList query={this.state.query} />
        </div>
        <button
          className="error-button"
          onClick={() => {
            this.setState({ throwError: true });
          }}
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default App;
