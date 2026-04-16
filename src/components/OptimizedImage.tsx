import React, { useState } from 'react';
import './OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = 'auto',
  fallbackSrc = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800' // General school fallback
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div 
      className={`optimized-image-container ${className}`} 
      style={{ aspectRatio }}
    >
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
      {!isLoaded && <div className="image-placeholder-shimmer" />}
    </div>
  );
};

export default OptimizedImage;
