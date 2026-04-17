import type { Metadata } from 'next';
import Blog from '@/views/Blog';

export const metadata: Metadata = {
  title: 'News & Blog',
  description: 'Latest news, events, and stories from the Malla Reddy School campus.',
};

export default function Page() {
  return <Blog />;
}
