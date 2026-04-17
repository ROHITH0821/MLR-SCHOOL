'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Parent of Grade 4 Student',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
      content: 'The STEAM focus at Malla Reddy School has transformed how my son looks at problems. He is more curious and analytical than ever before.',
      rating: 5,
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Parent of Grade 8 Student',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150',
      content: 'Exceptional faculty and world-class infrastructure. The transition to this school was the best decision for our daughter’s holistic growth.',
      rating: 5,
    },
    {
      name: 'Anjali Reddy',
      role: 'Parent of Grade 2 Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
      content: 'The individual attention every child receives is remarkable. The blend of traditional values and modern technology is perfect.',
      rating: 5,
    },
    {
      name: 'Suresh Varma',
      role: 'Parent of Grade 10 Student',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
      content: 'The preparation for competitive exams coupled with focus on character building makes this school stand out from the rest.',
      rating: 5,
    },
  ];

  return (
    <div className="testimonials-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Parent <span className="text-primary">Testimonials</span>
          </motion.h1>
          <p>Hear from the community that makes Malla Reddy School a beacon of excellence.</p>
        </div>
      </section>

      <section className="testimonials-grid-section section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <motion.div 
                key={index}
                className="bubble-card"
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -2 : 2 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5, duration: 1, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="bubble-card-inner">
                  <div className="quote-icon" style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Quote size={32} /></div>
                  <div className="rating" style={{ marginBottom: '1rem' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#ffb800" color="#ffb800" />
                    ))}
                  </div>
                  <p className="testimonial-content" style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="testimonial-author" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="author-avatar-wrapper" style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #000' }}>
                      <OptimizedImage 
                        src={t.image} 
                        alt={t.name} 
                        className="author-avatar-img"
                        aspectRatio="1/1"
                      />
                    </div>
                    <div className="author-info">
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{t.name}</h4>
                      <span className="author-role" style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="video-testimonials section" style={{ background: 'var(--c-citrus)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title-spark">Video Testimonials</h2>
            <p className="section-desc">Hear directly from our students and parents.</p>
          </div>
          <div className="calendar-grid">
            {[ 
              "https://www.youtube.com/embed/dQw4w9WgXcQ?si=abcdef",
              "https://www.youtube.com/embed/tgbNymZ7vqY?si=abcdef",
              "https://www.youtube.com/embed/ScMzIvxBSi4?si=abcdef"
            ].map((videoUrl, idx) => (
              <div key={idx} className="video-wrapper">
                <iframe src={videoUrl} title={`Testimonial Video ${idx+1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-cta section">
        <div className="container">
          <div className="cta-centered">
            <h2>Experience the Difference</h2>
            <p>Join our growing family and give your child the education they deserve.</p>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Admissions
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
