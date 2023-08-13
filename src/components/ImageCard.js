import React from 'react';

const ImageCard = ({ image }) => {
  const tags = image.tags.split(',');

  const shareImage = () => {
    const shareText = `Check out this amazing photo by ${image.user} on Pixabay!`;
    const shareUrl = image.webformatURL;

    // Use the Web Share API to share the image
    if (navigator.share) {
      navigator.share({
        title: shareText,
        text: shareText,
        url: shareUrl,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={image.webformatURL} alt="" className="w-full"/>
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          Photo by {image.user}
        </div>
        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #{tag}
        </span>
        ))}
      </div>
      <div className="px-6 py-4 flex justify-between">
        <button onClick={shareImage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Share
        </button>
        {/* Add share buttons for other platforms */}
        {/* Add Pinterest, Facebook, Twitter, and WhatsApp share buttons */}
        {/* You can use respective share URLs for each platform */}
        {/* Example: */}
         <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(image.webformatURL)}&media=${encodeURIComponent(image.webformatURL)}&description=${encodeURIComponent('Check out this amazing photo by ' + image.user + ' on Pixabay!')}`} target="_blank" rel="noopener noreferrer">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Pin It
          </button>
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
