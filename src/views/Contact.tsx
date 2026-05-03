'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Home.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="page-header" style={{ background: 'var(--page-bg)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: '4rem' }}
          >
            Contact <span className="text-primary">Us</span>
          </motion.h1>
          <p className="hero-brand-tagline" style={{ color: 'var(--muted-foreground)', margin: '1rem auto' }}>
            We&apos;re here to answer any questions you may have.
          </p>
        </div>
      </section>

      <section className="contact-details-section section">
        <div className="container">
          <div className="contact-grid contact-page-grid">
            <div className="contact-info-panel">
              <h2 className="section-title-spark" style={{ marginBottom: '2rem' }}>Reach Out</h2>
              <div className="contact-cards mobile-flex-grid" style={{ gap: '2rem' }}>
                {[
                  { icon: <Phone />, title: 'Call Us', detail: '+91 91234 56789', color: 'var(--c-mint)' },
                  { icon: <Mail />, title: 'Email Us', detail: 'contact@mallareddyschool.com', color: 'var(--c-citrus)' },
                  { icon: <MapPin />, title: 'Lalgadi Malakpet Campus', detail: 'Near Shamirpet, Lalgadi Malakpet, Hyderabad, 500078', color: 'var(--c-sky)' },
                  { icon: <Clock />, title: 'Office Hours', detail: 'Mon - Sat: 8:00 AM - 4:00 PM', color: 'var(--c-lavender)' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="blob-card"
                    style={{ background: item.color, padding: '1.5rem', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="blob-card-icon" style={{ marginBottom: 0 }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontWeight: 800 }}>{item.title}</h4>
                      <p>{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="contact-form-panel">
              <h2 className="section-title-spark" style={{ marginBottom: '2rem' }}>Inquiry Form</h2>
              <form action="https://formspree.io/f/your-id" method="POST" style={{ 
                background: 'white', padding: '2.5rem', borderRadius: '40px', 
                border: '4px solid #000', boxShadow: '15px 15px 0 #000',
                display: 'flex', flexDirection: 'column', gap: '1.5rem'
              }}>
                <input type="text" name="name" placeholder="Your Name" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <input type="email" name="email" placeholder="Email Address" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <input type="tel" name="phone" placeholder="Phone Number" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <textarea name="message" placeholder="How can we help?" rows={5} style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }}></textarea>
                <button type="submit" className="btn-primary squishy-btn">Submit Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="map-section section" style={{ paddingBottom: 0 }}>
        <div className="container-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4109315003666!2d78.48667107572765!3d17.436737201309855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb903cd0ad35d9%3A0xc077e69213134909!2sMalla%20Reddy%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="500" 
            style={{ border: 0, display: 'block' }} 
            allowFullScreen 
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
