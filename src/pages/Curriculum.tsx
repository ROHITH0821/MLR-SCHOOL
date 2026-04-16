import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Laptop, Settings, Palette, Calculator } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Curriculum.css';

const Curriculum = () => {
  const steamSubjects = [
    {
      icon: <Beaker size={40} className="text-primary" />,
      title: 'Science',
      desc: 'Exploring the natural world through hands-on experiments and discovery.',
    },
    {
      icon: <Laptop size={40} className="text-secondary" />,
      title: 'Technology',
      desc: 'Mastering digital literacy and coding for the modern tech landscape.',
    },
    {
      icon: <Settings size={40} className="text-accent" />,
      title: 'Engineering',
      desc: 'Building problem-solving skills through robotics and design projects.',
    },
    {
      icon: <Palette size={40} className="text-secondary" />,
      title: 'Arts',
      desc: 'Nurturing creativity and self-expression through various artistic mediums.',
    },
    {
      icon: <Calculator size={40} className="text-primary" />,
      title: 'Mathematics',
      desc: 'Developing logical reasoning and analytical thinking skills.',
    },
  ];

  return (
    <div className="curriculum-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Academic <span className="text-primary">Curriculum</span>
          </motion.h1>
          <p>A comprehensive approach to modern education with STEAM at its core.</p>
        </div>
      </section>

      <section className="steam-subjects section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">The STEAM Foundation</h2>
            <p className="section-subtitle">Our integrated approach to Science, Technology, Engineering, Arts, and Mathematics.</p>
          </div>
          <div className="steam-grid">
            {steamSubjects.map((subject, index) => (
              <motion.div 
                key={index}
                className="notebook-card"
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: index % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 10, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                style={{ 
                  background: 'white',
                  border: '3px solid #000',
                  borderRadius: '15px 40px 15px 15px',
                  padding: '2.5rem',
                  boxShadow: '8px 8px 0px 0px #000',
                  position: 'relative'
                }}
              >
                <div className="notebook-corner" style={{ 
                  position: 'absolute', top: '-2px', right: '-2px', 
                  width: '40px', height: '40px', background: 'var(--c-citrus)',
                  borderLeft: '3px solid #000', borderBottom: '3px solid #000',
                  borderRadius: '0 15px 0 15px' 
                }}></div>
                <div className="steam-icon" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                  {React.cloneElement(subject.icon as React.ReactElement, { size: 40 })}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>
                  {subject.title}
                </h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.6' }}>{subject.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="learning-journey section">
        <div className="container">
          <div className="journey-step">
            <div className="journey-content">
              <span className="step-num">01</span>
              <h2>Primary Foundation</h2>
              <p>
                Focusing on core literacy, numeracy, and social development. We provide 
                a nurturing environment where young minds can flourish.
              </p>
            </div>
            <div className="journey-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600" 
                alt="Primary Education" 
                className="rounded-image shadow-image hover-zoom"
                aspectRatio="16/9"
              />
            </div>
          </div>

          <div className="journey-step reverse">
            <div className="journey-content">
              <span className="step-num">02</span>
              <h2>Middle School Growth</h2>
              <p>
                Encouraging independent thinking and deeper exploration of subjects. 
                Students begin to specialize and discover their passions.
              </p>
            </div>
            <div className="journey-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600" 
                alt="Middle School" 
                className="rounded-image shadow-image hover-zoom"
                aspectRatio="16/9"
              />
            </div>
          </div>

          <div className="journey-step">
            <div className="journey-content">
              <span className="step-num">03</span>
              <h2>Secondary Excellence</h2>
              <p>
                Preparing students for higher education and global careers. Our secondary 
                program emphasizes critical thinking and leadership.
              </p>
            </div>
            <div className="journey-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600" 
                alt="Secondary Education" 
                className="rounded-image shadow-image hover-zoom"
                aspectRatio="16/9"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
