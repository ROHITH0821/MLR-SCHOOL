import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import ClientRoot from '@/components/ClientRoot';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MR International School — Shaping Future Leaders',
    template: '%s | Malla Reddy School',
  },
  description:
    'MR International School — Shaping Future Leaders through STEAM education in a safe, nurturing, and world-class environment. Admissions open.',
  keywords: [
    'school',
    'CBSE',
    'STEAM',
    'education',
    'admissions',
    'primary school',
    'pre-primary',
  ],
  openGraph: {
    title: 'MR International School',
    description:
      'Shaping Future Leaders through STEAM education. Limited seats — Apply Now!',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
