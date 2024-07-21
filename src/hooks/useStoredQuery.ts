import { useEffect, useState } from 'react';

function useStoredQuery(key: string, initialValue: string = '') {
  const [storedQuery, setStoredQuery] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedQuery.trim()));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedQuery]);

  return [storedQuery, setStoredQuery];
}

export default useStoredQuery;
