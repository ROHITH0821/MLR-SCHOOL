import type { Metadata } from 'next';
import Curriculum from '@/views/Curriculum';

export const metadata: Metadata = {
  title: 'Curriculum',
  description:
    'Academic curriculum with STEAM at the core — science, technology, engineering, arts, and mathematics for every learner.',
};

export default function Page() {
  return <Curriculum />;
}
