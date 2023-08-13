
import React, { useState, useEffect } from 'react';

const ImageSearch = ({ searchText, handleFilter }) => {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('popular');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Timer to debounce the API call for suggestions
  let debounceTimer;

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setText(searchText);

    // Clear previous debounce timer
    clearTimeout(debounceTimer);

    // Set up a new timer to fetch suggestions
    debounceTimer = setTimeout(() => {
      fetchSuggestions(searchText);
    }, 300); // Adjust the debounce time as needed
  };

  const fetchSuggestions = (searchText) => {
    if (searchText.trim() === '') {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);

    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchText}&per_page=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data.hits.map((hit) => hit.tags));
        setIsLoadingSuggestions(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingSuggestions(false);
      });
  };

  const handleSuggestionClick = (suggestion) => {
    setText(suggestion);
    searchText(suggestion);
    setSuggestions([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    handleFilter(e.target.value);
  };

  return (
    <div className='max-w-sm rounded overflow-hidden my-10 mx-auto'>
      <form onSubmit={onSubmit} className='w-full max-w-sm'>
        <div className='flex items-center border-b border-b-2 border-teal-500 py-2'>
          <input
            onChange={handleSearchChange}
            value={text}
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
            type='text'
            placeholder='Search Image Term...'
          />
          <button
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
            type='submit'
          >
            Search
          </button>
        </div>
        <div className='my-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Filter by:
          </label>
          <select
            className='appearance-none bg-gray-200 border-none text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            onChange={handleFilterChange}
            value={filter}
          >
            <option value='popular'>Popular</option>
            <option value='downloads'>Downloads</option>
            <option value='views'>Views</option>
            <option value='likes'>Likes</option>
          </select>
        </div>
      </form>
      {suggestions.length > 0 && !isLoadingSuggestions && (
        <ul className='suggestions-list'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='suggestion-item'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {isLoadingSuggestions && (
        <div className='loading-suggestions'>Loading suggestions...</div>
      )}
    </div>
  );
};

export default ImageSearch;
