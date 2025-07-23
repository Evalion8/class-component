import { useState, useEffect } from 'react';

interface SearchProps {
  defaultValue?: string;
  onSearch: (term: string) => void;
}

export const Search = ({ defaultValue = '', onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4 bg-gray-100 flex gap-2">
      <input
        className="border p-2 flex-grow rounded"
        type="text"
        value={searchTerm}
        placeholder="Search Pokemon..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};
