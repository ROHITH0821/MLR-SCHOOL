import type { Metadata } from 'next';
import Testimonials from '@/views/Testimonials';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Parent testimonials and video stories from the Malla Reddy School community.',
};

export default function Page() {
  return <Testimonials />;
}
