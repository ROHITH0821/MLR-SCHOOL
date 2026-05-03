import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, Share2, Info } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-background-text" aria-hidden="true">
        MALLA REDDY
      </div>

      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link href="/" className="footer-logo" aria-label="Malla Reddy School home">
              <span className="footer-logo-mark">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={60}
                  height={60}
                  className="logo-img"
                />
              </span>
              <span className="footer-logo-text">
                <span className="footer-logo-title">Malla Reddy School</span>
                <span className="footer-logo-tag">Excellence in education</span>
              </span>
            </Link>
            <p className="footer-desc">
              Dedicated to providing excellence in education and shaping the leaders of tomorrow.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={20} strokeWidth={2} aria-hidden />
                <span>Medchal-Malkajgiri, Hyderabad, Telangana 501401</span>
              </div>
              <div className="contact-item">
                <Phone size={20} strokeWidth={2} aria-hidden />
                <span>+91 91234 56789</span>
              </div>
              <div className="contact-item">
                <Mail size={20} strokeWidth={2} aria-hidden />
                <span>contact@mallareddyschool.com</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Academics</h4>
            <ul className="footer-links">
              <li>
                <Link href="/curriculum">Curriculum</Link>
              </li>
              <li>
                <Link href="/labs">Laboratories</Link>
              </li>
              <li>
                <Link href="/utility">Disclosure</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/about">About School</Link>
              </li>
              <li>
                <Link href="/achievers">Achievers Wall</Link>
              </li>
              <li>
                <Link href="/blog">School News</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/co-curricular">Co-Curricular</Link>
              </li>
              <li>
                <Link href="/admission">Admission</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="copyright-text">&copy; {new Date().getFullYear()} Malla Reddy School. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Website">
                <Globe size={16} strokeWidth={2} />
              </a>
              <a href="#" className="social-link" aria-label="Social">
                <Share2 size={16} strokeWidth={2} />
              </a>
              <a href="#" className="social-link" aria-label="About">
                <Info size={16} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
