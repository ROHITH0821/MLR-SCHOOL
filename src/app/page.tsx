import type { Metadata } from 'next';
import Home from '@/views/Home';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Malla Reddy School — Empowering minds and shaping the future through holistic education, STEAM, and world-class facilities.',
};

export default function Page() {
  return <Home />;
}
