import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ onSearch, onTagFilter, placeholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    if (onTagFilter) {
      onTagFilter(tags);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setTags('');
    onSearch('');
    if (onTagFilter) {
      onTagFilter('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="space-y-3">
      <div className="flex space-x-3">
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
        {onTagFilter && (
          <div className="w-64">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Filter by tags (comma separated)"
              className="input-field"
            />
          </div>
        )}
        <button type="submit" className="btn-primary">
          Search
        </button>
        {(searchTerm || tags) && (
          <button
            type="button"
            onClick={handleClear}
            className="btn-secondary"
          >
            <FiX />
          </button>
        )}
      </div>
    </form>
  );
}
