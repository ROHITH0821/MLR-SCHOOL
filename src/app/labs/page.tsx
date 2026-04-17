import type { Metadata } from 'next';
import Labs from '@/views/Labs';

export const metadata: Metadata = {
  title: 'Labs & Facilities',
  description:
    'Science, computer, mathematics, robotics labs, and the digital library at Malla Reddy School.',
};

export default function Page() {
  return <Labs />;
}
