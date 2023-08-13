
import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('popular'); // Default filter

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&order=${filter}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term, filter]);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(images.length / 5) && selectedPage !== page)
      setPage(selectedPage);
  }

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} handleFilter={handleFilterChange} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : (
        <div className="grid grid-cols-3 gap-4">
          {images.slice((page * 5) - 5, page * 5).map(image => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      {
        images.length > 0 && <div className="pagination">
          <span className={page > 1 ? "" : "disable"} onClick={() => selectPageHandler(page - 1)}>⬅️</span>
          {
            [...Array(Math.ceil(images.length / 5))].map((_, i) => {
              return <span className={page === i + 1 ? "pagination_selected" : ""} onClick={() => selectPageHandler(i + 1)} key={i}>{i + 1}</span>
            })
          }
          <span className={page < Math.ceil(images.length / 5) ? "" : "disable"} onClick={() => selectPageHandler(page + 1)}>➡️</span>
        </div>
      }
    </div>
  );
}

export default App;
