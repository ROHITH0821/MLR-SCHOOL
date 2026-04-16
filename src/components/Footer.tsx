import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Share2, Info } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              <img src="/logo.svg" alt="Malla Reddy School" className="logo-img" />
              <span className="logo-text">Malla Reddy School</span>
            </Link>
            <p className="footer-desc">
              Dedicated to providing excellence in education and shaping the leaders of tomorrow.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Globe size={20} /></a>
              <a href="#" className="social-link"><Share2 size={20} /></a>
              <a href="#" className="social-link"><Info size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About School</Link></li>
              <li><Link to="/achievers">Achievers Wall</Link></li>
              <li><Link to="/blog">School News</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/admission">Admission</Link></li>
            </ul>
          </div>

          {/* Academics */}
          <div className="footer-col">
            <h4 className="footer-title">Academics</h4>
            <ul className="footer-links">
              <li><Link to="/curriculum">Curriculum</Link></li>
              <li><Link to="/labs">Laboratories</Link></li>
              <li><Link to="/utility">Disclosure</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={20} />
                <span>Medchal-Malkajgiri, Hyderabad, Telangana 501401</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>+91 91234 56789</span>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <span>contact@mallareddyschool.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Malla Reddy School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
