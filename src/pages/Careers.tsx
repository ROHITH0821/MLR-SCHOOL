import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import './Home.css';

const Careers = () => {
  const jobs = [
    { title: 'Senior Mathematics Teacher', type: 'Full-Time', location: 'On-Campus', exp: '5+ Years' },
    { title: 'Primary Science Facilitator', type: 'Full-Time', location: 'On-Campus', exp: '2+ Years' },
    { title: 'Student Counselor', type: 'Part-Time', location: 'On-Campus', exp: '3+ Years' },
  ];

  return (
    <div className="careers-page">
      <section className="page-header" style={{ background: 'var(--c-lavender)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: '4rem' }}
          >
            Join Our <span className="text-primary">Team</span>
          </motion.h1>
          <p className="hero-brand-tagline" style={{ color: 'var(--muted-foreground)', margin: '1rem auto' }}>
            Shape the future of education with us.
          </p>
        </div>
      </section>

      <section className="section py-20">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          
          <div className="job-listings">
            <h2 className="section-title-spark" style={{ marginBottom: '2rem' }}>Open Positions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {jobs.map((job, idx) => (
                <div key={idx} className="polaroid-card" style={{ '--rotation': '0deg' } as React.CSSProperties}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{job.title}</h3>
                    <Briefcase size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16}/> {job.type}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16}/> {job.location}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Experience Required: {job.exp}</p>
                  <button className="btn-secondary squishy-btn" style={{ width: '100%' }}>Apply for this role</button>
                </div>
              ))}
            </div>
          </div>

          <div className="application-form">
            <h2 className="section-title-spark" style={{ marginBottom: '2rem' }}>General Application</h2>
            <form action="https://formspree.io/f/your-id" method="POST" style={{ 
                background: 'white', padding: '2.5rem', borderRadius: '40px', 
                border: '4px solid #000', boxShadow: '15px 15px 0 #000',
                display: 'flex', flexDirection: 'column', gap: '1.5rem'
              }}>
                <input type="text" name="name" placeholder="Full Name" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <input type="email" name="email" placeholder="Email Address" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <input type="tel" name="phone" placeholder="Phone Number" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="resume" style={{ fontWeight: 600 }}>Resume Link (Google Drive / LinkedIn PDF)</label>
                  <input type="url" name="resume" id="resume" placeholder="Paste link here..." required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                </div>
                
                <textarea name="cover_letter" placeholder="Why do you want to join us? (Short Cover Letter)" rows={4} style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }}></textarea>
                <button type="submit" className="btn-primary squishy-btn" style={{ fontSize: '1.1rem', padding: '1rem' }}>Submit Application</button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Careers;
