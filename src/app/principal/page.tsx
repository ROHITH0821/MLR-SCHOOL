import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: "Principal's Desk",
  description:
    "Message from the principal and leadership at Malla Reddy School.",
};

export default function Page() {
  return <About />;
}
