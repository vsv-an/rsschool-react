import { Component } from 'react';

import SearchPanel from './components/SearchPanel/SearchPanel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello!</h1>
        <div className="search-panel">
          <SearchPanel />
        </div>
      </div>
    );
  }
}

export default App;
