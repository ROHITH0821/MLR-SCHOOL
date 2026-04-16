import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Admission.css';

const Admission = () => {
  return (
    <div className="admission-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Admissions <span className="text-primary">Portal</span>
          </motion.h1>
          <p>Begin your child’s journey towards excellence. Enroll today for the 2024-25 academic year.</p>
        </div>
      </section>

      <section className="admission-content section">
        <div className="container">
          <div className="admission-grid">
            <div className="admission-info">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" 
                alt="Admissions" 
                className="rounded-image shadow-image mb-8"
                aspectRatio="16/9"
              />
              <h2>Admission Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-num-circle">1</div>
                  <div className="step-text">
                    <h3>Online Inquiry</h3>
                    <p>Fill out the inquiry form below with your child's basic information.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num-circle">2</div>
                  <div className="step-text">
                    <h3>Campus Visit</h3>
                    <p>Our team will contact you to schedule a visit and interaction session.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num-circle">3</div>
                  <div className="step-text">
                    <h3>Documentation</h3>
                    <p>Submit required documents and complete the formal application process.</p>
                  </div>
                </div>
              </div>

              <div className="contact-cards">
                <div className="contact-card">
                  <Phone className="text-primary" />
                  <div>
                    <h4>Admission Helpline</h4>
                    <p>+91 91234 56789</p>
                  </div>
                </div>
                <div className="contact-card">
                  <Mail className="text-secondary" />
                  <div>
                    <h4>Email Support</h4>
                    <p>admissions@mallareddyschool.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="admission-form-container card">
              <h2>Inquiry Form</h2>
              <form className="admission-form">
                <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" placeholder="Enter student's full name" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Grade Seeking</label>
                    <select required>
                      <option value="">Select Grade</option>
                      <option value="pk">Pre-Primary</option>
                      <option value="p">Primary</option>
                      <option value="m">Middle School</option>
                      <option value="s">Secondary</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Parent Phone</label>
                    <input type="tel" placeholder="Phone Number" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message / Questions</label>
                  <textarea rows={4} placeholder="Any specific questions?"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Submit Inquiry <Send size={18} className="inline-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admission;
