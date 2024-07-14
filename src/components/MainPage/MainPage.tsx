import { useEffect, useState } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import SearchResultList from '../SearchResultList/SearchResultList';
import useStoredQuery from '../../hooks/useStoredQuery';
import './MainPage.css';

const LS_QUERY_STATE = 'QueryState';

function MainPage() {
  const [needThrowError, setNeedThrowError] = useState(false);
  const [query, setQuery] = useStoredQuery(LS_QUERY_STATE, '');

  const onSearchSubmit = (query: string) => {
    setQuery(query);
  };

  console.log(query);

  useEffect(() => {});

  const throwError = () => {
    throw new Error('I crashed');
  };

  return (
    <div className="MainPage">
      <h1>Hello!</h1>
      <div className="search-panel">
        <SearchPanel initQuery={query} onSubmit={onSearchSubmit} />
      </div>
      <div className="search-result-list">
        <SearchResultList query={query} />
      </div>
      <button className="error-button" onClick={() => setNeedThrowError(true)}>
        Throw Error
      </button>

      {needThrowError && throwError()}
    </div>
  );
}

export default MainPage;
