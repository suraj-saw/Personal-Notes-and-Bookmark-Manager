import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ onSearch, showTagFilter = true, placeholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm, tags);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setTags('');
    if (onSearch) {
      onSearch('', '');
    }
  };

  return (
    <form onSubmit={handleSearch} className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="input-field pl-10"
          />
        </div>
        {showTagFilter && (
          <div className="w-full md:w-64">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Filter by tags (comma separated)"
              className="input-field"
            />
          </div>
        )}
        <button type="submit" className="btn-primary w-full md:w-auto">
          Search
        </button>
        {(searchTerm || tags) && (
          <button
            type="button"
            onClick={handleClear}
            className="btn-secondary w-full md:w-auto"
          >
            <FiX />
          </button>
        )}
      </div>
    </form>
  );
}
