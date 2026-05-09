import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'OmniSight — AI Surveillance Proof-of-Concept · naumanAhmed3',
  description: 'A self-directed portfolio project exploring AI-assisted surveillance. Describe a threat in plain English, the system watches every feed for it. In-browser face detection plus GPT-4o vision.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
