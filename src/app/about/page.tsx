import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'About School',
  description:
    'Vision, mission, principal message, and what makes Malla Reddy School different.',
};

export default function Page() {
  return <About />;
}
