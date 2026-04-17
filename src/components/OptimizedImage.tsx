'use client';

import Image from 'next/image';
import { useState } from 'react';
import './OptimizedImage.css';

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  sizes?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  fallbackSrc = DEFAULT_FALLBACK,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const finalSrc = error ? fallbackSrc : src;

  const useFill = aspectRatio !== undefined && aspectRatio !== 'auto';

  if (useFill) {
    return (
      <div
        className={`optimized-image-container ${className}`}
        style={{ aspectRatio, position: 'relative' }}
      >
        <Image
          src={finalSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`optimized-image ${loaded ? 'loaded' : 'loading'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
        {!loaded && <div className="image-placeholder-shimmer" aria-hidden />}
      </div>
    );
  }

  return (
    <div className={`optimized-image-container ${className}`}>
      <Image
        src={finalSrc}
        alt={alt}
        width={800}
        height={600}
        sizes={sizes}
        priority={priority}
        className={`optimized-image ${loaded ? 'loaded' : 'loading'}`}
        style={{ width: '100%', height: 'auto' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {!loaded && <div className="image-placeholder-shimmer" aria-hidden />}
    </div>
  );
}
