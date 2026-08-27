import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NaijaVerse AI — Turn Your Imagination Into a Playable World',
  description: 'Create AI-powered interactive stories, games and worlds inspired by African creativity.',
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'NaijaVerse AI', description: 'Turn your imagination into a playable world.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
