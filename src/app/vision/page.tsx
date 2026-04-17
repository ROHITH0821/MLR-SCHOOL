import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'Vision & Mission',
  description: 'Our vision, mission, and educational philosophy at Malla Reddy School.',
};

export default function Page() {
  return <About />;
}
