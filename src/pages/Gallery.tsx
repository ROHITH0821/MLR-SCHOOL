import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Gallery.css';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = ['all', 'campus', 'events', 'sports', 'academics', 'labs'];

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800',
      category: 'campus',
      title: 'Main Entrance & Plaza',
    },
    {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
      category: 'academics',
      title: 'Interactive Learning Session',
    },
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
      category: 'events',
      title: 'Annual Cultural Festival',
    },
    {
      url: 'https://images.unsplash.com/photo-1526676037777-05a232554f75?q=80&w=800',
      category: 'sports',
      title: 'Regional Athletics Meet',
    },
    {
      url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800',
      category: 'academics',
      title: 'Collaborative Group Study',
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
      category: 'labs',
      title: 'Digital Innovation Center',
    },
    {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
      category: 'academics',
      title: 'Primary Grade Discussion',
    },
    {
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800',
      category: 'events',
      title: 'Science & Art Exhibition',
    },
    {
      url: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=800',
      category: 'sports',
      title: 'Basketball Championship',
    },
    {
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800',
      category: 'labs',
      title: 'Chemistry Research Lab',
    },
    {
      url: 'https://images.unsplash.com/photo-1501290741922-b56c0d0884af?q=80&w=800',
      category: 'campus',
      title: 'School Garden & Amphitheater',
    },
    {
      url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800',
      category: 'academics',
      title: 'Advanced Mathematics Seminar',
    },
    {
      url: 'https://images.unsplash.com/photo-1577891779347-666324d06a4b?q=80&w=800',
      category: 'labs',
      title: 'Robotics & AI Workshop',
    },
    {
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800',
      category: 'campus',
      title: 'Indoor Creative Space',
    },
    {
      url: 'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?q=80&w=800',
      category: 'events',
      title: 'Alumni Meet & Networking',
    },
  ];

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="gallery-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Visual <span className="text-primary">Gallery</span>
          </motion.h1>
          <p>A glimpse into the life and achievements at Malla Reddy School.</p>
        </div>
      </section>

      <section className="gallery-section section">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <motion.div 
            className="gallery-grid"
            layout
          >
            <AnimatePresence mode='popLayout'>
              {filteredImages.map((img) => (
                <motion.div 
                  key={img.url}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedImage(img)}
                  layout
                >
                  <OptimizedImage 
                    src={img.url} 
                    alt={img.title} 
                  />
                  <div className="gallery-overlay">
                    <Maximize2 size={24} className="mb-4 text-white" />
                    <h3>{img.title}</h3>
                    <p>{img.category.charAt(0).toUpperCase() + img.category.slice(1)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                <X size={32} />
              </button>
              <img src={selectedImage.url} alt={selectedImage.title} className="lightbox-img" />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.category.toUpperCase()}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
