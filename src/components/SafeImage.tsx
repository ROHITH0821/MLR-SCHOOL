import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  hoverZoom?: boolean;
}

const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = '16 / 9',
  hoverZoom = true
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallback image URL (reliable high-quality school placeholder)
  const fallbackSrc = 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

  return (
    <div 
      className={`safe-image-container ${className}`}
      style={{ 
        aspectRatio, 
        overflow: 'hidden', 
        position: 'relative',
        backgroundColor: '#f3f4f6', // Light gray placeholder background
        borderRadius: 'inherit'
      }}
    >
      {loading && (
        <div className="image-skeleton" style={{ position: 'absolute', inset: 0, backgroundColor: '#e5e7eb', zIndex: 1 }} />
      )}
      
      <motion.img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        whileHover={hoverZoom ? { scale: 1.05 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

export default SafeImage;
