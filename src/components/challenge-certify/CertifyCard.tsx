import React from 'react';

interface Image {
  src: string;
  alt: string;
  caption: string;
}

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className="my-masonry-grid_column">
      <div className="bg-white rounded-lg shadow-md p-4">
        <img src={image.src} alt={image.alt} className="w-full h-auto rounded-lg mb-4" />
        <p className="text-gray-800 text-base">{image.caption}</p>
      </div>
    </div>
  );
};

export default ImageCard;