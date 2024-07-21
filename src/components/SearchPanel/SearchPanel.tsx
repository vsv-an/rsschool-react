import './SearchPanel.css';

interface Props {
  readonly initQuery: string;
  readonly onSubmit: (query: string) => void;
}

function SearchPanel({ initQuery, onSubmit }: Props) {
  const onSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const query = (data.get('searchQuery') as string) || '';
    onSubmit(query.trim());
  };

  return (
    <div className="search-panel">
      <form onSubmit={onSubmitClick}>
        <input
          className="searchQuery"
          type="search"
          name="searchQuery"
          placeholder="Search..."
          autoComplete="off"
          defaultValue={initQuery}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchPanel;
