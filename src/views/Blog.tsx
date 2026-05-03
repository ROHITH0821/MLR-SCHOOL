'use client';

import React, { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { fetchDataFromSheet } from '@/lib/sheets';
import './Home.css';

const NEWS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=818070186&single=true&output=csv";

interface BlogPost {
  title: string;
  date: string;
  author: string;
  img: string;
  excerpt: string;
}

const Blog = () => {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    async function loadNews() {
      const data = await fetchDataFromSheet<BlogPost>(NEWS_SHEET_URL, '0', (cols) => ({
        title: cols[1], // Assuming title is col 1
        excerpt: cols[2],
        date: cols[3],
        img: cols[4],
        author: 'School Admin'
      }));
      if (data && data.length > 0) {
        const validPosts = data.filter(post => post.title && post.title.trim() !== '');
        setPosts(validPosts);
      }
    }
    loadNews();
  }, []);

  return (
    <div className="blog-page">
      <section className="page-header" style={{ background: 'var(--page-bg)', padding: '6rem 0 4rem', textAlign: 'center' }}>
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
                  {post.img && post.img.length > 5 ? (
                    <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>No Image</div>
                  )}
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
