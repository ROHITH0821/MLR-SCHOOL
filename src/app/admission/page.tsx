import type { Metadata } from 'next';
import Admission from '@/views/Admission';

export const metadata: Metadata = {
  title: 'Admissions',
  description:
    'Admissions portal — inquiry, campus visit, and enrollment information for Malla Reddy School.',
};

export default function Page() {
  return <Admission />;
}
