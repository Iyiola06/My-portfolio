import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://iyiola.sulvatech.com'),
  title: {
    default: 'Iyiola Ogunjobi | Founder of Sulva Tech',
    template: '%s | Iyiola Ogunjobi',
  },
  description: 'Iyiola Ogunjobi is the founder of Sulva Tech, building AI-powered platforms for education, commerce, media and events across Africa.',
  keywords: ['Iyiola Ogunjobi', 'Technologist', 'Software Engineer', 'Systems Thinker', 'AI', 'Digital Experiences', 'Portfolio'],
  authors: [{ name: 'Iyiola Ogunjobi' }],
  creator: 'Iyiola Ogunjobi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iyiola.sulvatech.com',
    title: 'Iyiola Ogunjobi | Founder of Sulva Tech',
    description: 'Founder of Sulva Tech. AI-powered platforms for education, commerce, media and events.',
    siteName: 'Iyiola Ogunjobi Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Iyiola Ogunjobi - Founder of Sulva Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iyiola Ogunjobi | Founder of Sulva Tech',
    description: 'Founder of Sulva Tech. AI-powered platforms for education, commerce, media and events.',
    images: ['/og-image.png'],
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
    <html lang="en" className="dark antialiased text-white bg-[#050505]">
      <head>
        <Schema />
      </head>
      <body className="font-sans min-h-screen selection:bg-purple-500/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
