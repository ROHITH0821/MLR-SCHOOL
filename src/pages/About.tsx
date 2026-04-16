import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Home.css'; // Reuse creative section styles

const About = () => {
  return (
    <div className="about-page">
      <section className="page-header" style={{ background: 'var(--c-mint)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: '4rem' }}
          >
            About <span className="text-primary">Malla Reddy School</span>
          </motion.h1>
          <p className="hero-brand-tagline" style={{ color: 'var(--muted-foreground)', margin: '1rem auto' }}>
            A legacy of excellence, innovation, and community.
          </p>
        </div>
      </section>

      {/* Vision & Mission Blobs */}
      <section className="vision-mission section">
        <div className="container">
          <div className="creative-grid">
            <motion.div 
              className="blob-card"
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
            >
              <div className="blob-card-icon" style={{ background: 'var(--c-sky)' }}><Eye size={32} /></div>
              <h3>Our Vision</h3>
              <p>To be a global leader in education, nurturing creative minds and compassionate souls through a STEAM-centric approach.</p>
            </motion.div>
            <motion.div 
              className="blob-card"
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
            >
              <div className="blob-card-icon" style={{ background: 'var(--c-citrus)' }}><Target size={32} /></div>
              <h3>Our Mission</h3>
              <p>To provide a rigorous yet supportive environment where students excel academically, socially, and emotionally.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal's Desk */}
      <section className="principal-desk section" style={{ background: 'var(--c-sky)' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div 
              className="polaroid-card"
              whileHover={{ rotate: 0 }}
            >
              <div className="polaroid-taped"></div>
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1544717297-fa95b8ee4a71?q=80&w=600" 
                alt="Principal" 
                aspectRatio="1/1"
              />
              <div className="text-center" style={{ marginTop: '1rem' }}>
                <h4 style={{ fontWeight: 800 }}>Dr. Anitha Reddy</h4>
                <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Principal</p>
              </div>
            </motion.div>
            <div className="principal-text">
              <h2 className="section-title-spark">Principal's Message</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333', fontStyle: 'italic' }}>
                "Education is not the learning of facts, but the training of the mind to think. 
                At Malla Reddy School, we believe in unlocking the potential within every child..."
              </p>
              <p style={{ marginTop: '1.5rem', lineHeight: '1.6', color: 'var(--muted-foreground)' }}>
                Our commitment is to provide a safe, nurturing, and high-tech environment for all our students. 
                Join us in this journey of academic and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Salient Features */}
      <section className="salient-features section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title-spark">Why We Are Different</h2>
          </div>
          <div className="creative-grid">
            {[
              { t: 'STEAM Curriculum', i: <Zap /> },
              { t: 'Individual Attention', i: <Heart /> },
              { t: 'Modern Infrastructure', i: <ShieldCheck /> },
              { t: 'Global Exposure', i: <Globe /> },
            ].map((f, i) => (
              <motion.div key={i} className="blob-card">
                <div className="blob-card-icon">{f.i}</div>
                <h3>{f.t}</h3>
                <p>We ensure that every child is prepared for the challenges of the 21st century.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Live Academic Calendar */}
      <section className="academic-calendar section" style={{ background: 'var(--c-mint)' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title-spark">Live Academic Calendar</h2>
            <p className="section-desc text-center mx-auto" style={{ maxWidth: '600px', marginBottom: '2rem' }}>Stay updated with important dates, exams, and events.</p>
          </div>
          <div className="calendar-grid">
            {[
              { date: 'June 2, 2026', title: 'School Reopens', desc: 'New Academic Session 2026-27 begins.' },
              { date: 'July 15, 2026', title: 'Periodic Test 1', desc: 'Grade 1-10 assessments start.' },
              { date: 'August 15, 2026', title: 'Independence Day', desc: 'Flag hoisting and cultural showcases.' },
              { date: 'September 10, 2026', title: 'PTM', desc: 'Parent-Teacher Meeting for all grades.' },
            ].map((event, idx) => (
              <div key={idx} className="calendar-card">
                <div className="calendar-date">{event.date}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{event.title}</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>{event.desc}</p>
                <button className="btn-secondary squishy-btn" style={{ marginTop: '1rem', width: '100%', fontWeight: 'bold' }}>+ Google Calendar</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Globe = ({ size }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const Zap = ({ size }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

export default About;
