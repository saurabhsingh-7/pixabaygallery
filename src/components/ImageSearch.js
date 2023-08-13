import React, { useState } from 'react';

const ImageSearch = ({ searchText, handleFilter }) => {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('popular'); // Default filter

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    handleFilter(e.target.value);
  }

  return (
    <div className='max-w-sm rounded overflow-hidden my-10 mx-auto'>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            onChange={e => setText(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search Image Term..."
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Filter by:
          </label>
          <select
            className="appearance-none bg-gray-200 border-none text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={handleFilterChange}
            value={filter}
          >
            <option value="popular">Popular</option>
            <option value="downloads">Downloads</option>
            <option value="views">Views</option>
            <option value="likes">Likes</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ImageSearch;
