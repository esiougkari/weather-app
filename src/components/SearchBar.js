import React, { useState } from 'react';
import './SearchBar.css'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fa fa-search"></i> {/* Replace with your preferred search icon */}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
