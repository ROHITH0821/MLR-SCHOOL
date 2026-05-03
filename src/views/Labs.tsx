'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Laptop, Calculator, BookOpen, Zap } from 'lucide-react';
import FacilityLightbox from '@/components/FacilityLightbox';
import './Home.css';

const Labs = () => {
  const [selectedLab, setSelectedLab] = React.useState<{ title: string; images: string[] } | null>(null);
  const labs = [
    { 
      title: 'Composite Science Lab', 
      icon: <Microscope />, 
      img: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=600', 
      desc: 'Equipped with the latest apparatus for Physics, Chemistry, and Biology experiments.',
      gallery: [
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200',
        'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200',
      ]
    },
    { 
      title: 'Computer Intelligence Lab', 
      icon: <Laptop />, 
      img: 'https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=600', 
      desc: 'High-speed internet and modern systems for coding, AI, and digital literacy.',
      gallery: [
        'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=1200',
        'https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=1200',
      ]
    },
    { 
      title: 'Mathematical Explorer Zone', 
      icon: <Calculator />, 
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600', 
      desc: 'Making abstract concepts concrete through 3D models and interactive tools.',
      gallery: [
        'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',
      ]
    },
    { 
      title: 'Space Lab & Astronomy', 
      icon: <Zap />, 
      img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600', 
      desc: 'Embark on an exhilarating journey through the cosmos with our specialized space science simulations and telescopes.',
      gallery: [
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200',
        'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200',
      ]
    },
    { 
      title: 'Robotics & Innovation Lab', 
      icon: <Zap />, 
      img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=600', 
      desc: 'Where students build and program robots for national level competitions.',
      gallery: [
        'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1200',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200',
      ]
    },
  ];

  return (
    <div className="labs-page">
      <section className="page-header" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', padding: '8rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-brand-name" 
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#0A2463' }}
          >
            Labs & <span className="text-primary" style={{ color: '#0DB6B5' }}>Facilities</span>
          </motion.h1>
          <p className="hero-brand-tagline" style={{ color: '#64748b', fontSize: '1.25rem' }}>Infrastructure designed to spark curiosity and innovation.</p>
        </div>
      </section>

      <section className="labs-grid-section section">
        <div className="container">
          <div className="creative-grid centered-flex">
            {labs.map((lab, i) => (
              <motion.div 
                key={i} 
                className="blob-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedLab({ title: lab.title, images: lab.gallery })}
                whileInView={{ scale: [0.95, 1], rotate: i % 2 === 0 ? -1 : 1 }}
              >
                <div className="blob-card-img" style={{ height: '200px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #000', marginBottom: '1.5rem' }}>
                  <img src={lab.img} alt={lab.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="blob-card-icon" style={{ background: 'var(--c-sky)' }}>{lab.icon}</div>
                <h3 style={{ fontWeight: 800 }}>{lab.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>{lab.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="library-section section" style={{ background: 'var(--page-bg)' }}>
        <div className="container">
          <div className="contact-grid contact-grid-labs">
            <div>
              <h2 className="section-title-spark"><BookOpen /> The Digital Library</h2>
              <p style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                With over 10,000 physical books and a vast digital repository, our library 
                is the heart of knowledge on campus. It features quiet study zones and 
                collaborative spaces.
              </p>
            </div>
            <div className="polaroid-card">
              <div className="polaroid-taped"></div>
              <img src="https://images.unsplash.com/photo-1529148482759-b35b25c5f217?q=80&w=600" alt="Library" style={{ width: '100%', borderRadius: '15px' }} />
            </div>
          </div>
        </div>
      </section>

      <FacilityLightbox 
        isOpen={!!selectedLab}
        onClose={() => setSelectedLab(null)}
        images={selectedLab?.images || []}
        title={selectedLab?.title || ''}
      />
    </div>
  );
};

export default Labs;
