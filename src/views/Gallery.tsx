'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './Gallery.css';

type GalleryItem = {
  id: string;
  src: string;
  /** Larger URL for zoom view (Unsplash); same as src for local files */
  srcHd?: string;
  category: string;
  title: string;
  /** layout hint for bento grid */
  size?: 'sm' | 'md' | 'lg';
};





import { fetchDataFromSheet } from '@/lib/sheets';

const GALLERY_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=438455533&single=true&output=csv";

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadGallery() {
      const data = await fetchDataFromSheet<GalleryItem>(GALLERY_SHEET_URL, '0', (cols) => ({
        id: cols[0],
        src: cols[1],
        srcHd: cols[1], // Use same for HD if not provided
        category: cols[2]?.toLowerCase() || 'general',
        title: cols[3] || '',
        size: (cols[4] as GalleryItem['size']) || 'md',
      }));
      if (data && data.length > 0) {
        const validData = data.filter(item => item.src && (item.src.startsWith('http') || item.src.startsWith('/')));
        setItems(validData);
      }
    }
    loadGallery();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(['all']);
    items.forEach(item => {
      if (item.category) cats.add(item.category.toLowerCase());
    });
    return Array.from(cats);
  }, [items]);

  const filtered = useMemo(() => 
    filter === 'all' ? items : items.filter((img) => img.category.toLowerCase() === filter.toLowerCase()),
    [items, filter]
  );

  const previewPick = useMemo(() => items.slice(0, 3), [items]);
  
  function label(cat: string) {
    if (cat === 'all') return 'All';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  const openIndex = selected ? filtered.findIndex((i: GalleryItem) => i.id === selected.id) : -1;

  const goPrev = useCallback(() => {
    if (!selected || openIndex <= 0) return;
    setSelected(filtered[openIndex - 1]);
  }, [selected, openIndex, filtered]);

  const goNext = useCallback(() => {
    if (!selected || openIndex < 0 || openIndex >= filtered.length - 1) return;
    setSelected(filtered[openIndex + 1]);
  }, [selected, openIndex, filtered]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, goPrev, goNext]);

  const spring = reduceMotion ? { duration: 0.01 } : { type: 'spring' as const, stiffness: 380, damping: 28 };

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="container gallery-hero-copy">
          <motion.div
            className="gallery-hero-inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <span className="gallery-badge">
              <Sparkles size={16} aria-hidden />
              Photo gallery
            </span>
            <h1 className="gallery-title">
              Life at <span className="text-primary">Malla Reddy School</span>
            </h1>
            <p className="gallery-lead">
              Tap any photo to see it large. Use arrows or swipe to move between pictures.
            </p>
          </motion.div>
        </div>

        {/* Full-width preview — edge-to-edge */}
        <div className="gallery-preview-outer">
          <div className="gallery-preview-stage">
            <div className="gallery-preview" aria-hidden={false}>
              {previewPick.map((item: GalleryItem, idx: number) => (
                <motion.button
                  key={item.id}
                  type="button"
                  aria-label={`Open large photo: ${item.title}`}
                  className={`gallery-preview-card gallery-preview-card--${idx}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ ...spring, delay: reduceMotion ? 0 : idx * 0.1 }}
                  whileHover={
                    reduceMotion
                      ? {}
                      : idx === 1
                        ? { y: -10, scale: 1.02, zIndex: 5 }
                        : { y: -6, scale: 1.03, zIndex: 4 }
                  }
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(item)}
                >
                  <span className="gallery-preview-shine" aria-hidden />
                  <span className="gallery-preview-frame">
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className="gallery-preview-img"
                      sizes={
                        idx === 1
                          ? '(max-width: 639px) 96vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                          : '(max-width: 639px) 46vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                      }
                      priority={idx === 1}
                    />
                    <span className="gallery-preview-caption">{item.title}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section section gallery-section--fluid">
        <div className="gallery-toolbar">
          <div className="gallery-filter-row" role="tablist" aria-label="Filter photos">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                className={`gallery-filter ${filter === cat ? 'is-active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {label(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-bento-shell">
          <motion.div layout className="gallery-bento">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((img: GalleryItem, i: number) => (
                <motion.button
                  key={img.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{
                    ...spring,
                    delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.4),
                  }}
                  className={`gallery-tile gallery-tile--${img.size ?? 'md'}`}
                  aria-label={`Open ${img.title}`}
                  onClick={() => setSelected(img)}
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="gallery-tile-glow" />
                  <span className="gallery-tile-media">
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 899px) 50vw, (max-width: 1200px) 33vw, 22vw"
                      className="gallery-tile-img"
                    />
                  </span>
                  <span className="gallery-tile-bottom">
                    <span className="gallery-tile-title">{img.title}</span>
                    <span className="gallery-tile-cat">{label(img.category)}</span>
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="gallery-lightbox-inner"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={spring}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="gallery-lightbox-close"
                aria-label="Close"
                onClick={() => setSelected(null)}
              >
                <X size={28} strokeWidth={2} />
              </button>

              {openIndex > 0 && (
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-nav--prev"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                >
                  <ChevronLeft size={36} />
                </button>
              )}
              {openIndex >= 0 && openIndex < filtered.length - 1 && (
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-nav--next"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                >
                  <ChevronRight size={36} />
                </button>
              )}

              <div className="gallery-lightbox-figure">
                <Image
                  src={selected.srcHd ?? selected.src}
                  alt={selected.title}
                  fill
                  className="gallery-lightbox-img"
                  sizes="min(96vw, 1440px)"
                  priority
                />
              </div>
              <div className="gallery-lightbox-meta">
                <h2>{selected.title}</h2>
                <p>{label(selected.category)}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
