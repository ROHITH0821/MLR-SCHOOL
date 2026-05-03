'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Admission.css';

const ADMISSION_SCRIPT_URL = process.env.NEXT_PUBLIC_ADMISSION_URL || "";

const Admission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    studentName: '',
    className: '',
    parentName: '',
    phone: '',
    branch: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      // We use a simple request to avoid preflight CORS issues with Apps Script
      await fetch(ADMISSION_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      // Since we use no-cors, we can't check response.ok, 
      // but if it doesn't throw, we assume success for the UI
      setStatus('success');
      setFormData({
        studentName: '',
        className: '',
        parentName: '',
        phone: '',
        branch: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="admission-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Admission & <span className="text-primary">Enquiry</span>
          </motion.h1>
          <p>Begin your child&apos;s journey under the <strong>NDP Framework</strong>. Enroll today for the 2026-27 academic year.</p>
        </div>
      </section>

      <section className="admission-content section">
        <div className="container">
          <div className="admission-grid">
            <div className="admission-info">
              <OptimizedImage 
                src="/malla-reddy-hero.jpg" 
                alt="Malla Reddy School Campus" 
                className="rounded-image shadow-image mb-8"
                aspectRatio="16/9"
              />
              <h2>The NDP Advantage</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-num-circle">1</div>
                  <div className="step-text">
                    <h3>Digital Enquiry</h3>
                    <p>Express interest through our NDP-aligned digital portal to start the process.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num-circle">2</div>
                  <div className="step-text">
                    <h3>Guided Campus Tour</h3>
                    <p>Experience our world-class infrastructure and pedagogical framework firsthand.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num-circle">3</div>
                  <div className="step-text">
                    <h3>Academic Alignment</h3>
                    <p>A personal session with our counselors to ensure the best fit for your child.</p>
                  </div>
                </div>
              </div>

              <div className="fee-notice" style={{ 
                padding: '2rem', 
                borderRadius: 'var(--radius-xl)', 
                background: 'var(--muted)', 
                border: '2px dashed var(--border)',
                marginTop: '2rem'
              }}>
                <h4 style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Fee Structure</h4>
                <p style={{ color: 'var(--muted-foreground)', fontStyle: 'italic', lineHeight: '1.6' }}>
                  &quot;For fee structure details, please <a href="tel:+919123456789" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'underline', fontStyle: 'normal' }}>call us directly</a> or visit your nearest CMR campus.&quot;
                </p>
              </div>
            </div>

            <div className="admission-form-container card">
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 800 }}>Enquiry Form</h2>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '3rem 0' }}
                >
                  <CheckCircle2 size={64} color="#0DB6B5" style={{ margin: '0 auto 1.5rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0A2463', marginBottom: '1rem' }}>Enquiry Sent!</h3>
                  <p style={{ color: '#666', marginBottom: '2rem' }}>Thank you for your interest. Our admissions team will contact you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="btn-secondary"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form className="admission-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Student Name</label>
                    <input 
                      type="text" 
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Full name of the student" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Class Applying For</label>
                    <select 
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="Pre-Primary">Pre-Primary (Nursery/PP1/PP2)</option>
                      <option value="Primary">Primary (Grade I - V)</option>
                      <option value="Middle">Middle (Grade VI - VIII)</option>
                      <option value="Secondary">Secondary (Grade IX - X)</option>
                      <option value="High School">High School (Grade XI - XII)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Parent Name</label>
                    <input 
                      type="text" 
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Parent / Guardian name" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Branch Preference</label>
                    <select 
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Branch</option>
                      <option value="Lalgadi Malakpet">Lalgadi Malakpet</option>
                      <option value="Kompally">Kompally</option>
                      <option value="Suraram">Suraram</option>
                      <option value="Shampur">Shampur</option>
                      <option value="Kundanpally">Kundanpally</option>
                      <option value="MB Grammar School">MB Grammar School</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3} 
                      placeholder="Any specific questions?"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <AlertCircle size={16} /> Failed to send enquiry. Please try again or call us.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary" 
                    style={{ 
                      width: '100%', 
                      padding: '1.25rem', 
                      borderRadius: 'var(--radius-lg)', 
                      fontWeight: 900, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <>Processing... <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                      <>Register Enquiry <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admission;
