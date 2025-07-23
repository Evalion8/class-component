import React, { useEffect, useState } from 'react';
import { CardList } from './feature/CardList';
import { Spinner } from './feature/Spinner';
import { Search } from './feature/Search';

const limit = 10;

export const Main: React.FC = () => {
  const savedSearchTerm = localStorage.getItem('searchTerm') || '';
  const [data, setData] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const offset = page * limit;
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

      if (searchTerm) {
        url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const result = await res.json();

        if (searchTerm) {
          setData([{ name: result.name, url: result.url }]);
        } else {
          setData(result.results);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
        setData([]);
      }
    };

    fetchData();
  }, [searchTerm, page]);

  const handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    setSearchTerm(term);
    setPage(0);
  };

  return (
    <main>
      <Search defaultValue={searchTerm} onSearch={handleSearch} />
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-600 text-center mt-4">{error}</p>
      ) : (
        <CardList items={data} />
      )}
      {!searchTerm && (
        <div className="p-4 flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 mt-4"
            onClick={() => {
              throw new Error('Test error from button');
            }}
          >
            Throw Error
          </button>
        </div>
      )}
    </main>
  );
};
