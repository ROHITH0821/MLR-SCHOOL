import type { Metadata } from 'next';
import Achievers from '@/views/Achievers';

export const metadata: Metadata = {
  title: 'Student Achievers',
  description: 'Hall of fame — celebrating academic, sports, arts, and science achievers.',
};

export default function Page() {
  return <Achievers />;
}
