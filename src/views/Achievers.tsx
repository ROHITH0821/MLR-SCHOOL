'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

const Achievers = () => {
  const [filter, setFilter] = useState('All');

  const achievers = [
    { name: 'Rahul S.', cat: 'Academics', year: '2023', achievement: 'NTSE Scholar', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400' },
    { name: 'Sana M.', cat: 'Sports', year: '2024', achievement: 'National Chess Gold', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400' },
    { name: 'Arjun V.', cat: 'Academics', year: '2024', achievement: 'IIT-JEE Main - 99.8%', img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400' },
    { name: 'Isha K.', cat: 'Arts', year: '2023', achievement: 'State Level Kathak Gold', img: 'https://images.unsplash.com/photo-1544717297-fa95b8ee4a71?q=80&w=400' },
    { name: 'Leo J.', cat: 'Science', year: '2024', achievement: 'Insilico Biology Award', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400' },
  ];

  const filtered = filter === 'All' ? achievers : achievers.filter(a => a.cat === filter);

  return (
    <div className="achievers-page">
      <section className="page-header" style={{ background: 'var(--c-sky)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 className="hero-brand-name" style={{ fontSize: '4rem' }}>
            Hall of <span className="text-primary">Fame</span>
          </motion.h1>
          <p className="hero-brand-tagline">Celebrating our brightest stars and their incredible journeys.</p>
        </div>
      </section>

      <section className="achievers-grid-section section">
        <div className="container">
          {/* Filters */}
          <div className="filters" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {['All', 'Academics', 'Sports', 'Arts', 'Science'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`squishy-btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 1.5rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="creative-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((achiever) => (
                <motion.div 
                  key={achiever.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="polaroid-card"
                >
                  <div className="polaroid-taped"></div>
                  <div className="polaroid-img-wrapper" style={{ height: '220px' }}>
                    <img src={achiever.img} alt={achiever.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="text-center" style={{ padding: '0.5rem' }}>
                    <h4 style={{ fontWeight: 800 }}>{achiever.name}</h4>
                    <span style={{ fontSize: '0.8rem', background: 'var(--c-mint)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>{achiever.cat} • {achiever.year}</span>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>{achiever.achievement}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Achievers;
