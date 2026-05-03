import type { Metadata } from 'next';
import ManagementTeam from '@/views/ManagementTeam';

export const metadata: Metadata = {
  title: 'Management Team | Malla Reddy School',
  description: 'Meet the visionaries and leadership team of Malla Reddy School who are dedicated to excellence in education.',
};

export default function Page() {
  return <ManagementTeam />;
}
