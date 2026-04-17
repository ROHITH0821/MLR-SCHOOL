import type { Metadata } from 'next';
import Gallery from '@/views/Gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photo gallery of campus, events, sports, academics, and labs at Malla Reddy School.',
};

export default function Page() {
  return <Gallery />;
}
