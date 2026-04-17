import type { Metadata } from 'next';
import LifeAtSchool from '@/views/LifeAtSchool';

export const metadata: Metadata = {
  title: 'Life at School',
  description:
    'Beyond the classroom: campus life, community, wellness, arts, and modern infrastructure at Malla Reddy School.',
};

export default function Page() {
  return <LifeAtSchool />;
}
