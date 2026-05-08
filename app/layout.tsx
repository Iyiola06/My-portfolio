import type {Metadata} from 'next';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iyiola.sulvatech.com'),
  title: {
    default: 'Iyiola Ogunjobi | Visionary Builder & Technologist',
    template: '%s | Iyiola Ogunjobi',
  },
  description: 'Iyiola Ogunjobi is a founder, technologist, and creative systems thinker focused on building intelligent digital experiences and futuristic products.',
  keywords: ['Iyiola Ogunjobi', 'Technologist', 'Software Engineer', 'Systems Thinker', 'Visionary Builder', 'AI', 'Digital Experiences', 'Portfolio'],
  authors: [{ name: 'Iyiola Ogunjobi' }],
  creator: 'Iyiola Ogunjobi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iyiola.sulvatech.com',
    title: 'Iyiola Ogunjobi | Visionary Builder & Technologist',
    description: 'Building intelligent digital experiences and futuristic products.',
    siteName: 'Iyiola Ogunjobi Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Iyiola Ogunjobi - Visionary Builder & Technologist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iyiola Ogunjobi | Visionary Builder & Technologist',
    description: 'Building intelligent digital experiences and futuristic products.',
    images: ['/og-image.png'],
    creator: '@iyiola', // Assuming a handle or just the name
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { Schema } from '@/components/Schema';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable} dark antialiased text-white bg-[#050505]`}>
      <head>
        <Schema />
      </head>
      <body className="font-sans min-h-screen selection:bg-purple-500/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
