import { Component } from 'react';

import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResultList from './components/SearchResultList/SearchResultList';
import './App.css';

interface State {
  query: string;
}

class App extends Component<State> {
  state: State = {
    query: localStorage.getItem('query') || '',
  };
  render() {
    return (
      <div className="App">
        <h1>Hello!</h1>
        <div className="search-panel">
          <SearchPanel />
        </div>
        <div className="search-result-list">
          <SearchResultList query={this.state.query} />
        </div>
      </div>
    );
  }
}

export default App;
