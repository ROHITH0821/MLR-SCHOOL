import React from 'react';
import { Phone, FileText, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="container topbar-container">
        <div className="topbar-left">
          <a href="tel:+919123456789" className="topbar-item">
            <Phone size={14} />
            <span>+91 91234 56789</span>
          </a>
        </div>
        <div className="topbar-right">
          <Link to="/admission" className="topbar-item">
            <UserPlus size={14} />
            <span>Admissions</span>
          </Link>
          <Link to="/utility" className="topbar-item">
            <FileText size={14} />
            <span>Mandatory Public Disclosure</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
