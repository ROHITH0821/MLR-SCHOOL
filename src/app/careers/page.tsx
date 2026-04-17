import type { Metadata } from 'next';
import Careers from '@/views/Careers';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Open positions and general applications for educators at Malla Reddy School.',
};

export default function Page() {
  return <Careers />;
}
