import { Component } from 'react';
import './SearchPanel.css';

class SearchPanel extends Component {
  render() {
    return (
      <div className="search-panel">
        <form>
          <input className="input" type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchPanel;
