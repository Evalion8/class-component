import { useState } from 'react';

export const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="p-4 bg-gray-100 flex gap-2">
      <input
        className="border p-2 flex-grow"
        type="text"
        value={search}
        placeholder="Search Pokemon..."
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};
