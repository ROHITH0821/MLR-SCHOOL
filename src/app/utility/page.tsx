import type { Metadata } from 'next';
import Utility from '@/views/Utility';

export const metadata: Metadata = {
  title: 'Resources & Disclosure',
  description:
    'Mandatory public disclosure, transport information, and school resources.',
};

export default function Page() {
  return <Utility />;
}
