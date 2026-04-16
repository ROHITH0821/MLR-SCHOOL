import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Topbar from './Topbar';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '#',
      dropdown: [
        { name: 'About School', path: '/about' },
        { name: 'Principal\'s Desk', path: '/principal' },
        { name: 'Management', path: '/management' },
        { name: 'Vision & Mission', path: '/vision' },
        { name: 'Careers', path: '/careers' },
      ]
    },
    { 
      name: 'Academics', 
      path: '#',
      dropdown: [
        { name: 'Curriculum', path: '/curriculum' },
        { name: 'Admissions', path: '/admission' },
        { name: 'Student Achievers', path: '/achievers' },
      ]
    },
    { name: 'Facilities', path: '/life' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {!scrolled && <Topbar />}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
            <img src="/logo.svg" alt="Malla Reddy School" className="logo-img" />
            <span className="logo-text">Malla Reddy School</span>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <div key={link.name} className={link.dropdown ? 'nav-item-dropdown' : ''}>
                {link.dropdown ? (
                  <div className="nav-link nav-link-with-icon">
                    {link.name} <ChevronDown size={14} />
                    <div className="dropdown-menu">
                      {link.dropdown.map((sub) => (
                        <Link key={sub.name} to={sub.path} className="dropdown-item">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/admission" className="btn-primary squishy-btn">Apply Now</Link>
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div className="mobile-dropdown">
                    <div className="mobile-link" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {link.name}
                    </div>
                    <div className="mobile-sublinks" style={{ paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {link.dropdown.map((sub) => (
                        <Link key={sub.name} to={sub.path} className="nav-link" onClick={() => setIsOpen(false)}>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/admission" className="btn-primary" onClick={() => setIsOpen(false)}>
              Apply Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
