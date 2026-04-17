'use client';

import React, { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import './Home.css';

const Blog = () => {
  const posts = [
    {
      title: 'Annual Sports Day 2024: A Day of Triumph',
      date: 'April 10, 2024',
      author: 'Admin',
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600',
      excerpt: 'Our students showcased remarkable spirit and athleticism in the annual sports meet...'
    },
    {
      title: 'STEAM Fair: Innovations and Discoveries',
      date: 'March 25, 2024',
      author: 'Academic Dept',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600',
      excerpt: 'The campus was buzzing with creativity as students presented their scientific models...'
    },
    {
      title: 'Welcome Back: Academic Year 2024-25',
      date: 'March 15, 2024',
      author: 'Principal',
      img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600',
      excerpt: 'Exciting times ahead as we prepare for another year of learning and growth...'
    }
  ];

  return (
    <div className="blog-page">
      <section className="page-header" style={{ background: 'var(--c-lavender)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: '4rem' }}
          >
            School <span className="text-primary">News & Blog</span>
          </motion.h1>
          <p className="hero-brand-tagline" style={{ color: 'var(--muted-foreground)', margin: '1rem auto' }}>
            Latest updates and stories from our campus.
          </p>
        </div>
      </section>

      <section className="blog-grid-section section">
        <div className="container">
          <div className="creative-grid">
            {posts.map((post, i) => (
              <motion.div 
                key={i} 
                className="polaroid-card"
                whileHover={{ rotate: 0, y: -10 }}
                style={{ '--rotation': `${i % 2 === 0 ? -2 : 2}deg` } as CSSProperties}
              >
                <div className="polaroid-taped"></div>
                <div className="polaroid-img-wrapper" style={{ height: '250px' }}>
                  <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="blog-meta" style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={12} /> {post.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={12} /> {post.author}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>{post.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{post.excerpt}</p>
                <button className="squishy-btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Read More <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
