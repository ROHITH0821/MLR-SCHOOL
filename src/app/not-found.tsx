import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container section text-center" style={{ paddingTop: '8rem' }}>
      <h1 className="section-title" style={{ marginBottom: '1rem' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary squishy-btn">
        Back to Home
      </Link>
    </div>
  );
}
