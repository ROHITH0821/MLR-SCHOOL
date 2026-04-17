'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import './ContactFab.css';

export default function ContactFab() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;

  return (
    <Link href="/contact" className="contact-fab" aria-label="Go to contact page" title="Contact us">
      <MessageCircle size={22} strokeWidth={2} aria-hidden />
    </Link>
  );
}
