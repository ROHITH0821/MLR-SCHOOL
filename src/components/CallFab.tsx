'use client';

import { Phone } from 'lucide-react';
import './CallFab.css';

export default function CallFab() {
  return (
    <a href="tel:+919123456789" className="call-fab" aria-label="Call school" title="Call us">
      <Phone size={22} strokeWidth={2} aria-hidden />
      <span className="call-fab-text">Call Us</span>
    </a>
  );
}
