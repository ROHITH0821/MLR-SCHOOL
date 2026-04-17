import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'Management',
  description: 'Management and governance information for Malla Reddy School.',
};

export default function Page() {
  return <About />;
}
