import React, { useState } from 'react';

const ImageTest = ({ src, alt, fallbackSrc = '/media/default-avatar.jpg' }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
  };

  const handleLoad = () => {
    console.log(`Successfully loaded image: ${src}`);
    setImageLoaded(true);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={imageError ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          maxWidth: '100%',
          height: 'auto',
          border: imageError ? '2px solid red' : imageLoaded ? '2px solid green' : '2px solid gray'
        }}
      />
      {imageError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: 'red'
        }}>
          Failed to load
        </div>
      )}
    </div>
  );
};

export default ImageTest; 