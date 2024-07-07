import { Component } from 'react';
import './SearchPanel.css';

interface Props {
  query: string;
  onSubmit: (query: string) => void;
}

interface SearchPanelState {
  query: string;
}

type State = Readonly<SearchPanelState>;
class SearchPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: this.props.query };
  }

  onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  onSubmit = () => {
    // event.preventDefault();
    this.props.onSubmit(this.state.query.trim());
  };

  render() {
    return (
      <div className="search-panel">
        <form onSubmit={this.onSubmit}>
          <input
            className="input"
            type="search"
            placeholder="Search..."
            autoComplete="off"
            value={this.state.query}
            onChange={this.onQueryChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchPanel;
