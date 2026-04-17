import type { Metadata } from 'next';
import Contact from '@/views/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Malla Reddy School — phone, email, office hours, inquiry form, and map.',
};

export default function Page() {
  return <Contact />;
}
