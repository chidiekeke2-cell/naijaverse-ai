import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'NaijaVerse AI — Turn Your Imagination Into a Playable World',description:'Create AI-powered interactive stories, games and worlds inspired by African creativity.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
